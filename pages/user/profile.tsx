import React from "react";
import { NextFC } from "next";
import { Layout, HeadingBase, font } from "../../utils/style";
import { useUserData } from "../../src/hooks/useUserData";
import NavBar from "../../src/components/NavBar";
import styled from "styled-components";

const SmallHeading = styled(HeadingBase)`
  font-size: ${font.fontSize.sm};
  font-weight: 400;
`;

const Profile: NextFC<{}> = (props): JSX.Element => {
  const userData = useUserData();
  return (
    <>
      <NavBar />
      <Layout fadeIn>
        {userData && (
          <React.Fragment>
            <HeadingBase sub>Hello, {userData.data.displayName}</HeadingBase>
            <SmallHeading>{userData.data.email}</SmallHeading>
          </React.Fragment>
        )}
      </Layout>
    </>
  );
};

export default Profile;
