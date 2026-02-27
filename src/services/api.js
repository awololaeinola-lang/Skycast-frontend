
// src/services/api.js
import axios from "axios";

// Base URL points directly to the /weather route on your backend
const API = axios.create({
  baseURL: "https://skycast-backend-1.onrender.com/api",
});

export const getWeather = async (city, lat, lon, unit = "metric") => {
  if (city) {
    const res = await API.get(`/weather?city=${city}&units=${unit}`);
    return res.data;
  }

  if (lat && lon) {
    const res = await API.get(`/weather?lat=${lat}&lon=${lon}&units=${unit}`);
    return res.data;
  }

  throw new Error("Provide either city or coordinates");
};