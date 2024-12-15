import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const limitedData = data;
    const processedData = {
      labels: limitedData.slice(0, 50).map(row => row.timestamp),
      datasets: [
        {
          label: 'Water Level Deviation',
          data: limitedData.map(row => Math.abs(row.water_level) - 8.402),
          backgroundColor: limitedData.map(row => row.notify ? 'red' : '#56a3a6'),
          borderColor: 'rgba(0, 102, 204, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(processedData);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Water Level Deviation Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'DWLR ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water Level Deviation',
        },
        min: -1,
        max: 1, 
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 200,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };
  return chartData ? <Bar data={chartData} options={options} /> : null;
};

export default BarGraph;
