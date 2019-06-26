import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { makeJsonRequest } from "../../utils/httpRequest";
import Spinner from "../../src/components/Spinner";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const Cards = () => {
  const [session, setSession] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const url = `http://${window.location.host}/api/session`;
    makeJsonRequest(url).then(json => {
      setSession(json);
      setLoggedIn(json !== undefined);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Heading>Your cards</Heading>
      </Layout>
    );
  }
};

export default React.memo(Cards);
