import React from "react";
import App, { Container } from "next/app";
import { makeJsonRequest } from "../utils/httpRequest";
import NavBar from "../src/components/NavBar";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", url => {
  console.log(`Loading ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  console.log("Route change completed");
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  console.log("Route change Error");
  NProgress.done();
});

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req) {
      console.log("Getting Session ...");
      pageProps.session = ctx.req.session;
      pageProps.cards = ctx.req.user.cards;
      console.log("Server side");
      console.log("Returning page props");
      return { pageProps };
    } else {
      const sessionUrl = `http://${window.location.host}/api/session`;
      const cardsUrl = `http://${window.location.host}/api/cards`;
      console.log("Client Side");
      const sessionRequest = makeJsonRequest(sessionUrl);
      const cardsRequest = makeJsonRequest(cardsUrl);
      const allPromises = Promise.all([sessionRequest, cardsRequest]);
      return allPromises.then(result => ({
        pageProps: {
          session: result[0],
          cards: result[1],
        },
      }));
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container {...pageProps}>
        <NavBar {...pageProps} />
        <Component {...pageProps} />
      </Container>
    );
  }
}
