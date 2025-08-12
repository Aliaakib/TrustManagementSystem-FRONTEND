import axios from "axios";

const API_URL = "http://localhost:5000/api/documents";

export const getDocuments = (trustId) =>
  axios.get(API_URL, { params: { trustId } });

export const uploadDocument = (formData) => axios.post(API_URL, formData);

export const deleteDocument = (id) => axios.delete(`${API_URL}/${id}`);
