import { NextContext } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';

export const auth = (ctx : NextContext) => {
  const token = nextCookie(ctx);
  if (ctx.req && ctx.res && !token ) {
    ctx.res.writeHead(302, { Location : '/'});
    ctx.res.end();
    return ;
  }

  if (!token) {
    Router.push('/');
  }

  return token;
}