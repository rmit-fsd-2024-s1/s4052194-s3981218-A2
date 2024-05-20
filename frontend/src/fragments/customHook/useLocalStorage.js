//the following snippet has been borrowed (or based upon) from week 3 course material for cosc2758/2938 semester 1, 2024.
import React, { useState, useEffect } from "react";

const useLocalStorage = (storageKey, Key) => {
  // localStorage.setItem(storageKey,JSON.stringify(Key))
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Key));
  }, [Key]);
};
export default useLocalStorage;
