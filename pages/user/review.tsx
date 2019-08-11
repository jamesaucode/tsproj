import React, { useEffect, useState, EffectCallback, useMemo } from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import NavBar from "../../src/components/NavBar";
import Card from "../../src/components/Card";
import Loading from "../../src/components/Loading";
import { Heading } from "../../utils/style";
import { Layout } from "../../utils/style";
import { useUserData } from "../../src/hooks/useUserData";

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

interface PropTypes {
  pushNotification: (message: string, success: boolean) => void;
  popNotification: (message: string, success: boolean) => void;
}
const Review: React.FunctionComponent<PropTypes> = (props): JSX.Element => {
  const { data } = useUserData();
  // const { data } = useUserData() || { data: { cardSet: [{ cards: [] }] } };
  // Index of card to be shown
  const [currentCard, setCurrentCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState(0);
  const nextCard = (): void => {
    const maxIndex = data.cardSet[selectedSet].cards.length || 0;
    if (currentCard + 1 < maxIndex) {
      setCurrentCard(currentCard + 1);
    }
  };
  const previousCard = (): void => {
    if (currentCard - 1 >= 0) {
      setCurrentCard(currentCard - 1);
    }
  };
  const handleKeyDown = (event: KeyboardEvent): void => {
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
  useEffect((): EffectCallback => {
    window.addEventListener("keydown", handleKeyDown);
    if (data) {
      setLoading(false);
    }
    return (): void => window.removeEventListener("keydown", handleKeyDown);
    // }, [data, currentCard]);
  }, []);
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
    previousCard,
  };

  const hasExistingCardsets =
    data.cardSet[selectedSet].cards.length > 0 || false;

  return loading ? (
    <>
      <NavBar />
      <Layout>
        <Loading />
      </Layout>
    </>
  ) : (
    <>
      <NavBar />
      <CustomLayout>
        {hasExistingCardsets ? (
          <CardWrapper>
            <ControlsDiv onClick={controls.previousCard}>
              <SVG className="small-icon" src="/static/images/left-arrow.svg" />
            </ControlsDiv>
            <Card
              {...data.cardSet[selectedSet].cards[currentCard]}
              pushNotification={props.pushNotification}
              controls={controls}
            />
            <ControlsDiv onClick={controls.nextCard}>
              <SVG
                className="small-icon"
                src="/static/images/right-arrow.svg"
              />
            </ControlsDiv>
          </CardWrapper>
        ) : (
          <Heading>No cards</Heading>
        )}
      </CustomLayout>
    </>
  );
};

export default Review;
