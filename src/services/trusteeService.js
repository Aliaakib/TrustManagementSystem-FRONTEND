// src/services/trusteeService.js
import axios from "axios";

const API = "http://localhost:5000/api/trustees";

export const getTrustees = (trustId) => axios.get(API, { params: { trustId } });
export const addTrustee = (data) => axios.post(API, data);
export const deleteTrustee = (id) => axios.delete(`${API}/${id}`);
