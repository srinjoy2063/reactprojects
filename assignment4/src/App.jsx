import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to get weather data
  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      // First API: Find city coordinates
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Unable to find the city.");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found. Please enter a valid city.");
      }

      const location = locationData.results[0];

      // Second API: Get weather using latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,sunrise,sunset&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weather data.");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
        sunrise: weatherData.daily.sunrise[0],
        sunset: weatherData.daily.sunset[0],
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs when the application starts
  useEffect(() => {
    fetchWeather("Kolkata");
  }, []);

  // Search weather
  const handleSearch = (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    fetchWeather(city);
  };

  // Convert Open-Meteo weather code into text
  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear Sky";
    if (code === 1 || code === 2) return "Partly Cloudy";
    if (code === 3) return "Cloudy";
    if (code === 45 || code === 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown";
  };

  // Weather icon
  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";

    return "🌤️";
  };

  // Convert API time into readable time
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="app">
      <div className="weather-container">

        <h1>🌤️ Weather Dashboard</h1>

        <p className="subtitle">
          Weather information powered by Open-Meteo
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        {/* Weather Information */}
        {weather && !loading && !error && (
          <div className="weather-card">

            <div className="location">
              <h2>
                {weather.city}, {weather.country}
              </h2>

              <div className="weather-icon">
                {getWeatherIcon(weather.weatherCode)}
              </div>

              <h3>{getWeatherDescription(weather.weatherCode)}</h3>

              <div className="temperature">
                {Math.round(weather.temperature)}°C
              </div>
            </div>

            {/* Weather Details */}
            <div className="details">

              <div className="detail">
                <span>💧</span>
                <p>Humidity</p>
                <strong>{weather.humidity}%</strong>
              </div>

              <div className="detail">
                <span>💨</span>
                <p>Wind Speed</p>
                <strong>{weather.windSpeed} km/h</strong>
              </div>

              <div className="detail">
                <span>🌅</span>
                <p>Sunrise</p>
                <strong>{formatTime(weather.sunrise)}</strong>
              </div>

              <div className="detail">
                <span>🌇</span>
                <p>Sunset</p>
                <strong>{formatTime(weather.sunset)}</strong>
              </div>

            </div>
          </div>
        )}

        <footer>
          Data provided by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo
          </a>
        </footer>

      </div>
    </div>
  );
}

export default App;