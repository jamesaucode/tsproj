import React from "react";
import { Layout, Heading } from "../src/styles/shared";
import { NextFC } from "next";
import NavBar from "../src/components/NavBar";

const About: NextFC = () => {
  return (
    <>
      <NavBar />
      <Layout>
        <Heading>This is a study app.</Heading>
      </Layout>
    </>
  );
};

export default About;
