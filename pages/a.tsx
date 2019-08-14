import React from "react";
import Loading from "../src/components/Loading";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
`;

export default function Test(): JSX.Element {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
}
