import axios from "axios";

export const API = axios.create({
  baseURL: "https://4a52ad4cfcf5b09a.mokky.dev/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
