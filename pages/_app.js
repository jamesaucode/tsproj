import React from "react";
import App, { Container } from "next/app";
import { makeJsonRequest } from "../utils/httpRequest";
import NavBar from "../src/components/NavBar";
import Notification from "../src/components/Notification/Notification";
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
    // If this is server side render
    if (ctx.req) {
      console.log("Getting Session ...");
      console.log(ctx.req.user);
      pageProps.session = {
        passport: {
          user: ctx.req.user,
        },
      };
      if (ctx.req.user) {
        pageProps.cards = ctx.req.user.cards;
      }
      console.log("Server side");
      console.log("Returning page props");
      return { pageProps };
    } else {
      const sessionUrl = `http://${window.location.host}/api/session`;
      const cardsUrl = `http://${window.location.host}/api/cards`;
      console.log("Client Side");
      const allPromises = Promise.all([
        makeJsonRequest(sessionUrl),
        makeJsonRequest(cardsUrl),
      ]);
      return allPromises.then(result => ({
        pageProps: {
          session: result[0],
          cards: result[1],
        },
      }));
    }
  }
  componentDidMount() {
    console.log("My App Mounted");
  }
  addNotification = () => {
    console.log(this.state.notification);
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container {...pageProps}>
        <Notification>
          <NavBar {...pageProps} />
          <Component {...pageProps} />
        </Notification>
      </Container>
    );
  }
}
