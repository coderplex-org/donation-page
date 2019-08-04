import Airtable from 'airtable';

const airtableCredentials = {
  key: process.env.AIRTABLE_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME,
};

const base = new Airtable({ apiKey: airtableCredentials.key }).base(airtableCredentials.baseId);
export const donationsBase = base(airtableCredentials.tableName);
