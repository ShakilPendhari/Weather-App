"use client";

import { useState, useEffect } from "react";
import AxiosInstance from "./axiosInstance";

const useApi = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AxiosInstance.get(url, { params }); // ✅ Pass params correctly
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
