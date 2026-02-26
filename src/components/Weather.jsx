import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSun, FiMoon } from "react-icons/fi";

import { fetchWeather } from "../features/weather/weatherSlice";

export default function Weather() {
  const dispatch = useDispatch();

  const {
    weather,
    status: weatherStatus,
    error: weatherError,
  } = useSelector((state) => state.weather);

  useEffect(() => {
    if (weatherStatus === "idle") {
      dispatch(fetchWeather());
    }
  }, [weatherStatus, dispatch]);

  const getClothingAdvice = (temp) => {
    const t = Number.parseFloat(temp);
    if (t <= 0) return "❄️ Cold! Wear a heavy jacket and gloves.";
    if (t <= 14) return "🧥 Chilly. Wear a coat.";
    if (t <= 20) return "🌤 Mild. Light jacket recommended.";
    return "☀️ Warm. Dress comfortably.";
  };

  const isNight = weather?.daytime === "Night";
  const isDay = weather?.daytime === "Day";

  return (
    <section className={`weather-section ${isNight ? "night" : "day"}`}>
      <h2 className="weather-title">
        Magic Insights
        {isDay ? (
          <FiSun className="day-icon" />
        ) : (
          <FiMoon className="night-icon" />
        )}
      </h2>

      {weatherStatus === "loading" && <p>Loading weather...</p>}

      {weatherStatus === "failed" && (
        <p className="weather-error">Error: {weatherError}</p>
      )}

      {weatherStatus === "succeeded" && weather && (
        <div className="weather-content">
          <p className="weather-condition">
            <strong>{weather.condition}</strong> ({weather.daytime})
          </p>

          <p>Temperature: {weather.temperature}</p>
          <p>
            Wind: {weather.wind.speed} {weather.wind.direction}
          </p>
          <p>Time: {weather.time}</p>

          <p
            className={`weather-advice ${
              isNight ? "advice-night" : "advice-day"
            }`}
          >
            {getClothingAdvice(weather.temperature)}
          </p>
        </div>
      )}
    </section>
  );
}
