import React from "react";
import styled from "styled-components";
import { fadeIn, Message } from "../styles/shared";
import { NextFC } from "next";
import { MessageType } from '../../typings/message';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  animation: ${fadeIn} 1s ease-out 1;
`;
const Important = styled.span`
  font-weight: 700;
`;
const renderImportant = (text: string) => <Important>{text}</Important>;
const NotificationMessage: NextFC<MessageType> = ({ success, message }) => {
  return (
    <Wrapper>
      <Message success={success}>
        {success ? renderImportant("Success! ") : renderImportant("Oops! ")}
        {message}
      </Message>
    </Wrapper>
  );
};

NotificationMessage.defaultProps = {
  success: false,
  message: "No message"
}

export default React.memo(NotificationMessage);
