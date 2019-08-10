import React from "react";
import { NextFC } from "next";
import { Layout, Heading } from "../../utils/style";
import { useUserData } from "../../src/hooks/useUserData";
import NavBar from "../../src/components/NavBar";

const Profile: NextFC<{}> = (props): JSX.Element => {
  const userData = useUserData();
  return (
    <>
      <NavBar />
      <Layout fadeIn>
        {userData && <Heading sub>Hello, {userData.data.displayName}</Heading>}
      </Layout>
    </>
  );
};

export default Profile;
