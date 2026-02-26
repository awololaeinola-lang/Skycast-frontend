import "./Forecast.css";

function Forecast({ data }) {
  // OpenWeather forecast gives data every 3 hours.
  // We filter one item per day (every 8th item ≈ 24 hours)
  const dailyData = data.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="forecast-container">
      {dailyData.slice(0, 5).map((day, index) => (
        <div key={index} className="forecast-card">
          <p className="forecast-day">
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p className="forecast-temp">
            {Math.round(day.main.temp)}°C
          </p>

          <p className="forecast-desc">
            {day.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;