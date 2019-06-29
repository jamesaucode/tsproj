import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
interface LayoutProps {
  fadeIn?: boolean;
}
export const Layout = styled.main<LayoutProps>`
  /* height: 200vh; */
  height: 100%;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: ${props => (props.fadeIn ? 0.8 + "s" : 0)};
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
`;

interface HeadingProps {
  readonly sub?: boolean;
}

export const Heading = styled.h1<HeadingProps>`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${props => (props.sub ? "1.75em" : "2.5em")};
  font-weight: 600;
  margin: 1rem 0;
  color: #222;
`;

interface MessageProps {
  readonly success?: boolean;
}
export const Message = styled.div<MessageProps>`
display: flex;
justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  font-weight: 400;
  width: 100%;
  max-width: 888px;
  text-align: left;
  color: ${props =>
    props.success ? "rgba(255, 255, 255,0.9)" : "rgba(255, 255, 255, 0.9)"};
  background: ${props => (props.success ? "#51CD80" : "#ff243d")};
  padding: 1rem 2rem;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
