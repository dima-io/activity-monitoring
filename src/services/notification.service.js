import axios from "axios";

const API_URL = "http://localhost:5050/api/notifications";

export function sendReminder() {
  return axios.post(`${API_URL}/reminder`);
}

export const sendLeaderboard = () => {
  return axios.post(`${API_URL}/leaderboard`);
};
