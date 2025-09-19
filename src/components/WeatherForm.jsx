import { useState } from "react";
import "../../src/index.css";

export default function WeatherForm({ onSearch }) {
    const [searchType, setSearchType] = useState("city");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchType === "city") {
            onSearch({ type: "city", value: city });
        } else if (searchType === "zip") {
            onSearch({ type: "zip", value: zip });
        } else if (searchType === "coords") {
            onSearch({ type: "coords", lat, lon });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="weather-form">
                <div className="form-group">
                    <label htmlFor="searchType">Search By:</label>
                    <select
                        className="input-select"
                        id="searchType"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="city">City Name</option>
                        <option value="zip">Zip Code</option>
                        <option value="coords">Latitude & Longitude</option>
                    </select>
                </div>

                {searchType === "city" && (
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                )}

                {searchType === "zip" && (
                    <input
                        className="input"
                        type="text"
                        placeholder="Enter zip code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                )}

                {searchType === "coords" && (
                    <>
                        <input
                            className="input"
                            type="number"
                            placeholder="Latitude"
                            step="any"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            type="number"
                            placeholder="Longitude"
                            step="any"
                            value={lon}
                            onChange={(e) => setLon(e.target.value)}
                            required
                        />
                    </>
                )}

                <button className="btn" type="submit">Get Weather</button>
            </div>
        </form>
    );
}
