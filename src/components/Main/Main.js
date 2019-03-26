import React, { useState, useEffect, useRef } from "react";
import { useGeoWeather, useQueryWeather } from "../../utilities/useWeather";
import useForecastWeather from "../../utilities/useForecastData";
import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import Forecast from "../Forecast/Forecast";
import Chart from "../Chart/Chart";
import Grid from "@material-ui/core/Grid";
import "./Main.css";

function Main() {
  // useRef to ref the input tag in search component
  const inputRef = useRef("");
  // data - variable to store fetch data => Object
  const [data, setData] = useState(null);

  // Effect for geolocation search
  // let location = useGeolocation();
  let geoWeatherData = useGeoWeather();
  useEffect(() => {
    if (geoWeatherData) {
      setData(geoWeatherData);
    }
  }, [geoWeatherData]);

  // Effect for query search
  const [query, setQuery] = useState();
  let queryWeatherData = useQueryWeather(query);
  useEffect(() => {
    if (queryWeatherData) {
      setData(queryWeatherData);
    }
  }, [queryWeatherData]);

  // Effect for Forecast
  const [forecast, setForecast] = useState();
  let forecastData = useForecastWeather(query);
  useEffect(() => {
    if (forecastData) {
      setForecast(forecastData);
    }
  }, [forecastData]);

  // function to handle submit request
  const handleSubmit = e => {
    e.preventDefault();
    // if input field is empty - return
    if (inputRef.current.value === "") return;

    setQuery(inputRef.current.value);

    // set Input field to empty string after submit
    inputRef.current.value = "";
  };

  return !data ? (
    <div className="loader">
      <img src={require("../../assets/loader.gif")} alt="" />
    </div>
  ) : (
    <div>
      <Searchbar inputRef={inputRef} handleSubmit={handleSubmit} />
      <h2 className="title">Current weather and forecast</h2>
      <div className="container">
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            {data && data.cod === "200" ? <Sidebar data={data} /> : ""}
          </Grid>
          <Grid item xs={12} md={8}>
            {data && data.cod === "200" ? (
              <Chart data={data} />
            ) : (
              data && <h3>{data.message.toUpperCase()}</h3>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            {forecast && forecast.cod === "200" ? (
              <p className="disclaimer">
                The weather forecast is displayed in accordance with your local
                time. Please pay attention to it when you will watch the weather
                in another time zone.
              </p>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={8} className="forecast__main">
            {forecast && forecast.cod === "200" ? (
              <Forecast forecast={forecast} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Main;
