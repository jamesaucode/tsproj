import React, { useState } from "react";
import styled from "styled-components";
import { ISession } from "../../interfaces/express";
import { handleResponse } from "../../services/fetch.service";
import { useUserData } from "../hooks/useUserData";
import DropDownMenu from "./DropDownMenu";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  font-size: calc(0.35vw + 16px);
  width: 100%;
  height: 100%;
  height: 400px;
`;
const InputArea = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  color: #333;
  flex: 1 auto;
  font-size: 1em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding: 0.5em 1em;
  resize: none;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 688px;
`;
const StudyCard: React.FunctionComponent<ISession | any> = ({
  pushNotification,
}): JSX.Element => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState();
  const userData = useUserData();

  const formControls: {
    [key: string]: React.Dispatch<React.SetStateAction<string>>;
  } = {
    question: setQuestion,
    answer: setAnswer,
    selected: setSelected,
  };
  const changeHandler = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>): void => {
    formControls[name](value);
  };
  const clearInput = (): void => {
    setQuestion("");
    setAnswer("");
  };
  const handleSubmit = (): void => {
    fetch(`/api/card/${selected}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        creator: userData._id,
      }),
    })
      .then(handleResponse)
      .then((json): void => {
        pushNotification(json.message, true);
        clearInput();
      })
      .catch((error): void => {
        pushNotification(error.message, false);
      });
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.keyCode === 13) {
      handleSubmit();
      clearInput();
    }
  };
  return (
    <Wrapper>
      <DropDownMenu>
        <DropDownMenu.Option>Lol</DropDownMenu.Option>
        <DropDownMenu.Option>Lmaooo</DropDownMenu.Option>
        <DropDownMenu.Option>LUL!</DropDownMenu.Option>
      </DropDownMenu>
      <CardWrapper>
        <InputArea
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          value={question}
          name="question"
          placeholder="Question"
        />
        <InputArea
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
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
