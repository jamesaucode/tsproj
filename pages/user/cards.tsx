import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { NextFC } from "next";
import styled from "styled-components";
import { useUserData } from "../../src/hooks/useUserData";
import fetch from "isomorphic-unfetch";
import { handleJSONResponse } from "../../services/fetch.service";
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
`;
const Card = styled.div`
  align-items: center;
  display: flex;
  font-size: calc(0.35vw + 16px);
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const CardText = styled.span`
  font-size: 0.8em;
  color: #333;
`;
const CardTextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const CardTag = styled.span`
  color: #888;
  font-size: 0.65em;
  padding: 0.5rem 0;
`;
const CardList = styled.ul`
  font-size: calc(0.35vw + 16px);
  padding: 1em;
  width: 100%;
`;
const Button = styled.button`
  border: none;
  background-color: red;
  color: #fff;
  font-size: 0.7em;
  padding: 0.5em;
  margin: 0.5rem;
  text-transform: uppercase;
`;

const Cards: NextFC = (props: any) => {
  console.log(props);
  const userData = useUserData();
  const [cards, setCards] = useState();
  const [showModal, setShowModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");
  useEffect(() => {
    if (props.cards) {
      if (props.cards) {
        setCards(props.cards);
      } else if (userData) {
        setCards(userData.cards);
      }
    }
  }, [userData, props.cards]);
  const handleClick = (cardId: string) => {
    setCardToDelete(cardId);
    setShowModal(true);
  };
  const deleteCardHandler = (cardId: string) => {
    fetch("/api/card", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: cardId })
    }).then(response => {
      if (response.ok) {
        setCards(cards.filter(card => card._id !== cardId));
      }
    });
    setShowModal(false);
  };
  return (
    <>
      <NavBar />
      <Layout>
        <Heading>Your cards</Heading>
        <CardList>
          {cards ? (
            cards.map(card => {
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
                    <Button onClick={() => handleClick(card._id)}>
                      Remove
                    </Button>
                  </Card>
                </CardWrapper>
              );
            })
          ) : (
            <Heading>{"NO CARDS LMAOO"}</Heading>
          )}
          {showModal && (
            <Modal
              Embedded={() => (
                <Prompt onClick={() => deleteCardHandler(cardToDelete)} />
              )}
              parentProps={props}
              closeModal={() => setShowModal(false)}
            />
          )}
        </CardList>
      </Layout>
    </>
  );
};

Cards.defaultProps = {
  cards: null
};

Cards.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const apiUrl = isServer
    ? `${protocol}://${req.headers.host}/api/cards`
    : `${protocol}://${window.location.host}/api/cards`;
  if (isServer) {
    return { ...query };
  } else {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });
    const json = handleJSONResponse(response);
    return json.then(data => {
      return { cards: data };
    });
  }
};

export default Cards;
