import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

export async function getAllReviews() {
  const response = await axios.get(API_HOST + "/api/review");
  return response.data;
}

export async function addReview(review) {
  const response = await axios.post(API_HOST + "/api/review", review);
  return response.data;
}

export async function deleteReview(id) {
  const review = {
    review_id: id,
  };
  const response = await axios.delete(API_HOST + "/api/review/delete", {
    data: review,
  });
  return response.data;
}

export async function editReview(id, comment) {
  console.log("id", id);
  const review = {
    review_id: id,
    comment: comment,
  };
  const response = await axios.patch(API_HOST + "/api/review", review);
  return response.data;
}
