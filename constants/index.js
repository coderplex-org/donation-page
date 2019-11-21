export const CLOUDINARY_BASE = `https://res.cloudinary.com/coderplex/image/upload`;
export const LOGO_PUBLIC_ID = `website__assets/logo.png`;
export const CODERPLEX_LOGO = `${CLOUDINARY_BASE}/${LOGO_PUBLIC_ID}`;
export const DEFAULT_SEO_IMAGE = CODERPLEX_LOGO;
export const DEFAULT_TITLE = `Donate to Coderplex`;
export const DEFAULT_DESCRIPTION = `Coderplex Foundation is a registered non-profit org on a mission to improve the state of tech in India.`;
export const THEME_COLOR = `#d53f8c`;

export const BASE_URL = `https://coderplex.org`;
export const MEETUP_URL = `https://meetup.com/coderplex`;
export const CHAT_URL = `${BASE_URL}/chat`;
export const EMAIL = `support@coderplex.org`;
export const PHONE = `+91-8125371202`;

export const PROCESSING_CHARGE_PERCENT = 2.36;

export const CAMPAIGNS_ROUTE = 'campaigns';
export const FUNDINGS_ROUTE = 'fundings';

export const RZP_KEY = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_KEY : process.env.RZP_LIVE_KEY;
