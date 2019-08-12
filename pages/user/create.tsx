import React from "react";
import { Layout, HeadingBase } from "../../utils/style";
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
        <HeadingBase>Make a card!</HeadingBase>
        <StudyCard
          pushNotification={props.pushNotification}
          popNotification={props.popNotification}
        />
      </Layout>
    </>
  ) : null;
};

export default Create;
