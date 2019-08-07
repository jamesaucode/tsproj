import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export const useLoginStatus = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userData = useUserContext();
  useEffect((): void => {
    if (userData) {
      setIsLoggedIn(true);
    }
  }, [userData]);

  return isLoggedIn;
};
