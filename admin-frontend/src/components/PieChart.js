import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ label, data }) => {
  return (
    <Pie
      data={{
        labels: label,
        datasets: [
          {
            label: "count",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(144, 238, 144, 0.6)",
              "rgba(255, 105, 180, 0.6)",
              "rgba(210, 105, 30, 0.6)",
              "rgba(128, 0, 128, 0.6)",
              "rgba(0, 128, 128, 0.6)",
              "rgba(128, 128, 0, 0.6)",
              "rgba(230, 230, 250, 0.6)",
              "rgba(240, 255, 240, 0.6)",
              "rgba(245, 222, 179, 0.6)",
              "rgba(255, 228, 225, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(144, 238, 144, 1)",
              "rgba(255, 105, 180, 1)",
              "rgba(210, 105, 30, 1)",
              "rgba(128, 0, 128, 1)",
              "rgba(0, 128, 128, 1)",
              "rgba(128, 128, 0, 1)",
              "rgba(230, 230, 250, 1)",
              "rgba(240, 255, 240, 1)",
              "rgba(245, 222, 179, 1)",
              "rgba(255, 228, 225, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              font: {
                size: 17,
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
                size: 16,
              },
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
