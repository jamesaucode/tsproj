import React, { createContext, useState, useEffect, useContext } from "react";
import { handleJSONResponse } from "../../services/fetch.service";
import { UserTypes } from "../../resources/user/user.model";

export const UserContext = createContext<{ data: UserTypes } | null>(null);

export const UserProvider: React.FunctionComponent = ({
  children,
}): JSX.Element => {
  const [data, setData] = useState();
  const url = "/api/user";
  useEffect((): void => {
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then(handleJSONResponse)
      .then((json): void => {
        console.log("Data fetched ...");
        console.log(json);
        setData(json);
      })
      .catch((error): void => console.error(error));
  }, []);
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserContext = (): { data: UserTypes } =>
  useContext(UserContext);
