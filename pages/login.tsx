import React, { useState } from "react";
import { NextFC } from "next";
import Link from "next/link";
import { Layout } from "../src/styles/shared";
import styled from "styled-components";

const googleLoginButton = require("../static/images/btn_google_signin_dark_normal_web@2x.png");

const maxFormWidth = "400px";
const LoginButton = styled.a`
  max-width: 200px;
  cursor: pointer;
  margin: 1rem;
`;

const StyledLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const LoginButtonLogo = styled.img`
  width: 100%;
  height: 100%;
`;
const Divider = styled.div`
  width: ${maxFormWidth};
  height: 7px;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  margin-bottom: 2rem;
`;
const DividerText = styled.span`
  font-size: 1em;
  font-weight: 600;
  background: white;
  padding: 0 1rem;
  color: #333333;
`;
const FormInput = styled.input`
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border: 1px solid #8610f9;
  }
`;
const FormWrapper = styled.form`
  width: ${maxFormWidth};
  text-align: center;
`;
const FormSubmit = styled.button`
  color: white;
  font-size: 1em;
  font-weight: 600;
  width: 100%;
  border: none;
  border-radius: 3px;
  padding: 0.65rem;
  background: #8610f9;
`;

const Login: NextFC = (props: any) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <Layout fadeIn>
      <LoginButton href="/auth/google">
        <LoginButtonLogo src={googleLoginButton} />
      </LoginButton>
      <Divider>
        <DividerText>or</DividerText>
      </Divider>
      <FormWrapper>
        <FormInput
          onChange={e => {
            setUsernameInput(e.target.value);
          }}
          value={usernameInput}
          placeholder="Username / Email"
          name="username"
          type="email"
        />
        <FormInput
          onChange={e => {
            setPasswordInput(e.target.value);
          }}
          value={passwordInput}
          placeholder="Password"
          name="password"
          type="password"
        />
        <FormSubmit>Login</FormSubmit>
        <Link href="/register">
          <div>
            <p>
              New user ? <StyledLink>Signup </StyledLink>
              here!
            </p>
          </div>
        </Link>
      </FormWrapper>
    </Layout>
  );
};

export default Login;
