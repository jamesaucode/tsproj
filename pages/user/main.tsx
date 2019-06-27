import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import Spinner from "../../src/components/Spinner";
import StudyCard from '../../src/components/StudyCard';
import Unauthorized from '../../src/components/Unauthorized';
import { withAuthorization } from '../../src/components/AuthorizationHOC';
import { SessionProps } from "../../typings/express";

const Main: React.FunctionComponent<SessionProps> = (props) => {
    return (
      <Layout fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard session={props.session} />
      </Layout>
    );
};

export default React.memo(withAuthorization(Main));
