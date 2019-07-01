import React, { useState } from "react";
import styled from "styled-components";

interface PropTypes {
  _id: string;
  question: string;
  answer: string;
  pushNotification: (message: string, success: boolean) => void;
  controls: {
    nextCard: () => void;
    previousCard: () => void;
  };
}
const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const CardText = styled.h2`
  color: #333;
  font-size: 1em;
`;
const AnswerInput = styled.input`
  padding: 0.5em;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid gray;
`;

const Card: React.FC<PropTypes> = ({
  _id,
  question,
  answer,
  pushNotification,
  controls
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentAnswer === answer) {
      pushNotification("Correct!", true);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (currentAnswer === answer) {
        pushNotification("Correct!", true);
        setShowAnswer(false);
        controls.nextCard();
        setCurrentAnswer("");
      } else {
        setShowAnswer(true);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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