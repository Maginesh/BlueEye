import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ScatterLevel = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const processedData = {
      datasets: [
        {
          label: 'Water Level',
          data: data.map(row => ({
            x: row.timestamp, 
            y: -row.water_level, 
          })),
          backgroundColor: data.map(row => (row.notify ? 'red' : 'rgba(54, 162, 235, 0.7)')),
          borderColor: data.map(row => (row.notify ? 'red' : 'rgba(54, 162, 235, 0.7)')),
          borderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8,
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
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Water Level Scatter Plot',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'DWLR ID / Timestamp',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water Level',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        min: -1,
        max: 20,
        ticks: {
          stepSize: 0.1,
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  return chartData ? <Scatter data={chartData} options={options} /> : null;
};

export default ScatterLevel;