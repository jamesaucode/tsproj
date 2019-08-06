import React, { useState } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import Register from "./register";
import LoginForm from "../src/components/LoginForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginPage: NextFC = (props: any) => {
  const [showSignIn, setShowSignIn] = useState(true);
  return (
    <Wrapper>
      {showSignIn ? (
        <LoginForm />
      ) : (
        <Register
          toggleForm={() => {
            setShowSignIn(!showSignIn);
          }}
        />
      )}
    </Wrapper>
  );
};

export default LoginPage;
