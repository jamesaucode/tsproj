import React from "react";
import { Layout, Heading } from "../styles/shared";

const Unauthorized: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout>
      <Heading>You do not have access to this page.</Heading>
    </Layout>
  );
};

export default Unauthorized;
