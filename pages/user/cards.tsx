import React from "react";
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
`
const CardText = styled.span`
  font-size: .9em;
  color: white;
`
const Cards: NextFC<SessionProps> = (props: any) => {
  console.log(props);
  if (props.cards.length > 0) {
    return (
      <Layout>
        <Heading>Your cards</Heading>
        <ul>
          {props.cards.map(card => (
            <CardWrapper>
              <Card>
              <CardText>{card.question}</CardText>
              <CardText>{card.answer}</CardText>
              </Card>
            </CardWrapper>
          ))}
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
