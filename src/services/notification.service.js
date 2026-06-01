import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export function sendReminder() {
  return axios.post(`${API_URL}/api/notifications/reminder`);
}

export const sendLeaderboard = () => {
  return axios.post(`${API_URL}/api/notifications/leaderboard`);
};
