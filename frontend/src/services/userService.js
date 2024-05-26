import axios from "axios";

const API_URL = "http://localhost:4000/api/users";
const AUTH_URL = "http://localhost:4000/api/auth";

// Function to create a new user
const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to sign in a user
const signInUser = async (userCredentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signin`, userCredentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch user data by ID
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to update user data
const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user account
const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    throw error;
  }
};

// Function to check if username exists
const checkUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/username/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  signInUser,
  getUserById,
  updateUser,
  deleteUser,
  checkUsername,
};
