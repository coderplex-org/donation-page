import url from 'url';
import { PROCESSING_CHARGE_PERCENT } from '../constants';

const URL = global.URL || url.URL;

export function getURL({ amount, email }) {
  const url = new URL(`upi://pay`);
  url.searchParams.append('pa', 'coderplex@yesbank');
  url.searchParams.append('pn', 'Coderplex');
  url.searchParams.append('currency', 'inr');
  url.searchParams.append('tn', `Donation to coderplex from ${email}`);
  url.searchParams.append('am', amount);
  url.searchParams.append('refUrl', `https://coderplex.org/donate`);
  return url.href;
}

export function getFinalAmount(amount) {
  return (Number(amount) * (1 + PROCESSING_CHARGE_PERCENT / 100)).toFixed(2);
}
