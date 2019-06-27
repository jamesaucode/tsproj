import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import StudyCard from '../../src/components/StudyCard';
import { withAuthorization } from '../../src/components/AuthorizationHOC';
import { SessionProps } from "../../typings/express";

const Main: React.FunctionComponent<SessionProps> = (props) => {
    return (
      <Layout id="main" fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard session={props.session} />
      </Layout>
    );
};

export default React.memo(withAuthorization(Main));
