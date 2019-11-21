import Airtable from 'airtable';

const airtableCredentials = {
  key: process.env.AIRTABLE_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  donationsTableName: process.env.AIRTABLE_TABLE_NAME,
  campaignsTableName: process.env.AIRTABLE__CAMPAIGN_TABLE_NAME,
  fundingsTableName: process.env.AIRTABLE__FUNDING_TABLE_NAME,
};

const base = new Airtable({ apiKey: airtableCredentials.key }).base(airtableCredentials.baseId);
export const donationsBase = base(airtableCredentials.donationsTableName);
export const campaignsBase = base(airtableCredentials.campaignsTableName);
export const fundingsBase = base(airtableCredentials.fundingsTableName);
