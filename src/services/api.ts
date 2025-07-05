import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    console.log("estou no api");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
