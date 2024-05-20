import React from "react";
import { useEffect } from "react";
const useCheckLogin = (username, isLoggedIn, setIsLoggedIn) => {
  useEffect(() => {
    if (username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);
  console.log(isLoggedIn);
};

export default useCheckLogin;
