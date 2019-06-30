import React from "react";
import * as googleOAuth from "passport-google-oauth20";
import { Layout, Heading } from "../../src/styles/shared";
import { NextFC, NextContext } from "next";
import { IncomingMessage } from "http";
import { redirect, redirectWithDelay } from "../../utils/redirect";

const Logout: NextFC = (props: any) => {
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

Logout.getInitialProps = async (ctx: any) => {
  const { req, query } = ctx;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const isServer = !!req;
  if (isServer) {
    if (req.session) {
      req.session = null;
      return redirectWithDelay(ctx);
    }
  }
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/logout`
    : `${protocol}://${window.location.host}/api/logout`;
  const response = await fetch(apiUrl, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok && req) {
    ctx.req.session = null;
    return redirectWithDelay(ctx);
  }
  return redirectWithDelay(ctx);
};

export default Logout;
