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
      console.log('run')
    };
    fetchInitData();
  }, []);

  const following = async (user_follower, user_followed) => {
    try {
      await follow(user_follower, user_followed);
      //update state
      dispatch({
        type: "follow",
        payload: {
          followers: {
            user_follower: user_follower,
            user_followed: user_followed,
          },
        },
      });
    } catch (error) {
      console.error("Error following:", error);
    }
    //if added successfully
  };
  const unfollowing = async (user_follower, user_followed) => {
    try {
      //call api
      await unFollow(user_follower, user_followed);
      //update state
      const followUpdate = state.followers.filter(
        (f) =>
          f.user_follower !== user_follower && f.user_followed !== user_followed
      );
      console.log("xxx", followUpdate);
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
  return { state,following,unfollowing };
};

export default useFollower;
