import styled, { keyframes } from "styled-components";

interface SVGWrapperProps {
  size: {
    height: number;
    width: number;
  };
}

interface HeadingProps {
  readonly sub?: boolean;
}

export const font = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: {
    sm: "0.8em",
    md: "1em",
    lg: "1.5em",
    xl: "2em",
  },
};

export const colors = {
  brandDark: "#8610f9",
  brand: "#9e3bff",
  brandLight: "#b263ff",
  blue: "#0f76fc",
  white: "#ffffff",
  black: "#222222",
};

export const breakPoints = {
  sm: 400,
  md: 736,
  lg: 980,
  xl: 1280,
};

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
  height: ${({ fitContent }): string => (fitContent ? "fit-content" : "100%")};
  font-size: calc(0.35vw + 16px);
  box-sizing: border-box;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-name: ${fadeIn};
  animation-duration: ${(props): string | number =>
    props.fadeIn ? 0.8 + "s " : 0};
  animation-iteration-count: 1;
  animation-timing-function: ease-out;

  @media (max-width: ${breakPoints.md}px) {
    margin: 2rem 20px;
  }
`;

interface HeadingProps {
  readonly sub?: boolean;
  readonly textAlign?: string;
}

export const HeadingBase = styled.h1<HeadingProps>`
  text-align: ${(props): string => props.textAlign};
  font-size: ${(props): string => (props.sub ? "1.5em" : "2em")};
  font-weight: 600;
  margin: 1rem 0;
  color: ${({ theme }): string => theme.mainfc};
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
  background: ${(props): string => (props.success ? "#51CD80" : "#ff243d")};
  padding: 14px 28px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
interface ButtonProps {
  fullWidth?: boolean;
}
export const Button = styled.button<ButtonProps>`
  background: ${colors.brand};
  border: none;
  border-radius: 3px;
  padding: 12px 15px;
  font-size: ${font.fontSize.sm};
  font-weight: 400;
  color: #fff;
  width: ${({ fullWidth }): string => (fullWidth ? "100%" : "")};
  &:hover {
    cursor: pointer;
  }
`;
