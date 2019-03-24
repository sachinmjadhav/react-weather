import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./Forecast.css";

function Forecast({ forecast }) {
  const [data, setData] = useState();
  useEffect(() => {
    setData(forecast);
  }, [forecast]);
  console.log("forecast", forecast.list[0]);

  return data ? (
    <div>
      <h2 className="forecast__title">7 day weather foreacast</h2>
      <table className="forecast__table">
        <tbody>
          {data.list.map(day => (
            <tr key={day.dt} className="forecast__row">
              <td className="forecast__table-left">
                <Moment unix format="ddd, DD MMM">
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
                    {day.temp.max} &deg;C
                  </span>
                  <span className="forecast__temp forecast__temp-min">
                    {day.temp.min} &deg;C
                  </span>
                  <span className="forecast__temp-desc">
                    {day.weather[0].description}
                  </span>
                </div>
                <div>
                  <span className="forecast__humidity">
                    Humidity: {day.humidity}%
                  </span>{" "}
                  |
                  <span className="forecast__wind">Wind: {day.speed} m/s,</span>
                </div>
                <div>
                  <span className="forecast__clouds">
                    Clouds: {day.clouds}%,{" "}
                  </span>{" "}
                  |
                  <span className="forecast__pressure">
                    {day.pressure} hpa{" "}
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
