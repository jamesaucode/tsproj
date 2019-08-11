import React, { useState } from "react";
import styled from "styled-components";
import { Button, font, colors } from "../../utils/style";
import { ISession } from "../../interfaces/express";
import { handleResponse } from "../../services/fetch.service";
import { useUserData } from "../hooks/useUserData";
import DropDownMenu from "./DropDownMenu";

const CardWrapper = styled.div`
  box-shadow: 0px 0px 20px ${colors.black}25;
  border-radius: 3px;
  margin-bottom: 20px;
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
  font-family: ${font.fontFamily};
  padding: 0.5em 1em;
  resize: none;
  box-sizing: border-box;
`;
const Wrapper = styled.section`
  width: 100%;
  max-width: 688px;
  padding: 1rem;
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
    fetch(`/api/cardset/${selected}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
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
  const handleOptionClick = (
    event: React.MouseEvent<HTMLSpanElement>,
  ): void => {
    setSelected(event.target.textContent);
  };

  const hasExistingCardsets = userData.data.cardSet.length > 0;
  return (
    <Wrapper>
      <DropDownMenu>
        <DropDownMenu.MenuTitle>Choose a set</DropDownMenu.MenuTitle>
        {hasExistingCardsets
          ? userData.data.cardSet.map(
              (c): JSX.Element => (
                <DropDownMenu.Option
                  key={c._id}
                  extraOnClick={handleOptionClick}
                >
                  {c.name}
                </DropDownMenu.Option>
              ),
            )
          : null}
        <DropDownMenu.Input placeholder="Create a new set" />
        <DropDownMenu.MenuButton>Create</DropDownMenu.MenuButton>
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
      <Button fullWidth onClick={handleSubmit}>
        Save
      </Button>
    </Wrapper>
  );
};

export default StudyCard;
