import React, { useState } from "react";
import Cards from "./Cards";
import "./index.css";

const Weather = () => {
  const [search, setSearch] = useState("mumbai");
  const [weatherInfo, setWeatherInfo] = useState({});

  const getData = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2d779df20602d276a2f7bfcf68a58b77`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { country, sunset } = data.sys;
      const { speed } = data.wind;

      const myNewData = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        country,
        sunset,
        speed,
      };

      setWeatherInfo(myNewData);
    } catch (error) {
      console.log(error);
    }
  };

  const enter = (e) => {
    if (e.keyCode === 13) {
      getData();
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search...."
            autoFocus
            id="search"
            className="searchTerm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={enter}
          />
          <button className="searchButton" type="button" onClick={getData}>
            Search
          </button>
        </div>
      </div>

      <Cards weatherInfo={weatherInfo} />
    </>
  );
};

export default Weather;
