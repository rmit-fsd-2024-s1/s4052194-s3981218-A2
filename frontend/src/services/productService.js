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
//get product by ID
export async function getProductById(id) {
  const response = await axios.get(API_HOST + "/api/products/"+id);
  return response.data;
}

//update product quantity
export async function updateProduct(id,body) {
  const response = await axios.put(API_HOST + "/api/products/"+id,body);
  return response.data;
}
