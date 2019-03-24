import { useState, useEffect } from "react";

let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000
};

const useGeolocation = () => {
  // location - variable used to store location data from geolocation API => Object
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      // get location
      navigator.geolocation.getCurrentPosition(
        // success function
        pos => {
          // check to avoid refetching geolocation in firefox
          if (location && location.accuracy === pos.coords.accuracy) return;
          setLocation(pos.coords);
        },

        // error function
        err => console.log(err),

        // optional options object
        options
      );
    }
  }, [location]);
  return location;
};

export default useGeolocation;
