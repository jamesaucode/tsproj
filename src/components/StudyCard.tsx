import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withErrorMessage }from './ErrorMessageHOC';
import { SessionProps } from '../../typings/express';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #008f00;
  padding: 5em 8em;
  max-height: 450px;
  max-width: 450px;
  font-size: calc(0.35vw + 16px);
`;
const Input = styled.input`
  border: none;
  font-size: 0.7em;
  padding: 0.5em 1em;
`;
const Button = styled.button`
  border: none;
  padding: 0.25em 1em;
  font-size: 0.8em;
`;
const StudyCard: React.FunctionComponent<SessionProps> = ({ session }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const formControls: {
    [key: string]: React.Dispatch<React.SetStateAction<string>>;
  } = {
    question: setQuestion,
    answer: setAnswer,
  };

  const changeHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    formControls[name](value);
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetch("/api/card", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer, id : session.passport.user.id }),
    })
    .then(response => response.json())
    .then(json => console.log(json));
  };
  return (
    <CardWrapper>
      <Input
        onChange={changeHandler}
        value={question}
        name="question"
        type="text"
        placeholder="Question"
      />
      <Input
        onChange={changeHandler}
        value={answer}
        name="answer"
        type="text"
        placeholder="Answer"
      />
      <Button onClick={handleSubmit}>Save</Button>
    </CardWrapper>
  );
};

export default React.memo(StudyCard);