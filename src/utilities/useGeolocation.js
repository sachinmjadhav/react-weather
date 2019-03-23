import { useState, useEffect } from "react";

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000
};

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      // get location
      navigator.geolocation.getCurrentPosition(
        pos => {
          // check to avoid refetching geolocation in firefox
          if (location && location.accuracy === pos.coords.accuracy) return;
          setLocation(pos.coords);
        },
        err => console.log(err),
        options
      );
    }
    console.log(location);
  }, [location]);
  return location;
};

export default useGeolocation;
