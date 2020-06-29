import * as functions from "firebase-functions";
// import { getGraphics } from "./airtable-service";
// import { airtable} from 'airtable'

export async function ShopifyOrderTS(
  base: any,
  request: functions.Request,
  response: functions.Response
) {
  try {
    console.log("===GET SKUS STARTING ===");
    await base("YDH SKUs")
      .select({
        view: "Master"
      })
      .eachPage(
        (records: any, fetchNextPage: any) => {
          console.log(records);
          const _items: any = [];
          records.forEach((record: any) => {
            _items.push(record.get("SKU"));
          });
          fetchNextPage();
          return _items;
        },
        (err: any) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  } catch (err) {
    throw new Error(err);
  }
}
