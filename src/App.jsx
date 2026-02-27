
// src/App.js
import { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getWeather } from "./services/api";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem("recentSearches")) || []);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  // 🌍 Fetch weather by city
  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;

    try {
      setError("");
      const data = await getWeather(cityName);
      setWeather(data);

      // Save recent searches
      if (!recent.includes(cityName)) {
        const updated = [cityName, ...recent.slice(0, 4)];
        setRecent(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching weather.");
    }
  };

  // 📍 Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setError("");
      const data = await getWeather(null, lat, lon);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching weather.");
    }
  };

  // 🌎 Load weather on first load by geolocation
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

  // 🎨 Background logic
  const getBackgroundClass = () => {
    if (!weather?.list?.length) return "default-bg";
    const main = weather.list[0]?.weather?.[0]?.main?.toLowerCase() || "";
    if (main.includes("rain")) return "rain-bg";
    if (main.includes("cloud")) return "cloud-bg";
    if (main.includes("clear")) return "sunny-bg";
    return "default-bg";
  };

  // 📊 Chart data
  const chartData =
    weather?.list?.slice(0, 5).map((item) => ({
      time: item.dt_txt?.slice(11, 16),
      temp: item.main?.temp,
    })) || [];

  return (
    <div className={`app ${getBackgroundClass()} ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <h1>Skycast</h1>

        {/* 🌙 Dark Mode Toggle */}
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* 🌡 Unit Toggle */}
        <div className="unit-toggle">
          <button className={unit === "metric" ? "active" : ""} onClick={() => setUnit("metric")}>°C</button>
          <button className={unit === "imperial" ? "active" : ""} onClick={() => setUnit("imperial")}>°F</button>
        </div>

        {/* 🔍 Search Box */}
        <div className="search-box">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
          />
          <button onClick={() => fetchWeatherByCity(city)}>Search</button>
        </div>

        {/* 💾 Recent Searches */}
        <div className="recent">
          {recent.map((item, index) => (
            <span key={index} onClick={() => fetchWeatherByCity(item)}>{item}</span>
          ))}
        </div>

        {/* ❌ Error Message */}
        {error && <p className="error">{error}</p>}

        {/* 🌤 Weather Display */}
        {weather?.list?.length > 0 && (
          <>
            <div className="weather-card">
              <h2>{weather.city?.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.list[0]?.weather?.[0]?.icon}@2x.png`}
                alt="icon"
              />
              <h3>{Math.round(weather.list[0]?.main?.temp)}°{unit === "metric" ? "C" : "F"}</h3>
              <p>{weather.list[0]?.weather?.[0]?.description}</p>
              <div className="extra-info">
                <div>💧 {weather.list[0]?.main?.humidity}%</div>
                <div>🌬 {weather.list[0]?.wind?.speed} {unit === "metric" ? "m/s" : "mph"}</div>
              </div>
            </div>

            {/* 📊 Temperature Chart */}
            <div className="chart-card">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <XAxis dataKey="time" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#ffffff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 📅 Forecast */}
            <Forecast data={weather} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;