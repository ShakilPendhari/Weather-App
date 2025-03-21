"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered successfully");
        })
        .catch((error) => {
          console.log("Service Worker registration failed: ", error);
        });
    }
  }, []);

  return null;
}
