import React from "react";
import "./Sidebar.css";
import windSpeed from "../../utilities/windSpeed";

function Sidebar({ data }) {
  const current = data.list[0];
  return (
    <div className="main">
      <div className="weather">
        <h3>
          Weather in {data.city.name}, {data.city.country}
        </h3>
        <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
          {current.main.temp}&deg;C
        </p>
        <p>{current.weather[0].description}</p>
      </div>
      <table className="table">
        <tbody>
          <tr className="row">
            <td className="row__left">Wind</td>
            <td className="row__right">
              {`${windSpeed(current.wind.speed)}, ${current.wind.speed}m/s`}
            </td>
          </tr>
          <tr className="row">
            <td className="row__left">Cloudiness</td>
            <td className="row__right">{current.weather[0].description}</td>
          </tr>
          <tr className="row">
            <td className="row__left">Pressure</td>
            <td className="row__right">{`${current.main.pressure} hpa`}</td>
          </tr>
          <tr className="row">
            <td className="row__left">Humidity</td>
            <td className="row__right">{`${current.main.humidity} %`}</td>
          </tr>
          <tr className="row">
            <td className="row__left">Geo Coords</td>
            <td className="row__right">{`[${data.city.coord.lat}, ${
              data.city.coord.lon
            }]`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Sidebar;
