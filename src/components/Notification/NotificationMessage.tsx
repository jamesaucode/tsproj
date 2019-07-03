import React from "react";
import styled from "styled-components";
import { fadeIn, Message } from "../../styles/shared";
import { NextFC } from "next";
import { IMessage } from '../../../interfaces/message';
import SVG from 'react-inlinesvg';

interface WrapperProps {
  mounted?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  transition: 0.5s ease-in-out opacity;
`;
const Important = styled.span`
  font-weight: 700;
`;
const SVGWrapper = styled.div`
  padding: 0 0.5rem;
`
const renderImportant = (text: string) => <Important>{text}</Important>;
const NotificationMessage: NextFC<IMessage> = ({
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
        <SVGWrapper onClick={() => removeNotification(id)}>
          <SVG className="small-icon" src="/static/images/close.svg" />
        </SVGWrapper>
      </Message>
    </Wrapper>
  );
};

NotificationMessage.defaultProps = {
  success: false,
  message: "No message",
};

export default React.memo(NotificationMessage);
