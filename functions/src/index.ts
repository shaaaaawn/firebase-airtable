import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as airtableService from './airtable.service';
import { environment } from './environments/environment';

admin.initializeApp();

const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: environment.airtable.key,
});
// const base: Airtable = Airtable.base(environment.airtable.base);

exports.Airtable = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const result = await airtableService.airtableTableRequest();
    res.status(200).end(JSON.stringify(result));
  }
);

exports.AirtableClearCache = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    await airtableService.refreshCache();
    res.status(200).end('Cache Cleared & Refreshed');
  }
);
