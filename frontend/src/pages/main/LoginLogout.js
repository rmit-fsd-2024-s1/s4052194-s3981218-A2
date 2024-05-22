import React from "react";
import { useState, useEffect } from "react";
import { getUser, removeUser, getData } from "../../services/repository";

const LoginLogout = () => {
  const [username, setUsername] = useState(getUser());
  const [userId,setUserId] = useState(null);
  const loginUser = (username) => {
    setUsername(username);
  };
  const logout = () => {
    removeUser();
    setUsername(null);
  };
  useEffect(() => {
    const getActiveUser = () => {
      if (username !== null) {
        return getData("activeUser");
      }
      return null;
    };
    const getId = () => {
      const activeUser = getActiveUser();
      if (activeUser !== null) {
        console.log("e",activeUser.user_id);
        setUserId(activeUser.user_id);
        return activeUser.user_id;
      }
      return null;
    };
    getId();
  }, [username]);
  // const getActiveUser = () => {
  //   if (username !== null) {
  //    return getData("activeUser")
  //   }
  //   return null;
  // };
  // const getId = () => {
  //   const activeUser = getActiveUser();
  //   if (activeUser !== null) {
  //     return activeUser.user_id;
  //   }
  //   return null;
  // }
  return { username, loginUser, logout, userId };
};

export default LoginLogout;
