import axios from "axios";

// Use Vite environment variable
const API_URL = `${import.meta.env.VITE_API_URL}/api/documents`;

export const getDocuments = (trustId) =>
  axios.get(API_URL, { params: { trustId } });

export const uploadDocument = (formData) => axios.post(API_URL, formData);

export const deleteDocument = (id) => axios.delete(`${API_URL}/${id}`);
