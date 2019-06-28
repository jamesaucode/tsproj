import React, { useState } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { withAuthorization } from "../../src/components/AuthorizationHOC";
import { SessionProps } from "../../typings/express";
import { NextFC } from "next";
import styled from "styled-components";

const CardWrapper = styled.li`
  border-radius: 3px;
  width: 100%;
  min-width: 200px;
  max-width: 888px;
  padding: 0.5em;
  margin-bottom: 1em;
  border-bottom: 1px solid grey;
`;
const Card = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: calc(0.35vw + 16px);
  align-items: stretch;
`;
const CardText = styled.span`
  font-size: 0.8em;
  color: #333;
`;
const CardTextBox = styled.div`
  
`
const CardTag = styled.span`
  font-size: 0.65em;
  color: #555;
`

const Cards: NextFC = (props: any) => {
  const [cards, setCards] = useState(props.cards);
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
  if (cards.length > 0) {
    return (
      <Layout>
        <Heading>Your cards</Heading>
        <ul>
          {cards.map(card => {
            return (
              <CardWrapper key={card._id}>
                <Card>
                  <CardText>{card.question}</CardText>
                  <CardText>{card.answer}</CardText>
                  <button onClick={() => deleteCardHandler(card._id)}>
                    Delete
                  </button>
                </Card>
              </CardWrapper>
            );
          })}
        </ul>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Heading>You don't have any cards yet.</Heading>
      </Layout>
    );
  }
};

Cards.defaultProps = {
  cards: []
}

export default React.memo(withAuthorization(Cards));
