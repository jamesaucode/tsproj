import React, { useEffect, useState } from "react";
import Spinner from '../src/components/Spinner';
import { Layout, Heading } from "../src/styles/shared";

const Index = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(props);
  useEffect(() => {
    if (props.session) {
      setLoggedIn(props.session.hasOwnProperty("passport") && props.session.passport.length > 0);
    }
    setLoading(false);
  }, [loggedIn]);
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  } else if (loggedIn) {
    return (
      <Layout fadeIn>
        <Heading sub>Welcome. {props.session.passport.user.displayName} </Heading>
      </Layout>
    );
  } else {
    return (
      <Layout fadeIn>
        <Heading>You can sign in with you Google Account !</Heading>
        <button onClick={() => props.pushNotification("This is a success message", true)}>Test</button>
      </Layout>
    )
  }
};

export default React.memo(Index);