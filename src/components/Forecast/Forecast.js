import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./Forecast.css";

// function getHour(time) {
//   const currTime = new Date(time * 1000);
//   return currTime.getDay();
// }

function Forecast({ forecast }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (forecast) {
      setData(forecast);
    }
  }, [forecast]);
  console.log("forecast", forecast.list[0]);

  // const [day, setDay] = useState(0);
  // function showDate(time) {
  //   if (getHour(time) !== day) {
  //     if (getHour(time) < 5) {
  //       setDay(day => day + 1);
  //     }
  //     console.log(day);
  //     console.log(getHour(time));
  //   }
  // }

  return data ? (
    <div>
      <h2 className="forecast__title">7 day weather foreacast</h2>
      <table className="forecast__table">
        <tbody>
          {data.list.map(day => (
            <tr key={day.dt} className="forecast__row">
              {/* {showDate(day.dt)} */}
              <td className="forecast__table-left">
                <Moment unix format="hh:mm, ddd, DD MMM">
                  {day.dt}
                </Moment>
                <img
                  src={`http://openweathermap.org/img/w/${
                    day.weather[0].icon
                  }.png`}
                  alt=""
                />
              </td>
              <td className="forecast__table-right">
                <div>
                  <span className="forecast__temp forecast__temp-max">
                    {day.main.temp_max} &deg;C
                  </span>
                  <span className="forecast__temp forecast__temp-min">
                    {day.main.temp_min} &deg;C
                  </span>
                  <span className="forecast__temp-desc">
                    {day.weather[0].description}
                  </span>
                </div>
                <div>
                  <span className="forecast__humidity">
                    Humidity: {day.main.humidity}%
                  </span>{" "}
                  |
                  <span className="forecast__wind">
                    Wind: {day.wind.speed} m/s,
                  </span>
                </div>
                <div>
                  <span className="forecast__clouds">
                    Clouds: {day.clouds.all}%,{" "}
                  </span>{" "}
                  |
                  <span className="forecast__pressure">
                    {day.main.pressure} hpa{" "}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
}

export default React.memo(Forecast);
