import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Scrollbars } from "react-custom-scrollbars";
import "./Forecast.css";

function Forecast({ forecast }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (forecast) {
      setData(forecast);
    }
  }, [forecast]);
  console.log("forecast", forecast);

  return data ? (
    <>
      <h2 className="forecast__title">7 day weather foreacast</h2>
      <Scrollbars
        style={{ height: 500, border: "1px solid #ddd", borderRadius: "5px" }}
      >
        <div>
          <table className="forecast__table">
            <tbody>
              {data.list.map(day => (
                <tr key={day.dt} className="forecast__row">
                  <td className="forecast__table-left">
                    <div className="forecast__table-left_date">
                      <Moment unix format="ddd, DD MMM">
                        {day.dt}
                      </Moment>
                    </div>
                    <div className="forecast__table-left_time">
                      <Moment unix format="LT">
                        {day.dt}
                      </Moment>
                      <img
                        src={`https://openweathermap.org/img/w/${
                          day.weather[0].icon
                        }.png`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="forecast__table-right">
                    <div>
                      <span className="forecast__temp forecast__temp-max">
                        {day.main.temp_max} &deg;C
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
      </Scrollbars>
    </>
  ) : (
    ""
  );
}

export default React.memo(Forecast);
