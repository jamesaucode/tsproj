import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { fadeIn, Message } from "../../styles/shared";
import { NextFC } from "next";
import { MessageType } from "../../../typings/message";

interface WrapperProps {
  mounted?: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  transition: 0.5s ease-in-out opacity;
  opacity: ${({ mounted }) => mounted ? "1" : "0"};
`;
const Important = styled.span`
  font-weight: 700;
`;
const renderImportant = (text: string) => <Important>{text}</Important>;
const NotificationMessage: NextFC<MessageType> = ({ success, message, id }) => {
  const [inProp, setInProp] = useState(false);
  const timer = useRef<number[]>([]);
  useEffect(() => {
    console.log("Mounted")
    setInProp(true);
    const timerId = setTimeout(() => {
      setInProp(false);
      timer.current.splice(0, 1);
    }, 2500);
    timer.current.push(timerId);
    return () => {
      console.log("Unmounting")
      setInProp(false);
      timer.current.forEach(clearTimeout);
    }
  }, [])
  return (
      <Wrapper mounted={inProp} key={id}>
        <Message success={success}>
          {success ? renderImportant("Success! ") : renderImportant("Oops! ")}
          {message}
        </Message>
      </Wrapper>
  );
};

NotificationMessage.defaultProps = {
  success: false,
  message: "No message",
};

export default React.memo(NotificationMessage);
