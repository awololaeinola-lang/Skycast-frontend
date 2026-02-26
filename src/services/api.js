
import axios from "axios";

const API = axios.create({
  baseURL: "https://skycast-backend-1.onrender.com/api",
});

export const getWeather = async (city) => {
  return API.get(`/weather?city=${city}`);
}; 
// Redeploy trigger