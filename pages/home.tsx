import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";
import { Layout, Heading } from "../src/styles/shared";
import { useUserData } from "../src/hooks/useUserData";
import { NextFC } from "next";
import NavBar from "../src/components/NavBar";

const Index: NextFC = (props: any) => {
  const [loading, setLoading] = useState(true);
  const userData = useUserData();
  console.log(props);
  useEffect(() => {
    setLoading(false);
  }, [userData]);

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  } else {
    return (
      <>
        <NavBar />
        <Layout fadeIn>
          <Heading>This is the home page.</Heading>
          <Heading sub>
            {userData
              ? `Welcome. ${userData.displayName}`
              : `You can sign in with your Google Account !`}
          </Heading>
        </Layout>
      </>
    );
  }
};

export default Index;
