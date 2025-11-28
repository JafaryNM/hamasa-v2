import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.48.124.122/api/hamasa-api/v1/",
  // baseURL: "http://test.com:8000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
