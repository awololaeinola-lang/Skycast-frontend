
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getWeather = async (city) => {
  return API.get(`/weather?city=${city}`);
};