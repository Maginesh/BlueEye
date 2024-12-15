import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

const LineGraph = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const processedData = {
      datasets: [
        {
          label: 'Water Level',
          data: data.slice(0,50).map(row => ({ 
            x: row.timestamp,
            y: row.water_level 
          })),
          fill: false,
          borderColor: 'blue',
          backgroundColor: data.map(row => row.notify ? 'red' : 'blue'),
          pointBackgroundColor: data.map(row => row.notify ? 'red' : 'blue'),
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: data.map(row => row.notify ? 'red' : 'blue'),
          pointRadius: 5,
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
      },
      title: {
        display: true,
        text: 'Water Level Over Time',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'DWLR ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water Level',
        },
        min: -12,
        max: 0,
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

  return chartData ? <Line data={chartData} options={options} /> : null;
};

export default LineGraph;
