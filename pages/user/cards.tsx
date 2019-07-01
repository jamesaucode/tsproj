import React, { useState, useEffect } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { NextFC } from "next";
import styled from "styled-components";
import { useUserData } from "../../src/hooks/useUserData";
import fetch from "isomorphic-unfetch";
import { handleJSONResponse } from "../../services/fetch.service";
import NavBar from "../../src/components/NavBar";

const CardWrapper = styled.li`
  border-radius: 3px;
  width: 100%;
  min-width: 200px;
  max-width: 888px;
  padding: 0.5em;
  border-bottom: 1px solid #ddd;
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
  padding: 0.75rem;
`;
const CardTag = styled.span`
  color: #888;
  font-size: 0.65em;
  padding: 0.5rem 0;
`;
const CardList = styled.ul``;

const Cards: NextFC = (props: any) => {
  console.log(props);
  const userData = useUserData();
  const [cards, setCards] = useState();
  useEffect(() => {
    if (props.cards) {
      if (props.cards) {
        setCards(props.cards);
      } else if (userData) {
        setCards(userData.cards);
      }
    }
  }, [props.cards]);
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
                    <button onClick={() => deleteCardHandler(card._id)}>
                      Delete
                    </button>
                  </Card>
                </CardWrapper>
              );
            })
          ) : (
            <Heading>{"NO CARDS LMAOO"}</Heading>
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
