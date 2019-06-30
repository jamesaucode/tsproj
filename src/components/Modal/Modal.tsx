import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { fadeIn } from "../../styles/shared";
import { NextFC } from "next";

const ModalWrapper = styled.div`
  min-height: 300px;
  max-height: 600px;
  width: fit-content;
  height: fit-content;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 4rem;
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
const DivOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 10;
`;
interface ModalProps {
  Embedded?: React.FC
  closeModal: (value: void ) => void
}
const Modal : NextFC<ModalProps> = ({ Embedded, closeModal , children }) => {
  // For testing
  useEffect(() => {
    console.log("Modal Mounted");
    // Cleanup function
    return () => {
      console.log("Unmounting");
    };
  }, []);
   return ReactDOM.createPortal(
        <>
          <DivOverlay onClick={() => { closeModal(); }} />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <ModalWrapper>
            { Embedded ? <Embedded /> : children }
          </ModalWrapper>
          </div>
        </>
        , document.body
   )
};

Modal.defaultProps = {
  closeModal: ()  => {console.log('No function was passed in..')}
}

export default Modal;
