import React from "react";
import NavBar from "../../src/components/NavBar";
import { withRouter, WithRouterProps } from "next/router";
import { Layout, Heading } from "../../utils/style";
import { IGroup } from "../../server/schemas/Group";

interface PropTypes extends WithRouterProps<{ name: string }> {
  group: IGroup;
  queryParams: {
    name: string;
  };
  children?: React.ReactChildren;
}
const Group = withRouter(
  (props: PropTypes): JSX.Element => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      fetch(`/api/joingroup/${props.router.query.name}`, {
        method: "POST",
        credentials: "include",
      }).then((response): void => console.log(response));
    };
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
  },
);

export default Group;
