// custom hook to fetch weather data
import { useState, useEffect } from "react";
import useGeolocation from "../utilities/useGeolocation";

export function useGeoWeather() {
  let location = useGeolocation();
  const [data, setData] = useState(null);
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
  return data;
}

export function useQueryWeather(query) {
  const [data, setData] = useState(null);
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
  return data;
}
