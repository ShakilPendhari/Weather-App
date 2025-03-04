"use client";

import AxiosInstance from "../utils/axiosInstance";
// useApi.js
import { useState, useEffect } from "react";
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(url, options);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //   }, [url, options]);
  return { data, loading, error };
};
export default useApi;
