"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    }
  }, []);

  return null;
}
