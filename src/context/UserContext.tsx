import React, { createContext, useContext } from "react";
import styled from "styled-components";
import useFetchData from "../hooks/useFetchData";
import { UserTypes } from "../../resources/user/user.model";
import { HeadingBase } from "../../utils/style";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserContext = createContext<UserTypes | {} | null>(null);

export const UserProvider: React.FunctionComponent = ({
  children,
}): JSX.Element => {
  const [{ data, isLoading, isError }] = useFetchData("/api/user");
  return isLoading ? (
    <Wrapper>
      <HeadingBase>Loading</HeadingBase>
      <Loading />
    </Wrapper>
  ) : (
    <UserContext.Provider value={data}>
      {isError && (
        <HeadingBase>Something went wrong during data fetching...</HeadingBase>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserTypes | {} => useContext(UserContext);
