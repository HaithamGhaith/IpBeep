import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ attended, absent }) {
  const data = {
    labels: ["Attended", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [attended, absent],
        backgroundColor: ["#008000", "#FF0000"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
