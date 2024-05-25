import { createContext, useReducer, useContext } from "react";
// import shopReducer, { initialState } from "./shopReducer";
import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

//get all followers
export async function getAllFollower() {
  const response = await axios.get(API_HOST + "/api/followers");
  return response.data;
}

export async function follow(follow, followed) {
  const response = await axios.post(API_HOST + "/api/followers", {
    user_follower: follow,
    user_followed: followed,
  });
  return response.data;
}

export async function unFollow(follow, followed) {
  const follower = {
    user_follower: follow,
    user_followed: followed,
  };
  const response = await axios.delete(API_HOST + "/api/followers", {
    data: follower,
  });
  return response.data;
}
