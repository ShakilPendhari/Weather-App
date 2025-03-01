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
    // You can modify the request config here
    // For example, add auth token from localStorage or cookies
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

     // Get the API key from environment variables
     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
     if (apiKey) {
       // Check if the URL already contains query parameters
       const hasParams = config.url.includes('?');
       
       // Add the API key to the URL
       config.url = `${config.url}${hasParams ? '&' : '?'}appid=${apiKey}`;
     }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    const { response } = error;

    if (response) {
      // Server responded with a status code outside the 2xx range
      switch (response.status) {
        case 401:
          // Handle unauthorized access
          // For example, redirect to login
          if (typeof window !== "undefined") {
            // Only redirect on client side
            // window.location.href = '/login';
          }
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
