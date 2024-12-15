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

    const weeklyData = filteredData.reduce((acc, row) => {
      if (row.timestamp) {
        const date = new Date(row.timestamp.substring(0, 10));
        const dayOfWeek = date.getUTCDay();
        if (dayOfWeek === 1) {
          const weekStart = new Date(date.setUTCDate(date.getUTCDate() - dayOfWeek)).toISOString().substring(0, 10);
          if (!acc[weekStart]) {
            acc[weekStart] = { sum: 0, count: 0 };
          }
          acc[weekStart].sum += -row.water_level;
          acc[weekStart].count += 1;
        }
      }
      return acc;
    }, {});

    const averagedData = Object.keys(weeklyData).map(weekStart => ({
      x: weekStart,
      y: weeklyData[weekStart].sum / weeklyData[weekStart].count,
    }));

    const processedData = {
      datasets: [
        {
          label: 'Average Water Level (First Day of Week)',
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
        text: 'Average Water Level (First Day of Each Week)',
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
        min: 0,
        max: 15,
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
