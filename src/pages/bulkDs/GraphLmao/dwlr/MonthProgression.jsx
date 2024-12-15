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

const MonthProgression = ({ data, telemetry_uid }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const filteredData = data.filter(row => row.telemetry_uid === telemetry_uid);

    const monthlyData = filteredData.reduce((acc, row) => {
      if (row.timestamp) {
        const dateStr = row.timestamp.substring(0, 10);
        const dayOfMonth = dateStr.substring(8, 10);
        if (dayOfMonth === '01') {
          const monthStart = dateStr.substring(0, 7);
          if (!acc[monthStart]) {
            acc[monthStart] = { sum: 0, count: 0 };
          }
          acc[monthStart].sum += -row.water_level;
          acc[monthStart].count += 1;
        }
      }
      return acc;
    }, {});

    const averagedData = Object.keys(monthlyData).map(monthStart => ({
      x: `${monthStart}-01`,
      y: monthlyData[monthStart].sum / monthlyData[monthStart].count,
    }));

    const processedData = {
      datasets: [
        {
          label: 'Average Water Level (First Day of Each Month)',
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
        text: 'Average Water Level (First Day of Each Month)',
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

export default MonthProgression;
