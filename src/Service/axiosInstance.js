import axios from "axios";

// Create a custom Axios instance with default config
const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Append API key if not already present
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey && !config.url.includes("appid=")) {
      const hasParams = config.url.includes("?");
      config.url = `${config.url}${hasParams ? "&" : "?"}appid=${apiKey}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response, // ✅ Do not modify response, return it as-is
  (error) => {
    const { response, request, message } = error;

    if (response) {
      // Handle server errors
      switch (response.status) {
        case 401:
          console.error("Unauthorized: Please log in again.");
          break;
        case 403:
          console.error("Forbidden: You don’t have permission.");
          break;
        case 404:
          console.error("Not Found: The requested resource doesn’t exist.");
          break;
        case 500:
          console.error("Server Error: Try again later.");
          break;
        default:
          console.error(`Error: ${response.statusText}`);
      }
    } else if (request) {
      console.error("No response received. Check your internet connection.");
    } else {
      console.error(`Request setup error: ${message}`);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;

