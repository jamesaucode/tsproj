import React from "react";
import { NextFC } from "next";
import { Layout, Heading } from "../../src/styles/shared";
import { withAuthorization } from '../../src/components/AuthorizationHOC';
import { SessionProps } from '../../typings/express';

const Profile: NextFC<SessionProps> = (props) => {
    const { user } = props.session.passport;
    return (
      <Layout fadeIn>
        <Heading sub>Name: {user.displayName}</Heading>
        <Heading sub>Email: {user.emails[0].value}</Heading>
        <img src={user.photos[0].value} alt="Google profile picture"/>
      </Layout>
    );
};

export default React.memo(withAuthorization(Profile));