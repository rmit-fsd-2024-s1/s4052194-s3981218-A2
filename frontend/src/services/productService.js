import { createContext, useReducer, useContext } from "react";
// import shopReducer, { initialState } from "./shopReducer";
import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// Add to cart 
export async function getAllProducts() {
    const response = await axios.get(API_HOST + "/api/products");
    return response.data;
  }

  export async function getSpecialProducts() {
    const response = await axios.get(API_HOST + "/api/special_products");
    return response.data;
  }
