import axios from "axios";

// Get API base from environment variable
const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

/**
 * Register a new user (admin, trustee, member)
 */
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

/**
 * Log in a user
 */
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
};
