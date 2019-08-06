import React from "react";
import styled from "styled-components";

interface PropTypes {
  text: string;
}
const Message = styled.p`
  font-size: 0.8em;
  color: red;
`;

const Warning: React.FC<PropTypes> = ({ text }): JSX.Element => {
  return <Message>{text}</Message>;
};

export default Warning;
