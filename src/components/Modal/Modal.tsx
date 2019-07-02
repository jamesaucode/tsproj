import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { fadeIn } from "../../styles/shared";
import { NextFC } from "next";
import SVG from "react-inlinesvg";

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
  flex-direction: column;
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
const Wrapper = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
const CrossWrapper = styled.div`
  & > span > svg {
    padding: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
interface ModalProps {
  Embedded?: React.FC;
  closeModal: (value: void) => void;
  parentProps?: any;
}
export const Modal: NextFC<ModalProps> = ({
  Embedded,
  closeModal,
  parentProps,
  children
}) => {
  // For testing
  const handleKeyDown = (event : KeyboardEvent) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  }
  useEffect(() => {
    console.log("Modal Mounted");
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup function
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
      console.log("Unmounting");
    };
  }, []);
  const handleClick = () => {
    closeModal();
  };
  return ReactDOM.createPortal(
    <>
      <DivOverlay onClick={handleClick} />
      <Wrapper>
        <ModalWrapper>
          <CrossWrapper onClick={handleClick}>
            <SVG
              className="small-icon top-right"
              src="/static/images/close_black.svg"
            />
          </CrossWrapper>
          {Embedded ? <Embedded {...parentProps} /> : children}
        </ModalWrapper>
      </Wrapper>
    </>,
    document.body
  );
};

Modal.defaultProps = {
  closeModal: () => {
    console.log("No function was passed in..");
  }
};