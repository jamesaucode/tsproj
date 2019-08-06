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
  border-left: 0.35em solid #3140F1;
  animation: ${rotate} 1s linear infinite;
  text-indent: -9999em;
`;
const Loading: React.FunctionComponent = () => {
  return <Spinner></Spinner>;
};

export default Loading;
