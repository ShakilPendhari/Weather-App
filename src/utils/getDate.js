"use client";

export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Tue"
    date: date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    }), // "8/30/22"
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }), // "06:00 AM"
  };
}
