import React from "react";
import { useState } from "react";
import { getData } from "../../data/repository";
const useCheckOut = () => {
  const [clickCheckOut, setClickCheckOut] = useState(false);
  const handleCheckOutClick = (isClickCheckout) => {
    setClickCheckOut(isClickCheckout);
  };

  return [handleCheckOutClick, clickCheckOut];
};

export default useCheckOut;
