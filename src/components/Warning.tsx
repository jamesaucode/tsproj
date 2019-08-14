import React from "react";
import styled from "styled-components";

const Message = styled.p`
  font-size: 0.8em;
  color: red;
`;

const Warning: React.FunctionComponent = ({ children }): JSX.Element => {
  return <Message>{children}</Message>;
};

export default Warning;
