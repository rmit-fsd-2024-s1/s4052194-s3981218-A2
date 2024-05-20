import React from "react";
//the following snippet has been borrowed (or based upon) from week 3 course material for cosc2758/2938 semester 1, 2024.

const USERS_KEY = "users";
const USER_KEY = "activeUser";

const getUser = () => {
  const local = localStorage.getItem(USER_KEY);
  if (local != null) {
    let user = JSON.parse(local);
    return user.name;
  }
  return local;
};

const getData = (key) => {
  let items = localStorage.getItem(key);
  if (items !== null) {
    return JSON.parse(items);
  } else {
    return null;
  }
};

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const initTransaction = () => {
  if (localStorage.getItem("transaction") !== null) {
    return;
  }
  setData("transaction", []);
};
export { getUser, getData, removeUser, setData, initTransaction };
