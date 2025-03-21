import AxiosInstance from "./axiosInstance";

const fetchWeather = async (lat, lon) => {
  try {
    const response = await AxiosInstance.get("data/2.5/forecast", {
      params: {
        units: "metric",
        lat: lat,
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
