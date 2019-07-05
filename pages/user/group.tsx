import React, { useState } from "react";
import NavBar from "../../src/components/NavBar";
import Link from 'next/link';
import { withRouter, WithRouterProps } from "next/router";
import { Layout, Heading } from "../../src/styles/shared";
import { IGroup } from "../../server/schemas/Group";

interface PropTypes extends WithRouterProps<{ name: string }> {
  group: IGroup;
  queryParams: {
    name: string;
  };
  children?: React.ReactChildren;
}
const Group = withRouter((props: PropTypes) => {
  const lmao = () => (
    <h1>Lmao</h1>
  )
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch(`/api/joingroup/${props.router.query.name}`, {
      method: "POST",
      credentials: 'include'
    })
    .then(response => console.log(response))
  }
  console.log(props);
  return (
    <>
      <NavBar />
      <Layout>
        <Heading>Group !</Heading>
        <Heading>{props.router.query.name}</Heading>
        <button onClick={handleClick}>Join this group!</button>
      </Layout>
    </>
  );
});

export default Group;
