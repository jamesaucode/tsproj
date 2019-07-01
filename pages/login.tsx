import React, { useState } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import Register from "./register";
import Login from "../src/components/Login";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginPage: NextFC = (props: any) => {
  const [showSignIn, setShowSignIn] = useState(true);
  console.log(props);
  return (
    <Wrapper>
      {showSignIn ? (
        <Login />
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
