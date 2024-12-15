import React, { useState } from "react";
import axios from "axios";
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "c6d81332bd939c524a033c6270a170b0";

  const searchLocation = async (event) => {
    if (event.key === "Enter" && location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          // Handle API errors
          const { status } = error.response;
          if (status === 404) {
            alert(`Location "${location}" not found. Please try again.`);
          } else if (status === 401) {
            alert("Invalid API key. Please check your API configuration.");
          } else if (status === 429) {
            alert("Too many requests. Please wait and try again later.");
          } else {
            alert("Unable to fetch weather data. Please try again.");
          }
        } else {
          console.error("Error:", error.message);
        }
      }
      setLocation(""); 
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p id="city-name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()} °C</h1>}
          </div>
          {data.name && (
            <div className="bottom">
              <div className="feels">
                {data.main && <p className="bold">{data.main.feels_like.toFixed()}°C</p>}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main && <p className="bold">{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind && <p className="bold">{data.wind.speed.toFixed()} MPH</p>}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
