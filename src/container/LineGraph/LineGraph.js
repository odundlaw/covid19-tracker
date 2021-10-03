import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const option = {
  //Customize chart options
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, graphData) {
        return numeral(tooltipItem.value).format("+0, 0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({caseType}) {
  const [graphData, setGraphData] = useState({});

  const buildChartData = (data, caseType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[caseType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      await fetch("http://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const chartData = buildChartData(data, caseType);
          setGraphData(chartData);
        });
    };
    fetchGraphData();
  }, [caseType]);

  console.log(graphData);
  return (
    <div className="lineGraph">
      {graphData?.length > 0 && (
        <Line
          options={option}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: graphData,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
