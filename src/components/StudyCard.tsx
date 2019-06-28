import React, { useState } from "react";
import styled from "styled-components";
import { SessionProps } from "../../typings/express";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #00b800;
  font-size: calc(0.35vw + 16px);
  width: 100%;
  height: 100%;
`;
const Input = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  flex: 1 auto;
  font-size: 0.7em;
  padding: 0.5em 1em;
  color: rgba(255, 255, 255, 0.85);
  resize: none;
  box-sizing: border-box;
  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
    color: white;
  }
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  font-size: 0.9em;
  width: 100%;
  padding: 0.5em 1em;
  background: #8610f9;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  min-height: 300px;
  max-height: 450px;
  min-width: 350px;
  max-width: 800px;
`;
// const StudyCard: React.FunctionComponent<SessionProps> = ({ session }) => {
const StudyCard: React.FunctionComponent<any> = ({ session, pushNotification, popNotification }) => {
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
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    formControls[name](value);
  };
  const clearInput = () => {
    setQuestion("");
    setAnswer("");
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const JSONHeader: Headers = new Headers({
      "Content-Type": "application/json",
    });
    fetch("/api/card", {
      method: "POST",
      credentials: "include",
      headers: JSONHeader,
      body: JSON.stringify({ question, answer, id: session.passport.id }),
    }).then(response => {
      if (response.ok) {
        console.log("OK!");
        clearInput();
      }
      return response.json();
    })
    .then(json => {
      if (json) {
        pushNotification(json.message,json.good);
      }
    });
  };
  return (
    <Wrapper>
      <CardWrapper>
        <Input
          onChange={changeHandler}
          value={question}
          name="question"
          placeholder="Question"
        />
        <Input
          onChange={changeHandler}
          value={answer}
          name="answer"
          placeholder="Answer"
        />
      </CardWrapper>
      <Button onClick={handleSubmit}>Save</Button>
    </Wrapper>
  );
};

export default React.memo(StudyCard);
