import React from "react";
import { Layout, Heading } from '../src/styles/shared';
import { NextFC } from "next";

const About : NextFC = () => {
  return (
    <Layout>
      <Heading>This is a study app.</Heading>
    </Layout>
  );
};

About.getInitialProps = async (ctx) => {
  console.log("LMAO")
}

export default About;
