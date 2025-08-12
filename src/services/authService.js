// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

/**
 * Register a new user (admin, trustee, member)
 * @param {Object} userData - name, email, phone, address, password, role
 */
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

/**
 * Log in a user (returns token and user object)
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
};
