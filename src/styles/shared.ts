import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
interface LayoutProps {
  fadeIn?: boolean;
}
export const Layout = styled.main<LayoutProps>`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: ${props => props.fadeIn ? .8 + "s" : 0};
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
`;

interface HeadingProps {
  readonly sub?: boolean;
}

export const Heading = styled.h1<HeadingProps>`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${props => props.sub ? "1.75em" : "2.5em"};
  font-weight: 600;
  margin: 1rem 0;
  color: #222222;
`;