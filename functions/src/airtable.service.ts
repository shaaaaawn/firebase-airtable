import { environment } from './environments/environment';

const Airtable = require('airtable');
const Bottleneck = require('bottleneck');
const cache = require('./caching');

async function cachePathForRequest(path: any) {
  return 'cache/_' + path + '.json';
}

const rateLimiter = new Bottleneck({
  minTime: 1050 / 5,
}); // ~5 requests per second

// Table Names From Airtable Base
const tableNames = {
  table_1: 'Table 1',
};

export async function refreshCache() {
  await cache.clearCache();
  const table1 = await airtableTableRequest();

  const _cache = {
    table_1: table1,
  };
  return _cache;
}

export async function airtableTableRequest() {
  const base = new Airtable({
    apiKey: environment.airtable.key,
  }).base(environment.airtable.base);
  const viewName = 'Grid view';

  const cachePath = await cachePathForRequest('table_1');
  console.log('cachePath: ' + cachePath);
  const cachedResult = await cache.readCacheWithPath(cachePath);
  console.log('cacheResult: ' + cachedResult);

  if (cachedResult !== null) {
    console.log('Cache hit. Returning cached result for ' + cachePath);
    return cachedResult;
  } else {
    console.log('Cache miss. Loading from Airtable for ' + cachePath);
    const rows: any[] = [];
    rateLimiter.wrap(
      await base(tableNames.table_1)
        .select({
          view: viewName,
          pageSize: 100,
        })
        .eachPage(
          async function page(records: any, fetchNextPage: any) {
            records.forEach(async function (record: any) {
              const result = {
                name: record.get('Name'),
                notes: record.get('Notes'),
                attachments: null,
              };
              //How to Get Media if Exists
              if (record.get('Attachments')) {
                result.attachments = record.get('Attachments')[0].url;
              }
              rows.push(result);
            });
            fetchNextPage();
          },
          async function done(error: any) {
            if (error) {
              throw new Error('Airtable Service Error: ' + error);
            }
            await cache.writeCacheWithPath(cachePath, rows);
            console.log('Returning records');
            return rows;
          }
        )
    );
  }
}
