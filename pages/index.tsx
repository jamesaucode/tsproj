import React, { Component } from "react";
import styled from "styled-components";
import { NextContext } from "next";
import { Heading } from "../src/styles/shared";
import { DefaultQuery } from "next/router";
import { IncomingMessage } from 'http';

const Layout = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface CustomRequest extends IncomingMessage {
  session?: CookieSessionInterfaces.CookieSessionObject | null;
}

export default class Index extends Component {
  static async getInitialProps(ctx: NextContext<DefaultQuery, CustomRequest>) {
    if (ctx.req) {
      return {
        session: await ctx.req.session
      };
    }
  }
  render() {
    return (
      <Layout>
        <Heading>Welcome.</Heading>
      </Layout>
    );
  }
}
