import React, { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";
import Searchbar from "./Searchbar/Searchbar";
import Sidebar from "./Sidebar/Sidebar";
import Chart from "./Chart/Chart";
import Grid from "@material-ui/core/Grid";

function API() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);

  // Effect for query search
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
    )
      .then(res => res.json())
      .then(result => {
        setData(result);
        console.log(data);
      });
  }, [query]);

  // Effect for geolocation
  let location = useGeolocation();
  useEffect(() => {
    if (location) {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${
          location.latitude
        }&lon=${
          location.longitude
        }&appid=de6d52c2ebb7b1398526329875a49c57&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    }
  }, [location]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input === "") return;
    setQuery(input);
    setInput("");
  };

  return (
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
      </div>
    </div>
  );
}

export default API;
