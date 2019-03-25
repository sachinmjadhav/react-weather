import React, { useState, useEffect } from "react";
import { useGeoWeather, useQueryWeather } from "../../utilities/useWeather";
import useForecastWeather from "../../utilities/useForecastData";
import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import Forecast from "../Forecast/Forecast";
import Chart from "../Chart/Chart";
import Grid from "@material-ui/core/Grid";
import Loader from "../../assets/loader.gif";
import "./Main.css";

function Main() {
  // input - variabel to store input field data => String
  const [input, setInput] = useState("");
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

  // function to control input field
  const handleChange = e => {
    setInput(e.target.value);
  };

  // function to handle submit request
  const handleSubmit = e => {
    e.preventDefault();
    // if input field is empty - return
    if (input === "") return;

    setQuery(input);

    // set Input field to empty string after submit
    setInput("");
  };

  return !data ? (
    <div className="loader">
      <img src={Loader} alt="" />
    </div>
  ) : (
    <div>
      <Searchbar
        value={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
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
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={8}>
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
