import { PROCESSING_CHARGE_PERCENT } from '../constants';
import Router from 'next/router';
import { NextPageContext } from 'next';

export function getFinalAmount(amount: number) {
  return Number(amount) * (1 + PROCESSING_CHARGE_PERCENT / 100);
}

export const redirect = (ctx: NextPageContext, to = '/') => {
  if (ctx.res) {
    if (ctx.res.writeHead) ctx.res.writeHead(302, { Location: to });
    if (ctx.res.end) ctx.res.end();
    return;
  }
  Router.push(to);
};
