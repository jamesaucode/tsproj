import React, { useEffect, useState, EffectCallback, useCallback } from "react";
import styled from "styled-components";
import LeftArrow from "../../src/components/Icons/LeftArrow";
import RightArrow from "../../src/components/Icons/RightArrow";
import NavBar from "../../src/components/NavBar";
import Card from "../../src/components/Card";
import Loading from "../../src/components/Loading";
import { HeadingBase, Layout } from "../../utils/style";
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState(0);
  const nextCard = useCallback((): void => {
    const maxIndex = data.cardSet[selectedSet].cards.length || 0;
    setCurrentCardIndex((prevCurrentCardIndex): number =>
      prevCurrentCardIndex + 1 < maxIndex
        ? prevCurrentCardIndex + 1
        : prevCurrentCardIndex,
    );
  }, [data.cardSet, selectedSet]);
  const previousCard = useCallback((): void => {
    setCurrentCardIndex((prevCurrentCardIndex): number =>
      prevCurrentCardIndex - 1 < 0
        ? prevCurrentCardIndex
        : prevCurrentCardIndex - 1,
    );
  }, []);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
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
    },
    [nextCard, previousCard],
  );
  useEffect((): EffectCallback => {
    window.addEventListener("keydown", handleKeyDown);
    if (data) {
      setLoading(false);
    }
    return (): void => window.removeEventListener("keydown", handleKeyDown);
  }, [data, handleKeyDown]);
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

  const hasExistingCardsets = data.cardSet.length > 0 || false;

  return loading ? (
    <React.Fragment>
      <NavBar />
      <Layout>
        <Loading />
      </Layout>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <NavBar />
      <CustomLayout>
        {hasExistingCardsets ? (
          <CardWrapper>
            <ControlsDiv onClick={controls.previousCard}>
              <LeftArrow />
            </ControlsDiv>
            <Card
              {...data.cardSet[selectedSet].cards[currentCardIndex]}
              pushNotification={props.pushNotification}
              controls={controls}
            />
            <ControlsDiv onClick={controls.nextCard}>
              <RightArrow />
            </ControlsDiv>
          </CardWrapper>
        ) : (
          <HeadingBase>No cards</HeadingBase>
        )}
      </CustomLayout>
    </React.Fragment>
  );
};

export default Review;
