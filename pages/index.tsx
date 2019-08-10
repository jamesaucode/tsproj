import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Heading } from "../utils/style";
import { NextFC } from "next";
import MainLogo from "../src/components/Icons/MainLogo";
import Link from "next/link";
import NavBar from "../src/components/NavBar";

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
const IndexHeading = styled(Heading)`
  color: ${({ theme }): string => theme.mainfc};
  letter-spacing: 1.1px;
  text-align: left;
`;
const Paragraph = styled.p`
  color: ${({ theme }): string => theme.fcFade};
  font-size: 0.9em;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 1rem;
`;
const TextBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1.5;
  flex-direction: column;
  margin: 2rem 0;
`;
const Button = styled.button`
  background-color: #3140f1;
  border: none;
  border-radius: 3px;
  padding: 0.5em 1.5em;
  font-size: 0.8em;
  font-weight: 400;
  color: #fff;
  transition: 0.5s ease-out background-color;
  &:hover {
    cursor: pointer;
  }
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem nam quasi suscipit, minus culpa officiis deleniti
                sequi, ullam at molestiae consequuntur! Libero minus
                exercitationem rerum nesciunt doloribus neque commodi fugiat.
              </Paragraph>
              <Link href="/login">
                <Button>Start Studying</Button>
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
