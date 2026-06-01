import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/auth/register`, userData);

  return response.data;
}

export async function loginUser(credentials) {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
}
