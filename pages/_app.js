import React from "react";
import App, { Container } from "next/app";
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
      console.log("here Lol");
      pageProps.session = ctx.req.session;
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container {...pageProps}>
        <NavBar {...pageProps} />
        <Component />
      </Container>
    );
  }
}
