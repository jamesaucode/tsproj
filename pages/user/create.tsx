import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import StudyCard from '../../src/components/StudyCard';
import { withAuthorization } from '../../src/components/AuthorizationHOC';
import { SessionProps } from "../../typings/express";

// const Main: React.FunctionComponent<SessionProps> = (props) => {
const Main: React.FunctionComponent<any> = (props) => {
    return (
      <Layout id="main" fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard session={props.session} pushNotification={props.pushNotification} popNotification={props.popNotification} />
      </Layout>
    );
};

export default React.memo(withAuthorization(Main));
