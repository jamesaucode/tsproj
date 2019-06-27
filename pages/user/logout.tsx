import React from "react";
import Link from 'next/link';
import * as googleOAuth from "passport-google-oauth20";
import { Layout, Heading } from "../../src/styles/shared";
import { NextFC, NextContext } from "next";
import { IncomingMessage } from "http";
import { DefaultQuery } from "next/router";
import { redirect, redirectWithDelay } from "../../utils/redirect";

const Logout: NextFC = (props : any) => {
    console.log(props);
  return (
    <Layout>
      <Heading>Logging out...</Heading>
      <a href="/">Go home immediately</a>
    </Layout>
  );
};

interface CustomRequest extends IncomingMessage {
  user?: googleOAuth.Profile;
  session?: CookieSessionInterfaces.CookieSessionObject | null;
}

Logout.getInitialProps = async (
  ctx: NextContext<DefaultQuery, CustomRequest>
) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) {
    if (ctx.req.session) {
      ctx.req.session = null;
      return redirectWithDelay(ctx);
    }
  }
  let apiUrl = "";
  if (ctx.req) {
    isBrowser
      ? (apiUrl = `${protocol}://${window.location.host}/api/logout`)
      : (apiUrl = `${protocol}://${ctx.req.headers.host}/api/logout`);
  } else {
    apiUrl = `${protocol}://${window.location.host}/api/logout`;
  }
  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok && ctx.req) {
      ctx.req.session = null;
      return redirectWithDelay(ctx);
    }
    return redirectWithDelay(ctx);
  } catch (error) {
    return redirect(ctx);
  }
};

export default Logout;
