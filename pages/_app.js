import React from "react";
import App, { Container } from "next/app";
import NavBar from "../src/components/NavBar";
import Notification from "../src/components/Notification/Notification";
import Router from "next/router";
import NProgress from "nprogress";
import { UserProvider } from "../src/context/UserContext";

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
    return { pageProps };
  }
  componentDidMount() {
    console.log("My App Mounted");
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <UserProvider>
          <Notification>
            <NavBar {...pageProps} />
            <Component {...pageProps} />
          </Notification>
        </UserProvider>
      </Container>
    );
  }
}
