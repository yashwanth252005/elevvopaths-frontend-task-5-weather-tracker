import { useState } from "react";

export default function WeatherCard({ weather, onDelete, onForecast }) {
    const [showForecast, setShowForecast] = useState(false);

    const handleForecast = async () => {
        if (!showForecast) {
            const forecastData = await onForecast(weather.name);
            setShowForecast(forecastData);
        } else {
            setShowForecast(false);
        }
    };

    // Convert wind direction to text (N, NE, etc.)
    function getWindDirection(deg) {
        const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        return dirs[Math.round(deg / 45) % 8];
    }

    // Convert unix timestamp to readable time
    function formatTime(unix) {
        return new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <div className="weather-card">
            <div>
                <div className="card">
                    {/* Header */}
                    <div className="header">
                        <h2 className="card-title">{weather.name}, {weather.sys?.country}</h2>
                        <p className="close-msg">Delete Location</p>
                        <button className="close-btn btn-scale" onClick={() => onDelete(weather.id || weather.name)} title="Delete Location">
                            <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000" }}></i>
                        </button>
                    </div>
                    <hr></hr>

                    {/* Date */}
                    <p className="date">{new Date().toLocaleDateString()}</p>

                    {/* Weather info */}
                    <div className="weather-info">
                        <img
                            className="weather-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <div>
                            <p className="temp" >{Math.round(weather.main.temp)}°C</p>
                            <p>{weather.weather[0].description}</p>
                            <p>
                                <i className="fa-solid fa-wind fa-xs" style={{ color: "#2980b9" }}></i>
                                &nbsp;wind: {Math.round(weather.wind.speed * 3.6)} km/h {getWindDirection(weather.wind.deg)}</p>
                        </div>
                    </div>

                    {/* Extra info */}
                    <div className="details" >
                        <p>
                            <span className="left">
                                <i className="fa-solid fa-temperature-low fa-xs" style={{ color: "#2980b9" }}></i>&nbsp;
                                Max: {Math.round(weather.main.temp_max)}°C
                            </span>
                            <span className="right">
                                <i className="fa-solid fa-temperature-low fa-xs" style={{ color: "#2980b9" }}></i>&nbsp;
                                Min: {Math.round(weather.main.temp_min)}°C
                            </span>
                        </p>
                        <p>
                            <span className="left">
                                💧 Humidity: {weather.main.humidity}%
                            </span>
                            <span className="right">
                                🌡 Pressure: {weather.main.pressure} hPa
                            </span>
                        </p>
                        <p>
                            <span className="left">
                                "☁️ Clouds: {weather.clouds.all}%
                            </span>
                            <span className="right">
                                👁️ Visibility: {weather.visibility / 1000} km
                            </span>
                        </p>
                        <a
                            href={`https://www.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="btn-outline map-btn">
                                <i className="fa-solid fa-location-dot fa-2xs" style={{ color: "#ff0000ff" }}></i> &nbsp;
                                View on Map</button>

                        </a>
                    </div>

                    {/* Forecast toggle */}
                    <button className="btn forecast-btn" onClick={handleForecast}>
                        {showForecast ? "Hide Forecast" : "Show 3-Day Forecast"}
                    </button>

                    {/* Forecast Data */}
                    {showForecast && (
                        <div className="forecast-box" >
                            {showForecast.map((f, index) => (
                                <>
                                    <div key={index} className="forecast-item">
                                        <div><p>{f.day}</p>
                                            <img className="forecast-icon" src={`https://openweathermap.org/img/wn/${f.icon}.png`} alt={f.desc} />
                                        </div>
                                        <div>
                                            <p>{f.min} / {f.max} °C</p>
                                            <p>{f.desc}</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

