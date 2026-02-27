
import axios from "axios";

const API = axios.create({
  baseURL: "https://skycast-backend-1.onrender.com/api",
});

export const getWeather = async (city, lat, lon) => {
  if (city) {
    const res = await API.get(`/weather?city=${city}&units=metric`);
    return res.data;
  }

  if (lat && lon) {
    const res = await API.get(
      `/weather?lat=${lat}&lon=${lon}&units=metric`
    );
    return res.data;
  }
};