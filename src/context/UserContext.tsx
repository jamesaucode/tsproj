import React, { createContext, useEffect, useContext, useReducer } from "react";
import styled from "styled-components";
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

export const UserContext = createContext<UserTypes | null>(null);

interface StateProps {
  data: UserTypes | null;
  isLoading: boolean;
  isError: boolean;
}

const actions = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILED: "FETCH_FAILED",
};

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
  const url = "/api/user";
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    isError: false,
  });
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      dispatch({ type: actions.FETCH_INIT });
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        setTimeout((): void => {
          dispatch({ type: actions.FETCH_SUCCESS, payload: json });
        }, 1000);
      } catch (error) {
        dispatch({ type: actions.FETCH_FAILED });
        console.log("Cannot fetch data...");
      }
    };
    fetchData();
  }, []);
  return state.isLoading ? (
    <Wrapper>
      <HeadingBase>Loading ...</HeadingBase>
      <Loading />
    </Wrapper>
  ) : (
    <UserContext.Provider value={state.data}>
      {state.isError && (
        <HeadingBase>Something went wrong during data fetching...</HeadingBase>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserTypes => useContext(UserContext);
