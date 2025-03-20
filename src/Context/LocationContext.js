"use client";

import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const locationAccessAndGetWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setLoading(false);
        },
        (err) => {
          setError("Location access denied.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported.");
      setLoading(false);
    }
  };

  useEffect(() => {
    locationAccessAndGetWeather();
  }, []);

  return (
    <LocationContext.Provider
      value={{ coords, error, loading, locationAccessAndGetWeather }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// Custom hook to use location context
export function useLocation() {
  return useContext(LocationContext);
}
