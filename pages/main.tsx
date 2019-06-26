import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../src/styles/shared";
import { makeJsonRequest } from '../utils/httpRequest';
import Spinner from "../src/components/Spinner";
import StudyCard from '../src/components/StudyCard';
import fetch from "isomorphic-unfetch";

const Main: React.FunctionComponent = (props : any) => {
  const [session, setSession] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(props);
    if (props.session) {
      setLoggedIn(props.session.length > 0);
    } 
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  } else if (loggedIn) {
    return (
      <Layout fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard session={session}/>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Heading>Please login.</Heading>
      </Layout>
    );
  }
};

export default React.memo(Main);
