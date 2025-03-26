import axios from "axios";

// The baseURL is set from an environment variable (VITE_API_URL)
// or falls back to localhost for development.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export default axiosInstance;
