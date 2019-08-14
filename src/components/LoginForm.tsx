import React, { useState, useEffect, useRef, EffectCallback } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Register from "./Register";
import { InputValidator } from "../../services/validation.service";
import { FormBottom, colors } from "../../utils/style";
import { useNotification } from "./Notification/Notification";
import { useWindowSize } from "../hooks/useWindowSize";

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
  height: 40px;
  position: relative;
  padding: 0.75rem;
  margin: 0.5rem 0;
  width: 100%;
  width: ${(props): string => `${props.width}px`};
  max-width: 300px;
  font-size: 0.8em;
  box-sizing: border-box;
  &:focus {
    border: ${({ validated }): string =>
      validated ? "1px solid #8610f9" : "1px solid red"};
  }
`;
interface FormInputWrapperProps {
  isFocused?: boolean;
  text: string;
}
const FormInputWrapper = styled.div<FormInputWrapperProps>`
  position: relative;
  &::before {
    content: ${(props): string => `"${props.text}"`};
    color: ${colors.black}80;
    position: absolute;
    transition: 500ms transform ease;
    transform: ${({ isFocused }): string =>
      isFocused ? "translate(5px, 0)" : "translate(15px, 20px)"};
    transform: ${({ isFocused }): string => isFocused && "scale(0.7)"};
    z-index: 10;
    background-color: #fff;
    font-weight: 400;
    font-size: 0.8em;
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
  const [focused, setFocused] = useState(1);
  const { pushNotification } = useNotification();
  const { size } = useWindowSize();
  const emailInputRef = useRef<HTMLInputElement>();
  useEffect((): EffectCallback => {
    // Focuses on the emailinputref as the component mount
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    return (): void => {};
  }, []);
  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });
      if (response.ok && response.redirected) {
        window.location.href = "/user/cards";
      } else {
        pushNotification("Incorrect credentials", false);
        setPasswordInput("");
      }
    } catch (error) {
      pushNotification(error.message, false);
      setPasswordInput("");
    }
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
        <FormInputWrapper text="Email" isFocused={focused === 1}>
          <FormInput
            onChange={(e): void => {
              setUsernameInput(e.target.value);
            }}
            width={size.windowWidth}
            onFocus={() => setFocused(1)}
            onBlur={() => setFocused(0)}
            ref={emailInputRef}
            onKeyDown={handleKeyDown}
            validated={validateEmail()}
            value={emailInput}
            name="username"
            type="email"
          />
        </FormInputWrapper>
        <FormInputWrapper text="Password" isFocused={focused === 2}>
          <FormInput
            onChange={(e): void => {
              setPasswordInput(e.target.value);
            }}
            width={size.windowWidth}
            onFocus={() => setFocused(2)}
            onBlur={() => setFocused(0)}
            onKeyDown={handleKeyDown}
            value={passwordInput}
            validated={validatePassword()}
            name="password"
            type="password"
          />
        </FormInputWrapper>
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
