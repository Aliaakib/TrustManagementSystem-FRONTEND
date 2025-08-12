import axios from "axios";

// Use environment variable instead of hardcoding localhost
const API_URL = `${import.meta.env.VITE_API_URL}/api/trust`;

// Create new trust
export const createTrust = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Get trust by userId
export const getTrustByUser = async (userId) => {
  const res = await axios.get(`${API_URL}/by-user/${userId}`);
  return res.data;
};

// Update trust by trustId
export const updateTrust = async (trustId, formData) => {
  const res = await axios.put(`${API_URL}/${trustId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
