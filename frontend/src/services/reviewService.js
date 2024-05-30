import axios from "axios";
import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//-- Use for creating the review ---
const GRAPH_QL_URL = "http://localhost:4000/graphql";

export async function getAllReviews() {
  const response = await axios.get(API_HOST + "/api/review");
  return response.data;
}

export async function addReply(review) {
const response = await axios.post(API_HOST + "/api/review", review);
return response.data
}
//use gql
export async function addReview(review) {
  // const response = await axios.post(API_HOST + "/api/review", review);
  const mutation = gql`
    mutation CreateReview(
      $user_id: Int!
      $product_id: Int!
      $score: Int
      $comment: String!
    ) {
      createReview(
        user_id: $user_id
        product_id: $product_id
        score: $score
        comment: $comment
      ) {
        review_id
        user_id
        product_id
        score
        comment
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, mutation, review);
  return data.createReview;
}
//delete a review
export async function deleteReview(id) {
  const review = {
    review_id: id,
  };
  const response = await axios.delete(API_HOST + "/api/review/delete", {
    data: review,
  });
  return response.data;
}
//edit a review
export async function editReview(id, comment) {
  const review = {
    review_id: id,
    comment: comment,
  };
  const response = await axios.patch(API_HOST + "/api/review", review);
  return response.data;
}
