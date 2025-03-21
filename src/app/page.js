"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  WbSunny as SunnyIcon,
  Cloud as CloudIcon,
  BeachAccess as RainIcon,
  AcUnit as SnowIcon,
  Air as WindIcon,
  LocationOn as LocationIcon,
  WaterDropOutlined as HumidityIcon,
  Thermostat as ThermometerIcon,
} from "@mui/icons-material";
import AxiosInstance from "../Service/axiosInstance";
import { debounce } from "lodash";
import { useLocation } from "../Context/LocationContext";
import fetchWeather from "../Service/weather";
import formatTimestamp from "../utils/getDate";

// Mock weather data
const mockWeatherData = {
  location: "Pune",
  temperature: 22,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  precipitation: 30,
  feelsLike: 25,
  forecast: [
    { day: "Mon", icon: <SunnyIcon />, temp: 25, condition: "Sunny" },
    { day: "Tue", icon: <CloudIcon />, temp: 23, condition: "Cloudy" },
    { day: "Wed", icon: <RainIcon />, temp: 20, condition: "Rainy" },
    { day: "Thu", icon: <SnowIcon />, temp: 18, condition: "Snowy" },
    { day: "Fri", icon: <WindIcon />, temp: 22, condition: "Windy" },
  ],
};

export default function WeatherHome() {
  const [searchLocation, setSearchLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const { coords } = useLocation();
  const [weatherFore, setWeatherFore] = useState();

  async function updateWeather(lat, long) {
    const newWeather = await fetchWeather(lat, long);
    setWeatherFore(newWeather);
  }
  useEffect(() => {
    updateWeather(coords.latitude, coords.longitude);
    getLocationWeather();
  }, [coords, searchLocation]);

  const getLocationWeather = async () => {
    try {
      const params = {};
      params.units = "metric";
      if (searchLocation.trim()) {
        params.q = searchLocation.trim();
      } else if (coords.latitude && coords.longitude) {
        params.lat = coords.latitude;
        params.lon = coords.longitude;
      } else {
        return;
      }
      const response = await AxiosInstance("data/2.5/weather", {
        params,
      });
      updateWeather(response?.data?.coord?.lat, response?.data?.coord?.lon);

      setWeather(response.data);
    } catch (err) {
      console.error("Error::>>", err);
    }
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      getLocationWeather();
    }, 800),
    [searchLocation]
  );

  // Call API when searchLocation changes
  useEffect(() => {
    if (searchLocation.trim() || (coords.latitude && coords.longitude)) {
      debouncedSearch();
    }
  }, [searchLocation, debouncedSearch]);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        pt: 4,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocationIcon />
            <Typography variant="h5" fontWeight="bold">
              {weather?.name || mockWeatherData.location}
            </Typography>
          </Stack>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1, color: "white" }}
              placeholder="Search location"
              inputProps={{ "aria-label": "search location" }}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "white" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Main Weather Content */}
        <Grid container spacing={3}>
          {/* Current Weather */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: 4,
                color: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {weather?.main?.temp || mockWeatherData.temperature}°C
                  </Typography>
                  <Typography variant="h6">
                    {weather?.weather[0]?.description ||
                      mockWeatherData.condition}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <SunnyIcon sx={{ fontSize: 80, color: "orange" }} />
                </Avatar>
              </Box>

              {/* Weather Details */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Stack alignItems="center" spacing={1}>
                    <HumidityIcon color="primary" />
                    <Typography>Humidity</Typography>
                    <Chip
                      label={`${
                        weather?.main?.humidity || mockWeatherData.humidity
                      }%`}
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack alignItems="center" spacing={1}>
                    <WindIcon color="secondary" />
                    <Typography>Wind Speed</Typography>
                    <Chip
                      label={`${
                        weather?.wind?.speed || mockWeatherData.windSpeed
                      } km/h`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack alignItems="center" spacing={1}>
                    <ThermometerIcon color="error" />
                    <Typography>Feels Like</Typography>
                    <Chip
                      label={`${
                        weather?.main?.feels_like || mockWeatherData.feelsLike
                      }°C`}
                      color="error"
                      variant="outlined"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* 5-Day Forecast */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: 4,
                color: "white",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                5-Day Forecast
              </Typography>

              <Stack spacing={2}>
                {weatherFore?.map((day, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.1)",
                      p: 1.5,
                      borderRadius: 2,
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Stack>
                      <Typography variant="h6">
                        {formatTimestamp(day.dt)?.day}
                      </Typography>
                      <Typography sx={{ lineHeight: 1 }} variant="body1">
                        {formatTimestamp(day.dt)?.date}
                      </Typography>{" "}
                      <Typography variant="caption">
                        {formatTimestamp(day.dt)?.time}
                      </Typography>
                    </Stack>
                    {/* {React.cloneElement(day.icon, {
                      sx: { color: "white", fontSize: 30 },
                    })} */}
                    <Typography>
                      {day?.weather?.at(0)?.description?.toUpperCase()}
                    </Typography>
                    <Chip
                      label={`${day.main.temp}°C`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
