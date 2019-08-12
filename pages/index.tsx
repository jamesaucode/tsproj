import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NextFC } from "next";
import Link from "next/link";
import { Button, Layout, HeadingBase } from "../utils/style";
import NavBar from "../src/components/NavBar";
import MainLogo from "../src/components/Icons/MainLogo";

const Wrapper = styled.section`
  font-size: calc(0.35vw + 16px);
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 2em;

  @media (max-width: 780px) {
    flex-direction: column-reverse;
  }
`;
const IndexHeading = styled(HeadingBase)`
  color: ${({ theme }): string => theme.mainfc};
  letter-spacing: 1.1px;
  text-align: left;
  margin: 40px 0;
`;
const Paragraph = styled.p`
  color: ${({ theme }): string => theme.fcFade};
  font-size: 0.9em;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 40px;
`;
const TextBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 3;
  flex-direction: column;
  margin: 2rem 0;
`;
const ThickButton = styled(Button)`
  padding: 12px 15px;
`;

const Index: NextFC = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  useEffect((): void => {
    setLoading(false);
  }, []);
  if (loading) {
    return <Layout />;
  } else {
    return (
      <>
        <NavBar />
        <Layout fadeIn>
          <Wrapper>
            <TextBox>
              <IndexHeading>The web application for students.</IndexHeading>
              <Paragraph>
                Study is hard. You get overwhelmed by all the definitions and
                theories. It is essential to devlelop a good study strategy.
                Study Well is meant to help you with that. You can create study
                flashcards that helps with your study now!
              </Paragraph>
              <Link href="/login">
                <ThickButton>Start Studying</ThickButton>
              </Link>
            </TextBox>
            <MainLogo style={{ flex: `1 1 250px` }} />
          </Wrapper>
        </Layout>
      </>
    );
  }
};

export default Index;
