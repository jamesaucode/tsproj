import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { fadeIn } from "../../styles/shared";
import { NextFC } from "next";

const ModalWrapper = styled.div`
  max-height: 500px;
  max-width: 888px;
  min-width: 350px;
  border-radius: 3px;
  padding: 1rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-out 1;
`;
const ModalHeading = styled.h1`
  text-align: center;
  font-size: 1.5em;
  padding: 2rem;
`;
const DivOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 10;
`;
interface ModalProps {
  Embedded : React.FC
  isOpen: boolean
  toggleOpen: (value: void ) => void
  title?: string
}
const Modal : NextFC<ModalProps> = ({ Embedded, isOpen, toggleOpen, title }) => {
  // For testing
  useEffect(() => {
    console.log("Modal Mounted");
    // Cleanup function
    return () => {
      console.log("Unmounting");
    };
  }, []);
  return isOpen
    ? ReactDOM.createPortal(
        <>
          <DivOverlay onClick={() => { toggleOpen() }} />
          <ModalWrapper>
            {title && <ModalHeading>{title}</ModalHeading>}
            <Embedded />
          </ModalWrapper>
        </>, document.body
      )
    : null;
};

Modal.defaultProps = {
  isOpen: false
}

export default Modal;
