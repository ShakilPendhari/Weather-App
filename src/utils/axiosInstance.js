import axios from "axios";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    let url = config.url;
    config.url = `${url}&${process.env.API_KEY}`;
    console.log("config::>>", config, process.env);
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
  (response) => {
    // Can be modified response
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);
