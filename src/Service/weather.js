import AxiosInstance from "./axiosInstance";

const fetchWeather = async (lan, lon) => {
  console.log("lan::>>", lan, "long::>>", lon);
  try {
    const response = await AxiosInstance.get("data/2.5/forecast", {
      params: {
        q: "Pune",
        units: "metric",
        lan: lan,
        lon: lon,
      },
    });
    return response.data.list;
    // return response.data.list.slice(0, 3);
  } catch (error) {
    console.log("Error::>>", error);
    return [];
  }
};

export default fetchWeather;
