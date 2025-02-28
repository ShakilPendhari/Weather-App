"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import useApi from "./useApp";

const Page = () => {
  const { data, loading, error } = useApi('data/2.5/weather?lat=44.34&lon=10.99');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // return (
  //   <div>
  //     <h1>Data from API:</h1>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );
  const getLatAndLong = async () => {

    
    // let data = await fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=8619f9b5d0010c2f1b1eefdfd2e53a78`
    // );
    // let data = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8619f9b5d0010c2f1b1eefdfd2e53a78`
    // );
    // data = await data.json();
    // console.log("data::>>", data);

    
  };
  // useEffect(() => {
  //   // getLatAndLong();
  // }, []);

  return <Box>{data}</Box>;
};

export default Page;
