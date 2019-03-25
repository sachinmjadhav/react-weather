// custom hook to fetch weather data
import { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";

export function useGeoWeather() {
  let location = useGeolocation();
  const [data, setData] = useState(null);

  // effect to clear localstorage after every 2hrs
  useEffect(() => {
    let hours = 2;
    let now = new Date().getTime();
    let setupTime = localStorage.getItem("setupTime");
    if (setupTime === null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        console.log("clearing console");
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
  }, []);

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
          }&appid=c7cec94be5f48433614a71099719a8e4&units=metric`
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
  return data;
}

export function useQueryWeather(query) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (query) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=c7cec94be5f48433614a71099719a8e4&units=metric`
      )
        .then(res => res.json())
        .then(result => {
          setData(result);
        });
    }
  }, [query]);
  return data;
}
