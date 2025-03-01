"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import useApi from "./useApp";

const Page = () => {
  const { data, loading, error } = useApi(
    `data/2.5/weather?lat=44.34&lon=10.99`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <Box>{data}</Box>;
};

export default Page;
