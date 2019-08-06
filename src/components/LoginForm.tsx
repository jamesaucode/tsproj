import React, { useState, useEffect, useRef, EffectCallback } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Register from "./Register";
import { InputValidator } from "../../services/validation.service";
import { FormBottom } from "../styles/shared";
import Warning from "./Warning";
// import googleLoginButton from '../../static/images/btn_google_signin_dark_normal_web@2x.png';

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
  width: 100%;
  max-width: ${maxFormWidth};
  height: 0.6em;
  border-bottom: 1px solid #dddddd;
  text-align: center;
  margin-bottom: 2rem;
`;
const DividerText = styled.span`
  font-size: 0.7em;
  font-weight: 600;
  background: white;
  padding: 0 1rem;
  color: ${({ theme }): string => theme.mainfc};
`;
interface FormInputProps {
  validated: boolean;
}
const FormInput = styled.input<FormInputProps>`
  border: 1px solid #aaaaaa;
  border-radius: 2px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  width: 100%;
  font-size: 0.7em;
  box-sizing: border-box;
  &:focus {
    border: ${({ validated }): string =>
      validated ? "1px solid #8610f9" : "1px solid red"};
  }
`;
const FormWrapper = styled.div`
  max-width: ${maxFormWidth};
  text-align: center;
`;
const FormSubmit = styled.button`
  color: white;
  font-size: 0.7em;
  font-weight: 600;
  width: 100%;
  border: none;
  border-radius: 3px;
  padding: 0.65rem;
  background: #8610f9;
  opacity: ${({ disabled }): number => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }): string => (disabled ? "not-allowed" : "pointer")};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  max-width: 400px;
  font-size: calc(0.35vw + 16px);
  padding: 1em;
`;

const Login: NextFC = (): JSX.Element => {
  const [emailInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSignIn, setShowSignIn] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>();
  useEffect((): EffectCallback => {
    // Focuses on the emailinputref as the component mount
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    return (): void => {};
  }, []);
  const handleSubmit = (): void => {
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    }).then((response): void => {
      if (response.ok && response.redirected) {
        window.location.href = "/user/cards";
      } else {
        setShowWarning(true);
        setPasswordInput("");
      }
    });
  };
  const validateEmail = (): boolean => InputValidator.email(emailInput);

  const validatePassword = (): boolean =>
    InputValidator.password(passwordInput);

  const validateInput = (): boolean => {
    return validateEmail() && validatePassword();
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    const isValid = validateInput();
    if (event.keyCode === 13 && isValid) {
      handleSubmit();
    }
  };

  const handleClick = (): void => {
    setShowSignIn(!showSignIn);
  };

  return showSignIn ? (
    <Wrapper>
      <LoginButton href="/auth/google">
        <LoginButtonLogo src={googleLoginButton} />
      </LoginButton>
      <Divider>
        <DividerText>or</DividerText>
      </Divider>
      <FormWrapper>
        {showWarning && <Warning text={"Incorrect Credentials"} />}
        <FormInput
          onChange={(e): void => {
            setUsernameInput(e.target.value);
          }}
          ref={emailInputRef}
          onKeyDown={handleKeyDown}
          validated={validateEmail()}
          value={emailInput}
          placeholder="Username / Email"
          name="username"
          type="email"
        />
        <FormInput
          onChange={(e): void => {
            setPasswordInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={passwordInput}
          validated={validatePassword()}
          placeholder="Password"
          name="password"
          type="password"
        />
        <FormSubmit disabled={!validateInput()} onClick={handleSubmit}>
          Login
        </FormSubmit>
        <FormBottom>
          New user ?{" "}
          <StyledLink id="signup" onClick={handleClick}>
            Signup
          </StyledLink>{" "}
          here!
        </FormBottom>
      </FormWrapper>
    </Wrapper>
  ) : (
    <Register
      toggleForm={(): void => {
        setShowSignIn(true);
      }}
    />
  );
};

export default Login;
