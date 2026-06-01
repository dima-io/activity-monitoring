import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

console.log("API_URL =", API_URL);

export async function addActivity(payload) {
  const response = await axios.post(`${API_URL}/activities`, payload);
  return response.data;
}

export async function fetchActivities(userId) {
  const response = await axios.get(`${API_URL}/activities?userId=${userId}`);
  return response.data;
}
