export default function manifest() {
  return {
    name: "Weather App",
    short_name: "Weather App",
    description: "Weather nextjs app",
    start_url: "/",
    display: "fullscreen",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/weather_192.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/weather_512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
