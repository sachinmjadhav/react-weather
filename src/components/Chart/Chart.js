import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import getTime from "../../utilities/getDate";

function Chart({ data }) {
  const [items, setItems] = useState(data.list);

  // Temperature
  let temps = items.map(item => item.main.temp);
  temps = temps.slice(0, 10);
  console.log(Math.max(...temps));

  // Time
  let date = items.map(item => item.dt).slice(0, 10);
  let times = date.map(time => getTime(time));

  useEffect(() => {
    setItems(data.list);
  }, [data]);

  // Chart config
  const chart = {
    labels: times,
    datasets: [
      {
        label: `Weather in ${data.city.name}, ${data.city.country}`,
        data: temps,
        backgroundColor: "transparent",
        borderColor: "#4bc0c0"
      }
    ]
  };

  return (
    data && (
      <div style={{ marginTop: "2rem" }}>
        <Line
          options={{
            responsive: true,
            scales: {
              gridLines: {
                display: false
              }
            },
            maintainAspectRatio: true,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: `Weather and forecasts in ${data.city.name}, ${
                data.city.country
              }`,
              fontSize: 18,
              position: "top"
            }
          }}
          data={chart}
        />
      </div>
    )
  );
}

export default Chart;