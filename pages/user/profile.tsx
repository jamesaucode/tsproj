import React from "react";
import { NextFC } from "next";
import { Layout, Heading } from "../../src/styles/shared";
import { SessionProps } from "../../typings/express";
import { useUserData } from '../../src/hooks/useUserData';

const Profile: NextFC<SessionProps> = props => {
  const userData = useUserData();
  return (
    <Layout fadeIn>
      <Heading sub>Hello, {userData.displayName}</Heading>
    </Layout>
  );
};

export default Profile;
