import axios from "axios";

// Use environment variable for the backend URL
const API = `${import.meta.env.VITE_API_URL}/api/trustees`;

export const getTrustees = (trustId) => axios.get(API, { params: { trustId } });

export const addTrustee = (data) => axios.post(API, data);

export const deleteTrustee = (id) => axios.delete(`${API}/${id}`);
