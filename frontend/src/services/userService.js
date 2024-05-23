//testing
import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

// Function to create a new user
const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
};
