import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

export async function getAllReviews() {
    const response = await axios.get(API_HOST + "/api/review");
    return response.data;
  }