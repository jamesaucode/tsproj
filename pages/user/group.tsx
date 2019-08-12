import React from "react";
import NavBar from "../../src/components/NavBar";
import { withRouter, WithRouterProps } from "next/router";
import { Layout, HeadingBase } from "../../utils/style";
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
          <HeadingBase>Group !</HeadingBase>
          <HeadingBase>{props.router.query.name}</HeadingBase>
          <button onClick={handleClick}>Join this group!</button>
        </Layout>
      </>
    );
  },
);

export default Group;
