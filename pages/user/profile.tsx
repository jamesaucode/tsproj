import React from "react";
import { NextFC } from "next";
import { Layout, Heading } from "../../src/styles/shared";
import { SessionProps } from "../../typings/express";
import { useUserData } from "../../src/hooks/useUserData";
import NavBar from "../../src/components/NavBar";

const Profile: NextFC<SessionProps> = props => {
  const userData = useUserData();
  return (
    <>
      <NavBar />
      <Layout fadeIn>
        {userData && <Heading sub>Hello, {userData.displayName}</Heading>}
      </Layout>
    </>
  );
};

export default Profile;
