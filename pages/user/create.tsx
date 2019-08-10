import React from "react";
import { Layout, Heading } from "../../utils/style";
import StudyCard from "../../src/components/StudyCard";
import NavBar from "../../src/components/NavBar";
import { useLoginStatus } from "../../src/hooks/useLoginStatus";

interface PropTypes {
  session: {};
  pushNotification: Function;
  popNotification: Function;
}

const Create: React.FunctionComponent<PropTypes> = (props): JSX.Element => {
  const isLoggedIn = useLoginStatus();
  return isLoggedIn ? (
    <>
      <NavBar />
      <Layout id="main" fadeIn>
        <Heading>Make a card!</Heading>
        <StudyCard
          pushNotification={props.pushNotification}
          popNotification={props.popNotification}
        />
      </Layout>
    </>
  ) : null;
};

export default Create;
