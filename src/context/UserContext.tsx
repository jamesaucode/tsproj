import React, { createContext, useState, useEffect, useContext } from "react";
// import fetch from "isomorphic-unfetch";
import { UserTypes } from "../../resources/user/user.model";
import { Heading } from "../../utils/style";
import styled from "styled-components";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserContext = createContext<{ data: UserTypes } | null>(null);

export const UserProvider: React.FunctionComponent = ({
  children,
}): JSX.Element => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const url = "/api/user";
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        const json = await response.json();
        setData(json);
        setTimeout((): void => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsError(true);
        console.log("Cannot fetch data...");
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Wrapper>
      <Heading>Loading ...</Heading>
      <Loading />
    </Wrapper>
  ) : (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): { data: UserTypes } =>
  useContext(UserContext);
