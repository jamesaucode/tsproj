import React, { useState } from "react";
import { NextFC } from "next";
import Router from "next/router";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Register from '../components/register';
import { InputValidator } from "../../services/validation.service";

const googleLoginButton = require("../../static/images/btn_google_signin_dark_normal_web@2x.png");
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
interface FormInputProps {
  validated: boolean
}
const FormInput = styled.input<FormInputProps>`
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border:${({ validated }) => validated ? "1px solid #8610f9" : "1px solid red"};
  }
`;
const FormWrapper = styled.div`
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
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`

const Login: NextFC = (props: any) => {
  const [emailInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSignIn, setShowSignIn] = useState(true);
  const handleSubmit = (event: any) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    }).then(response => {
      if (response.ok && response.redirected) {
        Router.push(response.url);
        props.pushNotification("Welcome back!", true);
      } else {
        props.pushNotification( "Incorrect credentials, please try again.", false);
        setPasswordInput("");
      }
    });
  };
  const validateEmail = () => InputValidator.email(emailInput);
  const validatePassword = () => InputValidator.password(passwordInput);
  const validateInput = () => {
    return validateEmail() && validatePassword();
  };
  const handleClick = () => {
    setShowSignIn(!showSignIn);
  }

  return showSignIn ? (
    <Wrapper>
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
          validated={validateEmail()}
          value={emailInput}
          placeholder="Username / Email"
          name="username"
          type="email"
        />
        <FormInput
          onChange={e => {
            setPasswordInput(e.target.value);
          }}
          value={passwordInput}
          validated={validatePassword()}
          placeholder="Password"
          name="password"
          type="password"
        />
        <FormSubmit
          disabled={!validateInput()}
          onClick={handleSubmit}
        >
          Login
        </FormSubmit>
          <div>
            <p>
              New user ? <StyledLink onClick={handleClick}>Signup </StyledLink>
              here!
            </p>
          </div>
      </FormWrapper>
    </Wrapper>
  ) : (
    <Register toggleForm={() => { setShowSignIn(true) }}/>
  )
};

export default Login;
