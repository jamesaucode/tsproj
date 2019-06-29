import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";
import { Layout, Heading } from "../src/styles/shared";
import Modal from "../src/components/Modal";
import Login from "../src/components/Login";

const Index = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (props.session) {
      setLoggedIn(
        props.session.hasOwnProperty("passport") &&
          props.session.passport.length > 0
      );
    }
    setLoading(false);
  }, [loggedIn]);

  const getModalProps = () => {
    return {
      Embedded: Login,
      isOpen: showModal,
      toggleOpen: () => { setShowModal(!showModal) }
    };
  };
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  } else if (loggedIn) {
    return (
      <Layout fadeIn>
        <Heading sub>
          Welcome. {props.session.passport.user.displayName}{" "}
        </Heading>
      </Layout>
    );
  } else {
    return (
      <Layout fadeIn>
        <Heading>You can sign in with you Google Account !</Heading>
        {showModal && <Modal {...getModalProps()} />}
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Login Here
        </button>
      </Layout>
    );
  }
};

export default React.memo(Index);
