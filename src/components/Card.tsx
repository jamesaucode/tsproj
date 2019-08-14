import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { font, colors } from "../../utils/style";
import { useNotification } from "./Notification/Notification";

interface PropTypes {
  _id: string;
  question: string;
  answer: string;
  creator: string;
  controls: {
    nextCard: () => void;
    previousCard: () => void;
  };
}
const slideIn = keyframes`
  from {
    transform: translateX(-10%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const CardText = styled.h2<{ shouldSlideIn?: boolean }>`
  color: ${colors.black};
  font-size: ${font.fontSize.lg};
  animation: ${slideIn} 400ms ease 1 forwards;
`;
const AnswerInput = styled.input`
  padding: 0.5em;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid gray;
`;

const Card: React.FunctionComponent<PropTypes> = ({
  _id,
  question,
  answer,
  controls,
}): JSX.Element => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const { pushNotification } = useNotification();
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.keyCode === 13) {
      if (currentAnswer === answer) {
        pushNotification("Correct!", true);
        controls.nextCard();
        setCurrentAnswer("");
      } else {
        setShowAnswer(true);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentAnswer(event.target.value);
  };
  return (
    <CardBody>
      <CardText>{question}</CardText>
      {showAnswer && <CardText>{answer}</CardText>}
      <AnswerInput
        onChange={handleChange}
        placeholder="Answer"
        name="answer"
        value={currentAnswer}
        onKeyDown={handleKeyDown}
      />
    </CardBody>
  );
};

export default Card;
