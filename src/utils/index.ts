import { PROCESSING_CHARGE_PERCENT } from '../constants';
import Router from 'next/router';
import { NextPageContext } from 'next';

export function getFinalAmount(amount: number) {
  const finalAmount = Number(amount) * (1 + PROCESSING_CHARGE_PERCENT / 100);
  return Math.round(finalAmount * 100) / 100;
}

export const redirect = (ctx: NextPageContext, to = '/') => {
  if (ctx.res) {
    if (ctx.res.writeHead) ctx.res.writeHead(302, { Location: to });
    if (ctx.res.end) ctx.res.end();
    return;
  }
  Router.push(to);
};

export function truncateString(str: string, num: number) {
  return str.length > num ? str.slice(0, num) + '...' : str;
}
