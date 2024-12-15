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

const WeekLevel = ({ data, telemetry_uid }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const filteredData = data.filter(row => row.telemetry_uid === telemetry_uid);

    const weeklyData = filteredData.reduce((acc, row) => {
      if (row.timestamp) {
        const date = row.timestamp.substring(0, 10); 
        const year = parseInt(date.substring(6, 10), 10);
        const month = parseInt(date.substring(3, 5), 10) - 1;
        const day = parseInt(date.substring(0, 2), 10);

        const currentDate = new Date(year, month, day);
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;

        // Get week number
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        const weekKey = `${currentDate.getFullYear()}-W${weekNumber}`;

        if (!acc[weekKey]) {
          acc[weekKey] = { sum: 0, count: 0 };
        }
        acc[weekKey].sum += -row.water_level; 
        acc[weekKey].count += 1;
      }
      return acc;
    }, {});

    const averagedData = Object.keys(weeklyData).map(weekKey => ({
      x: weekKey,
      y: weeklyData[weekKey].sum / weeklyData[weekKey].count,
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
        text: 'Average Water Level by Week',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Week',
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

export default WeekLevel;
