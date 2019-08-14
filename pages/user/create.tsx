import React from "react";
import { Layout, HeadingBase } from "../../utils/style";
import StudyCard from "../../src/components/StudyCard";
import NavBar from "../../src/components/NavBar";
import { useLoginStatus } from "../../src/hooks/useLoginStatus";

const Create: React.FunctionComponent = (): JSX.Element => {
  const isLoggedIn = useLoginStatus();
  return isLoggedIn ? (
    <>
      <NavBar />
      <Layout id="main" fadeIn>
        <HeadingBase>Make a card!</HeadingBase>
        <StudyCard />
      </Layout>
    </>
  ) : null;
};

export default Create;
