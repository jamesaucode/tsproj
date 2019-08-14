import React, { useState, useEffect } from "react";
import { NextFC } from "next";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import { handleJSONResponse } from "../../services/fetch.service";
import {
  colors,
  font,
  Layout,
  HeadingBase,
  breakPoints,
} from "../../utils/style";
import { useUserData } from "../../src/hooks/useUserData";
import NavBar from "../../src/components/NavBar";
import Modal from "../../src/components/Modal";
import Prompt from "../../src/components/Prompt";

const CardWrapper = styled.li`
  border-radius: 3px;
  width: 100%;
  min-width: 200px;
  max-width: 888px;
  padding: 0.5em;
  border-bottom: 1px solid #ddd;
  margin: 0 auto;
  text-align: initial;
`;
const CardTitle = styled.h1`
  color: ${colors.black};
  display: inline-block;
  font-size: ${font.fontSize.lg};
  font-weight: 500;
  position: relative;
  text-align: center;
  margin: 20px 0;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5px;
    background-color: ${colors.blue}bb;
  }
`;
const Card = styled.div`
  align-items: center;
  display: flex;
  font-size: calc(0.35vw + 16px);
  justify-content: space-between;
  @media (max-width: ${breakPoints.sm}px) {
    flex-direction: column;
  }
`;
const CardText = styled.span`
  font-size: ${font.fontSize.sm};
  color: ${colors.black};
`;
const CardTextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const CardTag = styled.span`
  color: #888;
  font-size: ${font.fontSize.sm};
  padding: 0.5rem 0;
`;
const CardList = styled.ul`
  font-size: calc(0.35vw + 16px);
  padding: 1em;
  width: 100%;
  text-align: center;
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  background-color: #ff351f;
  color: #fff;
  font-size: ${font.fontSize.sm};
  font-weight: 600;
  padding: 0.75em;
  margin: 0.5rem;
`;
const Heading = styled(HeadingBase)`
  font-size: ${font.fontSize.md};
  font-weight: 500;
`;

const Cards: NextFC = (props): JSX.Element => {
  const userData = useUserData();
  const [cardSets, setCardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");
  useEffect((): void => {
    setCardSets(userData.data.cardSet);
  }, [userData.data.cardSet]);
  const handleClick = (cardId: string): void => {
    setCardToDelete(cardId);
    setShowModal(true);
  };
  const deleteCardHandler = (cardId: string): void => {
    fetch(`/api/card/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response): void => {
      if (response.ok) {
        setCardSets(cardSets.filter((card): boolean => card._id !== cardId));
      }
    });
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <Layout fadeIn>
        <HeadingBase>Your cards</HeadingBase>
        <CardList>
          {cardSets.length > 0 ? (
            cardSets.map(
              (cardSet): JSX.Element => {
                return (
                  <React.Fragment key={cardSet._id}>
                    <CardTitle>{cardSet.name}</CardTitle>
                    {cardSet.cards.map(
                      (card): JSX.Element => {
                        return (
                          <CardWrapper key={card._id}>
                            <Card>
                              <CardTextBox>
                                <CardTag>Question:</CardTag>
                                <CardText>{card.question}</CardText>
                              </CardTextBox>
                              <CardTextBox>
                                <CardTag>Answer:</CardTag>
                                <CardText>{card.answer}</CardText>
                              </CardTextBox>
                              <Button
                                onClick={(): void => handleClick(card._id)}
                              >
                                Remove
                              </Button>
                            </Card>
                          </CardWrapper>
                        );
                      },
                    )}
                  </React.Fragment>
                );
              },
            )
          ) : (
            <Heading textAlign="center">You do not have any cards yet</Heading>
          )}
          {showModal && (
            <Modal
              parentProps={props}
              closeModal={(): void => setShowModal(false)}
            >
              <Prompt onClick={(): void => deleteCardHandler(cardToDelete)} />
            </Modal>
          )}
        </CardList>
      </Layout>
    </>
  );
};

Cards.defaultProps = {
  cards: null,
};

Cards.getInitialProps = async ({ req, query }): Promise<Record<string, {}>> => {
  const isServer = !!req;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/cardset`
    : `${protocol}://${window.location.host}/api/cardset`;
  if (isServer) {
    return { ...query };
  } else {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const json = handleJSONResponse(response);
    return json.then(
      (data): Record<string, {}> => {
        return { cardSet: data };
      },
    );
  }
};

export default Cards;
