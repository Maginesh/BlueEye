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

const LineGraph = ({ data, telemetry_uid }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const filteredData = data.filter(row => row.telemetry_uid === telemetry_uid);
    const dailyData = filteredData.reduce((acc, row) => {
      if (row.timestamp) {
        const day = row.timestamp.substring(0, 10);
        if (!acc[day]) {
          acc[day] = { sum: 0, count: 0 };
        }
        acc[day].sum += row.water_level;
        acc[day].count += 1;
      }
      return acc;
    }, {});

    const averagedData = Object.keys(dailyData).map(day => ({
      x: day,
      y: dailyData[day].sum / dailyData[day].count,
    }));

    const processedData = {
      datasets: [
        {
          label: 'Average Water Level',
          data: averagedData,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          pointBackgroundColor: 'blue',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'blue',
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    };

    setChartData(processedData);
  }, [data, telemetry_uid]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Water Level by Day',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Water Level',
        },
        min: -15,
        max: 0, 
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return chartData ? <Line data={chartData} options={options} /> : null;
};

export default LineGraph;
