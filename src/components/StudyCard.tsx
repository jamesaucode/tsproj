import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Button, font, colors } from "../../utils/style";
import { useNotification } from "../components/Notification/Notification";
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
  height: auto;
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
const StudyCard: React.FunctionComponent = (): JSX.Element => {
  const { pushNotification } = useNotification();
  const { data } = useUserData();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState();
  const dropDownInputRef = useRef<HTMLInputElement>();

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
  const handleSubmit = async (): Promise<void> => {
    try {
      event.preventDefault();
      const response = await fetch(`/api/cardset/${selected}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });
      const json = await response.json();
      if (response.ok && json) {
        pushNotification(json.message, true);
        clearInput();
      }
    } catch (error) {
      pushNotification(error.message, false);
    }
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
    setSelected((event.target as HTMLElement).textContent);
  };
  const handleOptionSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    try {
      event.preventDefault();
      const response = await fetch("/api/cardset", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: dropDownInputRef.current.value,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const hasExistingCardsets = (data && data.cardSet.length > 0) || false;
  return (
    <Wrapper>
      <DropDownMenu
        initSelect={hasExistingCardsets ? data.cardSet[0].name : null}
      >
        <DropDownMenu.MenuTitle>Choose a set</DropDownMenu.MenuTitle>
        {hasExistingCardsets
          ? data.cardSet.map(
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
        <DropDownMenu.Input
          ref={dropDownInputRef}
          placeholder="Create a new set"
        />
        <DropDownMenu.MenuButton onClick={handleOptionSubmit}>
          Create
        </DropDownMenu.MenuButton>
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
