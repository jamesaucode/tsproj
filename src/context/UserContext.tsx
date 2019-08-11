import React, { createContext, useEffect, useContext, useReducer } from "react";
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

export const UserContext = createContext<UserTypes | null>(null);

interface StateProps {
  data: UserTypes | null;
  isLoading: boolean;
  isError: boolean;
}

const reducer = (state, action): StateProps => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILED":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

export const UserProvider: React.FunctionComponent = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    isError: false,
  });
  const url = "/api/user";

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        setTimeout((): void => {
          dispatch({ type: "FETCH_SUCCESS", payload: json });
        }, 1000);
      } catch (error) {
        dispatch({ type: "FETCH_FAILED" });
        console.log("Cannot fetch data...");
      }
    };
    fetchData();
  }, [url]);
  return state.isLoading ? (
    <Wrapper>
      <Heading>Loading ...</Heading>
      <Loading />
    </Wrapper>
  ) : (
    <UserContext.Provider value={state.data}>
      {state.isError && (
        <Heading>Something went wrong during data fetching...</Heading>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserTypes => useContext(UserContext);
