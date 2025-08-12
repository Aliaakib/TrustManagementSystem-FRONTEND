import axios from "axios";

// Use environment variable for backend URL
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/donations`;

export const getDonations = async (trustId) => {
  const res = await axios.get(BASE_URL, { params: { trustId } });
  return res.data;
};

export const addDonation = async (donation) => {
  const res = await axios.post(BASE_URL, donation);
  return res.data;
};

export const deleteDonation = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
