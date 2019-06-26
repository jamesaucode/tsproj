import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { makeJsonRequest } from "../../utils/httpRequest";
import Spinner from "../../src/components/Spinner";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const Cards = (props : any) => {
  const [session, setSession] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
  } else if (!loggedIn) {
      return (
          <Layout>
              <Heading>Please Login.</Heading>
          </Layout>
      )
  } {
    return (
      <Layout>
        <Heading>Your cards</Heading>
      </Layout>
    );
  }
};

export default React.memo(Cards);
