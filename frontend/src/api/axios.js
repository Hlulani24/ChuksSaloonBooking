import axios from "axios";

// In production, frontend and backend live on different Render URLs, so a
// relative "/api" path has nowhere real to go — it only worked locally because
// Vite's dev server proxies it. VITE_API_URL must be set to the real backend
// URL (e.g. https://amara-api.onrender.com/api) before deploying.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach the saved token (if any) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("amara_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
