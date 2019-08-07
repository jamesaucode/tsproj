import React, { useState } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import Register from "../src/components/Register";
import LoginForm from "../src/components/LoginForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginPage: NextFC = (props: any): JSX.Element => {
  const [showSignIn, setShowSignIn] = useState(true);
  return (
    <Wrapper>
      {showSignIn ? (
        <LoginForm />
      ) : (
        <Register
          toggleForm={(): void => {
            setShowSignIn(!showSignIn);
          }}
        />
      )}
    </Wrapper>
  );
};

export default LoginPage;
