
import "./WeatherCard.css";

function WeatherCard({ weather, unit }) {
  const current = weather.list[0];

  return (
    <div className="weather-card">
      <h2>{weather.city.name}</h2>

      <div className="main-info">
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
          alt="icon"
        />

        <div>
          <h1>
            {Math.round(current.main.temp)}°
            {unit === "metric" ? "C" : "F"}
          </h1>
          <p>{current.weather[0].description}</p>
        </div>
      </div>

      <div className="details">
        <div>Humidity: {current.main.humidity}%</div>
        <div>
          Wind: {current.wind.speed}
          {unit === "metric" ? "m/s" : "mph"}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;