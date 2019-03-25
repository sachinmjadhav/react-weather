// custom hook to fetch forecast data
import { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";

export default function useForecastWeather(query) {
  let location = useGeolocation();
  const [forecast, setForecast] = useState();
  useEffect(() => {
    if (query) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=c7cec94be5f48433614a71099719a8e4&units=metric`
      )
        .then(res => res.json())
        .then(result => {
          setForecast(result);
        });
    } else if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          location.latitude
        }&lon=${
          location.longitude
        }&appid=c7cec94be5f48433614a71099719a8e4&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          console.log("loca", data);
          setForecast(data);
        });
    }
  }, [location, query]);
  return forecast;
}
