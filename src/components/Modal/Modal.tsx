import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { fadeIn, Layout, Heading } from "../../styles/shared";

const ModalWrapper = styled.div`
  max-height: 500px;
  max-width: 888px;
  min-width: 350px;
  border-radius: 3px;
  border-radius: 3px;
  padding: 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-out 1;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;
const ModalHeading = styled.h1`
  text-align: center;
  font-size: 1.5em;
  padding: 2rem;
`;
const DivWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 10;
`
const Modal = ({ Embedded, isOpen, toggleOpen, title }: any) => {
  useEffect(() => {
    console.log("Modal Mounted");
    // Cleanup function
    return () => {
      console.log("Unmounting");
    };
  }, []);
  return isOpen
    ? ReactDOM.createPortal(
      <DivWrapper onClick={() => toggleOpen()}>
        <ModalWrapper>
          {title && <ModalHeading>{title}</ModalHeading>}
          <Embedded />
        </ModalWrapper>
      </DivWrapper>, document.body)
    : null;
};

export default Modal;
