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

const TempGraph = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const processedData = {
      datasets: [
        {
          label: 'Temperature Level',
          data: data.slice(0,50).map(row => ({
            x: row.timestamp,
            y: row.water_temperature
          })),
          fill: false,
          borderColor: 'violet',
          backgroundColor: data.map(row => row.notify ? 'red' : 'violet'),
          pointBackgroundColor: data.map(row => row.notify ? 'red' : 'violet'),
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: data.map(row => row.notify ? 'red' : 'violet'),
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
        text: 'Temperature Level For each DWLR',
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
          text: 'Temperature Level',
        },
        min: 24,
        max: 25,
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

export default TempGraph;
