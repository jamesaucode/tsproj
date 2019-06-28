import React, { useState } from "react";
import { Layout, Heading } from "../../src/styles/shared";
import { withAuthorization } from "../../src/components/AuthorizationHOC";
import { NextFC } from "next";
import styled from "styled-components";

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
  @media (max-width: 500px){
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
const CardList = styled.ul`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`

const Cards: NextFC = (props: any) => {
  const [cards, setCards] = useState(props.cards);
  const deleteCardHandler = (cardId: string) => {
    fetch("/api/card", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: cardId }),
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
        <CardList>
          {cards.map(card => {
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
          })}
        </CardList>
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
  cards: [],
};

export default React.memo(withAuthorization(Cards));
