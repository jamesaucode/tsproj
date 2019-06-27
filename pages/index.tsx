import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NextContext } from "next";
import { Heading } from "../src/styles/shared";
import { DefaultQuery } from "next/router";
import { IncomingMessage } from "http";

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

const Index = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.session) {
      setLoggedIn(props.session.hasOwnProperty("passport"));
    }
    setLoading(false);
  }, []);
  if (loggedIn) {
    return (
      <Layout>
        <Heading>Welcome. {props.session.passport.user.displayName} </Heading>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Heading>Welcome to Study App. You can sign in with you Google Account !</Heading>
      </Layout>
    )
  }
};

export default React.memo(Index);

// export default class Index extends PureComponent {
//   render() {
//     console.log(this.props);
//     return (
//       <Layout>
//         <Heading>Welcome.</Heading>
//       </Layout>
//     );
//   }
// }
