import React, { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";
import Searchbar from "./Searchbar/Searchbar";
import Sidebar from "./Sidebar/Sidebar";
import Forecast from "./Forecast/Forecast";
import Chart from "./Chart/Chart";
import Grid from "@material-ui/core/Grid";
import Loader from "../assets/loader.gif";

function API() {
  // input - variabel to store input field data => String
  const [input, setInput] = useState("");
  // data - variable to store fetch data => Object
  const [data, setData] = useState(null);

  // Effect for geolocation search
  // when the user accepts location access request, this effect is run
  let location = useGeolocation();
  useEffect(() => {
    if (location) {
      // get data from localStorage if already stored
      if (localStorage.getItem("app:react-weather")) {
        console.log("YAY!!!");
        let data = JSON.parse(localStorage.getItem("app:react-weather"));
        console.log("localstorage", data);
        setData(data);
        return;
      } else {
        console.log("NAH!!!");
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            location.latitude
          }&lon=${
            location.longitude
          }&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
        )
          .then(res => res.json())
          .then(data => {
            // store data in localStorage
            localStorage.setItem("app:react-weather", JSON.stringify(data));
            setData(data);
          });
      }
    }
  }, [location]);

  // Effect for query search
  const [query, setQuery] = useState();
  useEffect(() => {
    if (query) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
      )
        .then(res => res.json())
        .then(result => {
          setData(result);
        });
    }
  }, [query]);

  // Effect for Forecast
  const [forecast, setForecast] = useState();
  useEffect(() => {
    if (query) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${query}&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
      )
        .then(res => res.json())
        .then(result => {
          setForecast(result);
        });
    } else if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${
          location.latitude
        }&lon=${
          location.longitude
        }&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          setForecast(data);
        });
    }
  }, [location, query]);

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
            {data && data.cod === "404" ? (
              <h3>{data.message.toUpperCase()}</h3>
            ) : (
              data && <Chart data={data} />
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

export default API;
