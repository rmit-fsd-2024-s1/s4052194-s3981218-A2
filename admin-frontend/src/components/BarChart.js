import React from "react";
import { Bar } from "react-chartjs-2";
const BarChart = ({ label, data }) => {
  return (
    <Bar
      data={{
        labels: label.slice(0, 10),
        datasets: [
          {
            label:
              "Average Rating (sum of the product ratings / number of reviews)",
            data: data.slice(0, 10),
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(144, 238, 144, 0.2)",
              "rgba(255, 105, 180, 0.2)",
            ],
            borderRadius: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              font: {
                size: 15,
                family: "Arial, sans-serif",
                color: "black",
                weight: "bold",
              },
            },
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: "Arial, sans-serif",
              weight: "bold",
            },
            bodyFont: {
              size: 18,
              family: "Arial, sans-serif",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 20,
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 20,
              },
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
