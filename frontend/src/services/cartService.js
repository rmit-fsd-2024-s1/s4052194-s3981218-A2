import { createContext, useReducer, useContext } from "react";
// import shopReducer, { initialState } from "./shopReducer";
import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

// Add to cart 
export async function addCart(product) {
  console.log('reached', product);
  const item = {
    user_id:product.user_id,
    product_id:product.product_id,
    quantity:product.quantity
  }
    const response = await axios.post(API_HOST + "/api/cart", item);
    return response;
  }

// Get Current User Cart
export async function getCartById(userId) {
    //test 
    const response = await axios.get(API_HOST + "/api/cart/" + userId);
    return response
  }

// Get Current User Cart
export async function removeOne(item) {
  const product = {
    user_id:item.user_id,
    product_id:item.product_id
  }
  const response = await axios.delete(API_HOST + "/api/cart/delete",{data:product});
  return response
}

//update quantity
export async function updateCart(item) {
  const response = await axios.put(API_HOST + "/api/cart",item);
  return response
}