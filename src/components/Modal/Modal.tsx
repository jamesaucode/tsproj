import React, { useEffect, EffectCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import { fadeIn } from "../../../utils/style";
import { NextFC } from "next";

const ModalWrapper = styled.div`
  align-items: center;
  animation: ${fadeIn} 0.5s ease-out 1;
  background: #fff;
  border-radius: 3px;
  bottom: 0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: center;
  left: 0;
  margin: auto;
  max-height: 600px;
  min-height: 300px;
  padding: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  width: fit-content;
  z-index: 100;
`;
const DivOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
`;
const Wrapper = styled.div`
  align-items: "center";
  display: "flex";
  justify-content: "center";
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
  closeModal: (value: void) => void;
  parentProps?: Record<string, any>;
}
export const Modal: NextFC<ModalProps> = ({
  closeModal,
  children,
}): JSX.Element => {
  // For testing
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };
  useEffect((): EffectCallback => {
    console.log("Modal Mounted");
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function
    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("Unmounting");
    };
  }, [handleKeyDown]);
  const handleClick = (): void => {
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
          {children}
        </ModalWrapper>
      </Wrapper>
    </>,
    document.body,
  );
};

Modal.defaultProps = {
  closeModal: (): void => {
    console.log("No function was passed in..");
  },
};
