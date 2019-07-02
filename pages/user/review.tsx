import React, { useEffect, useState } from "react";
import NavBar from "../../src/components/NavBar";
import Card from "../../src/components/Card";
import Spinner from "../../src/components/Spinner";
import { Layout } from "../../src/styles/shared";
import styled from "styled-components";
import { useUserData } from "../../src/hooks/useUserData";
import SVG from "react-inlinesvg";

const CardWrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  font-size: calc(0.35vw + 16px);
  padding: 1em 0;
  width: 100%;
  height: 100%;
  max-width: 30em;
  max-height: 20em;
  margin: 0 auto;
`;
const CustomLayout = styled(Layout)`
  height: 25em;
`;

const Review = props => {
  const userData = useUserData();
  // Index of card to be shown
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const nextCard = () => {
    console.log("Next Card");
    const maxIndex = userData.cards.length;
    if (currentCard + 1 < maxIndex) {
      setCurrentCard(currentCard + 1);
    }
  };
  const previousCard = () => {
    console.log("Previous Card");
    if (currentCard - 1 >= 0) {
      setCurrentCard(currentCard - 1);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 39:
        nextCard();
        break;
      case 37:
        previousCard();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (userData) {
      setLoading(false);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userData, currentCard]);
  const ControlsDiv = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: calc(2em + 16px);
    padding: 0 1em;
    &:hover {
      cursor: pointer;
    }
  `;
  const controls = {
    nextCard,
    previousCard
  };
  return loading ? (
    <>
      <NavBar />
      <Layout>
        <Spinner />
      </Layout>
    </>
  ) : (
    <>
      <NavBar />
      <CustomLayout>
        <CardWrapper>
          <ControlsDiv onClick={controls.previousCard}>
            <SVG className="small-icon" src="/static/images/left-arrow.svg" />
          </ControlsDiv>
          <Card
            {...userData.cards[currentCard]}
            pushNotification={props.pushNotification}
            controls={controls}
          />
          <ControlsDiv onClick={controls.nextCard}>
            <SVG className="small-icon" src="/static/images/right-arrow.svg" />
          </ControlsDiv>
        </CardWrapper>
      </CustomLayout>
    </>
  );
};

export default Review;
