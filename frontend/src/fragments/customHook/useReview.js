import React from "react";
import { useReducer, useEffect, useState } from "react";
import {
  getAllReviews,
  addReview,
  deleteReview,
  editReview,
  addReply
} from "../../services/reviewService";
import { reviewReducer } from "../reducer/reviewReducer";
const initialState = {
  reviews: [],
};

const useReview = () => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const [loadingReview, setLoading] = useState(true);
  const [newReview, setNewReview] = useState([]);
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const reviews = await getAllReviews();
        dispatch({
          type: "InitReviews",
          payload: {
            reviews: reviews,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitData();
    //fetch api reviews
    console.log("fetch1");
  }, [newReview]);
  const getReviewByProductId = (id) => {
    const reviews = state.reviews.filter((r) => {
      return r.product_id === id;
    });
    return reviews;
  };

  const removeReview = async (id) => {
    try {
      //call api
      await deleteReview(id);
      //update state
      const reviewUpdate = state.reviews.filter(
        (review) => review.review_id !== id
      );
      const newReviews = reviewUpdate.filter(
        (review) => review.parent_id !== id
      );
      dispatch({
        type: "removeReview",
        payload: {
          newReviews: newReviews,
        },
      });
    } catch (error) {
      console.error("Error removing the review: ", error);
    }
  };

  const updateReview = async (id, newComment) => {
    try {
      let update = state.reviews.map((review) => {
        return review.review_id === id
          ? { ...review, comment: newComment }
          : review;
      });
      dispatch({
        type: "editReview",
        payload: {
          reviews: update,
        },
      });
      await editReview(id, newComment);
    } catch (error) {
      console.log(error);
    }
  };
  const createReview = async (review, condition) => {
    try {
      //call api
      let newReview = await addReview(review);
      //update state
      if (condition === "noparent") {
        newReview.parent_id = null;
      }
      dispatch({
        type: "addReview",
        payload: {
          reviews: newReview,
        },
      });
      setNewReview(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
    }
    //if added successfully
  };
  const createReply = async (review) =>{
    try {
      //call api
      let newReview = await addReply(review);
      dispatch({
        type: "addReview",
        payload: {
          reviews: newReview,
        },
      });
      setNewReview(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  }
  return {
    state,
    loadingReview,
    getReviewByProductId,
    createReview,
    createReply,
    removeReview,
    updateReview
  };
};

export default useReview;
