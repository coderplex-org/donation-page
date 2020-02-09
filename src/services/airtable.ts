import Airtable from 'airtable';

const airtableCredentials = {
  key: process.env.AIRTABLE_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  donationsTableName: process.env.AIRTABLE__DONATIONS_TABLE_NAME,
  paymentsTableName: process.env.AIRTABLE__PAYMENTS_TABLE_NAME,
  campaignsTableName: process.env.AIRTABLE__CAMPAIGN_TABLE_NAME,
  fundingsTableName: process.env.AIRTABLE__FUNDING_TABLE_NAME,
};

export enum Views {
  grid = 'Grid view',
}

export enum PaymentStatus {
  unknown = 'unknown',
  captured = 'captured',
  created = 'created',
  failed = 'captured',
}

export interface RZPPayment {
  id: string;
  name: string;
  email: string;
  phone: string;
  payment_method: string;
  created_at: string;
  order_id: string;
  payment_id?: string;
  status: PaymentStatus;
}

export interface Donation extends RZPPayment {
  donated_amount: number;
}

export interface Payment extends RZPPayment {
  paid_amount: number;
  hours_spent: number;
}

export interface Funding extends Donation {
  campaign: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  meta_description: string;
  short_description: string;
  required_amount: number;
  amount_raised: number;
  donations_count: number;
  organized_by: string;
  created_at: string;
  is_active: boolean;
}

export interface CampaignWithFundings extends Campaign {
  fundings: Funding[];
}

export interface CampaignRow extends Airtable.FieldSet, Campaign {}
export interface FundingRow extends Airtable.FieldSet, Funding {}
export interface DonationRow extends Airtable.FieldSet, Donation {}
export interface PaymentRow extends Airtable.FieldSet, Payment {}

const base = new Airtable({ apiKey: airtableCredentials.key }).base(airtableCredentials.baseId);
export const donationsBase = base(airtableCredentials.donationsTableName) as Airtable.Table<DonationRow>;
export const paymentsBase = base(airtableCredentials.paymentsTableName) as Airtable.Table<PaymentRow>;
export const campaignsBase = base(airtableCredentials.campaignsTableName) as Airtable.Table<CampaignRow>;
export const fundingsBase = base(airtableCredentials.fundingsTableName) as Airtable.Table<FundingRow>;
