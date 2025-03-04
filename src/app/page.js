"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import useApi from "./useApp";

const Page = () => {
  const { data, loading, error } = useApi(
    `data/2.5/weather?lat=44.34&lon=10.99`
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Hureeyyyy Service Worker registered: ", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed: ", error);
        });
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >{`Hello ${data}`}</Box>
  );
};

export default Page;
