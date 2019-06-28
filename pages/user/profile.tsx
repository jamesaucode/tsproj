import React from "react";
import { NextFC } from "next";
import { Layout, Heading } from "../../src/styles/shared";
import { withAuthorization } from "../../src/components/AuthorizationHOC";
import { SessionProps } from "../../typings/express";
import { UserSchemaTypes } from "../../server/schemas/User";

const Profile: NextFC<SessionProps | any> = props => {
  const { user } = props.session.passport;
  return (
    <Layout fadeIn>
      <Heading sub>Hello, {user.displayName}</Heading>
      {/* <Heading sub>Email: {user.emails[0].value || user.email}</Heading> */}
      <Heading sub>{user.email}</Heading>
    </Layout>
  );
};

Profile.defaultProps = {
  session: {
    passport: {
      user: {
        emails: [{}],
      },
    },
  },
};

export default React.memo(withAuthorization(Profile));
