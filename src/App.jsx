
import { useState, useEffect } from "react";
import { getWeather } from "./services/api";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState("");

  // 🌍 Fetch by city
  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    try {
      setError("");
      const data = await getWeather(cityName, null, null, unit);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  // 📍 Fetch by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setError("");
      const data = await getWeather(null, lat, lon, unit);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  // 🌍 Load weather from location on first load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => console.log("Location permission denied")
    );
  }, []);

  // 🔁 Refetch when unit changes
  useEffect(() => {
    if (weather?.city?.name) {
      fetchWeatherByCity(weather.city.name);
    }
  }, [unit]);

  return (
    <div className="app">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={() => fetchWeatherByCity(city)}>Search</button>
      {error && <p>{error}</p>}
      {weather && <div>{weather.city.name} - {weather.list[0].main.temp}°</div>}
    </div>
  );
}

export default App;
