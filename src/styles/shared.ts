import styled, { keyframes } from "styled-components";

interface SVGWrapperProps {
  size: {
    height: number;
    width: number;
  };
}

export const SVGWrapper = styled.div<SVGWrapperProps>`
  padding: 1em;
  & > span > svg {
    height: ${({ size: { height } }): number => height}px;
    width: ${({ size: { width } }): number => width}px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const FormBottom = styled.p`
  font-size: 0.8em;
  padding: 1rem 0;
  color: ${({ theme }): string => theme.mainfc};
`;

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
  fitContent?: boolean;
  fullHeight?: boolean;
  height?: object;
}
export const Layout = styled.main<LayoutProps>`
  height: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  font-size: calc(0.35vw + 16px);
  box-sizing: border-box;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: ${(props) => (props.fadeIn ? 0.8 + "s" : 0)};
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
`;

interface HeadingProps {
  readonly sub?: boolean;
  readonly textAlign?: string;
}

export const Heading = styled.h1<HeadingProps>`
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => (props.sub ? "1.5em" : "2em")};
  font-weight: 600;
  margin: 1rem 0;
  color: ${({ theme }) => theme.mainfc};
`;

interface MessageProps {
  readonly success?: boolean;
}
export const Message = styled.div<MessageProps>`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  max-width: 888px;
  text-align: left;
  color: ${({ success }): string =>
    success ? "rgba(255, 255, 255,0.9)" : "rgba(255, 255, 255, 0.9)"};
  background: ${(props) => (props.success ? "#51CD80" : "#ff243d")};
  padding: 14px 28px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const Button = styled.button`
  background: #4285f4;
  border: none;
  border-radius: 3px;
  padding: 0.5em 1.5em;
  font-size: 0.7em;
  font-weight: 400;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;
