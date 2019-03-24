// custom hook to fetch forecast data
import { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";

export default function useForecastWeather(query) {
  let location = useGeolocation();
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
  return forecast;
}
