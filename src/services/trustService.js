// src/services/trustService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/trust";

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

// ✅ Update trust by trustId (NEW)
export const updateTrust = async (trustId, formData) => {
  const res = await axios.put(`${API_URL}/${trustId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
