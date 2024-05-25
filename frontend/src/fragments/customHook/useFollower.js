import React from "react";
import { useReducer, useState, useEffect } from "react";
import {
  getAllFollower,
  follow,
  unFollow,
} from "../../services/followerService";
import { followerReducer } from "../reducer/followerReducer";
const initialState = {
  followers: [],
};
const useFollower = () => {
  const [state, dispatch] = useReducer(followerReducer, initialState);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const followers = await getAllFollower();
        dispatch({
          type: "InitFollowers",
          payload: {
            followers: followers,
          },
        });
      } catch (err) {
        console.log(err);
      }
      console.log("run");
    };
    fetchInitData();
  }, []);

  const following = async (fol, unfol) => {
    try {
      await follow(fol, unfol);
      //update state
      dispatch({
        type: "follow",
        payload: {
          followers: {
            user_follower: fol,
            user_followed: unfol,
          },
        },
      });
    } catch (error) {
      console.error("Error following:", error);
    }
    //if added successfully
  };
  const unfollowing = async (fol, unfol) => {
    try {
      //call api
      await unFollow(fol, unfol);
      const followUpdate = state.followers.filter(
        (f) => !(f.user_follower === fol && f.user_followed === unfol)
      );
      dispatch({
        type: "unFollow",
        payload: {
          newFollowers: followUpdate,
        },
      });
    } catch (error) {
      console.error("Error unfollowing :", error);
    }
  };
  return { state, following, unfollowing };
};

export default useFollower;
