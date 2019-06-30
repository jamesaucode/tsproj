import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import StudyCard from '../../src/components/StudyCard';
import { withAuthorization } from '../../src/components/AuthorizationHOC';
import { SessionProps } from "../../typings/express";
import { useLoginStatus } from '../../src/hooks/useLoginStatus';

// const Main: React.FunctionComponent<SessionProps> = (props) => {
const Create : React.FunctionComponent<any> = (props) => {
    const isLoggedIn = useLoginStatus();
    return isLoggedIn ? (
      <Layout id="main" fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard session={props.session} pushNotification={props.pushNotification} popNotification={props.popNotification} />
      </Layout>
    ) : null;
};

export default Create;
