import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
const useHandleClick = (username) => {
  const navigate = useNavigate();

  const [productSelected, setProductSelected] = useState(null);
  //handle click and pass the status add or remove to the custom hook cart
  const handleClick = (product) => {
    if (username === null) {
      alert("You need to log in first");
      navigate("/login");
    } else {
      setProductSelected(product);
    }
  };

  return [productSelected, handleClick];
};

export default useHandleClick;
