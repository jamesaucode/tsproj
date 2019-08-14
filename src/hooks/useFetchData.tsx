import { useEffect, useReducer, useState } from "react";
import { UserTypes } from "../../resources/user/user.model";

interface StateTypes<T = {}> {
  data: T | {};
  isLoading: boolean;
  isError: boolean;
}

const actions = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILED: "FETCH_FAILED",
};

const reducer = (state, action): StateTypes => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_FAILED":
      return { ...state, isLoading: false, isError: true };
  }
};

const useFetchData = (
  initUrl = "",
  initData = {},
): [StateTypes<UserTypes>, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, dispatch] = useReducer(reducer, {
    data: initData,
    isLoading: true,
    isError: false,
  });
  const [url, setUrl] = useState(initUrl);
  const { data, isLoading, isError } = state;

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      dispatch({ type: actions.FETCH_INIT });
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const json = await response.json();
        dispatch({ type: actions.FETCH_SUCCESS, payload: json });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: actions.FETCH_FAILED });
      }
    };
    if (url) {
      fetchData();
    }
  }, [url]);
  return [{ isLoading, isError, data }, setUrl];
};

export default useFetchData;
