import React from "react";
import * as googleOAuth from "passport-google-oauth20";
import { Layout, Heading } from "../../utils/style";
import { NextFC, NextContext } from "next";
import { IncomingMessage } from "http";
// import { UserSchemaTypes } from "../../server/schemas/User";
import Router from "next/router";

const Logout: NextFC = (props: any): JSX.Element => {
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
  ctx: NextContext<{}, { user: UserSchemaTypes; session: any }>,
) => {
  const { req, query } = ctx;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const isServer = !!req;
  if (isServer) {
    if (req.session) {
      req.session = null;
      ctx.res.writeHead(302, { location: "/" });
      // return redirectWithDelay(isServer);
    }
  }
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/logout`
    : `${protocol}://${window.location.host}/api/logout`;
  const response = await fetch(apiUrl, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (isServer) {
    ctx.res.writeHead(302, { location: "/" });
  } else {
    Router.push("/");
  }
  // if (!response.ok && req) {
  //   req.session = null;
  //   return redirectWithDelay(isServer);
  // }
  // return redirectWithDelay(isServer);
};

export default Logout;
