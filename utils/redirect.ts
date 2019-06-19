import { NextContext } from 'next';
import Router from 'next/router';

export const redirect = (ctx : NextContext) => {
    if (ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
    return {};
}

export const redirectWithDelay = (ctx : NextContext, timeout = 3000) => {
  setTimeout(() => {
    redirect(ctx)
  }, timeout);
  return {};
}