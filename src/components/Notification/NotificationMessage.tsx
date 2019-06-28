import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { fadeIn, Message } from "../../styles/shared";
import { NextFC } from "next";
import { MessageType } from "../../../typings/message";
import SVG from 'react-inlinesvg';

interface WrapperProps {
  mounted?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  top: 20px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  transition: 0.5s ease-in-out opacity;
  /* animation: ${fadeIn} 0.5s ease-in-out 1; */
`;
const Important = styled.span`
  font-weight: 700;
`;
const renderImportant = (text: string) => <Important>{text}</Important>;
const NotificationMessage: NextFC<MessageType> = ({
  success,
  message,
  id,
  delay = 3000,
  removeNotification
}) => {
  return (
    <Wrapper key={id}>
      <Message success={success}>
        <div>
          {success ? renderImportant("Success! ") : renderImportant("Oops! ")}
          {message}
        </div>
        <div onClick={() => removeNotification(id)}>
          <SVG className="small-icon" src="/static/images/close.svg" />
        </div>
      </Message>
    </Wrapper>
  );
};

NotificationMessage.defaultProps = {
  success: false,
  message: "No message",
};

export default React.memo(NotificationMessage);
