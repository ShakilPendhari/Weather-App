"use client";

import { createContext, useState, useContext, useEffect } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPermissionAndRequestLocation = async () => {
    setLoading(true);
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      console.log("permission::>>", permission);

      if (permission.state === "granted") {
        // If permission is already granted, fetch location directly
        requestLocation();
      } else if (permission.state === "prompt") {
        // If permission is not decided, ask for permission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude });
            setError(null);
            setLoading(false);
          },
          (err) => {
            setError("Location access denied.");
            setLoading(false);
          }
        );
      } else {
        setError(
          "Location permission is blocked. Please enable it in browser settings."
        );
        setLoading(false);
      }
    } catch (err) {
      setError("Error checking location permission.");
      setLoading(false);
    }
  };

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setError(null);
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
    checkPermissionAndRequestLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ coords, error, loading, checkPermissionAndRequestLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// Custom hook to use location context
export function useLocation() {
  return useContext(LocationContext);
}
