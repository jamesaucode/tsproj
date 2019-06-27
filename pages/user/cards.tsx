import React, { useState } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { withAuthorization } from "../../src/components/AuthorizationHOC";
import { SessionProps } from "../../typings/express";
import { NextFC } from "next";
import styled from "styled-components";

const CardWrapper = styled.li`
  border-radius: 3px;
  background: #008f00;
  padding: 1em;
  min-width: 200px;
  max-width: 400px;
  height: 50px;
  margin-bottom: 1em;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  font-size: calc(0.35vw + 16px);
  align-items: stretch;
`;
const CardText = styled.span`
  font-size: 0.9em;
  color: white;
`;

const Cards: NextFC<SessionProps> = (props: any) => {
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
      console.log(response);
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

export default React.memo(withAuthorization(Cards));
