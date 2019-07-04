import React from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { NextFunctionComponent } from "next";
import { IGroup } from "../../server/schemas/Group";

interface IProps {
    group : IGroup,
    queryParams: {
        name: string
    }
    children?: React.ReactChildren
}
const Group: NextFunctionComponent = (props : IProps) => {
  return (
    <Layout>
      <Heading>Group !</Heading>
      <Heading>{props.group.name}</Heading>
      <Heading>{props.queryParams.name}</Heading>
    </Layout>
  );
};

Group.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
//   console.log(req.url);
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/groups`
    : `${protocol}://${window.location.host}/api/groups`;

    return {...query};
};

export default Group;