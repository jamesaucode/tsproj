import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  overflow: hidden;
  border-top: 0.35em solid rgba(0, 0, 0, 0.2);
  border-right: 0.35em solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.35em solid rgba(0, 0, 0, 0.2);
  border-left: 0.35em solid #3140f1;
  animation: ${rotate} 1s linear infinite;
  text-indent: -9999em;
`;
interface BouncingDotProps {
  delay: number;
}
const bouncing = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;
const expanding = keyframes`
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
`;
const BouncingDot = styled.circle<BouncingDotProps>`
  border-radius: 50%;
  height: 8px;
  width: 8px;
  background-color: #999;
  fill: #999;
  /* animation: ${bouncing} 1000ms infinite; */
  animation: ${expanding} 1000ms infinite;
  animation-delay: ${(props): number => props.delay}ms;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  position: relative;
`;
const SVG = styled.svg`
  height: 10px;
  width: 10px;
  margin: 0 3px;
`;
const Loading: React.FunctionComponent = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* <Spinner /> */}
      <Wrapper>
        <SVG height={10} width={10} viewBox="0 0 20 20">
          <BouncingDot delay={200} cx="10" cy="10" r="10" />
        </SVG>
        <SVG height={10} width={10} viewBox="0 0 20 20">
          <BouncingDot delay={400} cx="10" cy="10" r="10" />
        </SVG>
        <SVG height={10} width={10} viewBox="0 0 20 20">
          <BouncingDot delay={600} cx="10" cy="10" r="10" />
        </SVG>
      </Wrapper>
    </React.Fragment>
  );
};

export default Loading;
