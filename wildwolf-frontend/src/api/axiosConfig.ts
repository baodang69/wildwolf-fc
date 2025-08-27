import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/",
  withCredentials: true, // Cho phép gửi cookie kèm theo request
});

export default api;
