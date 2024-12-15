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

const AvgTemperature = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const telemetryData = data.reduce((acc, row) => {
      if (!acc[row.telemetry_uid]) {
        acc[row.telemetry_uid] = { sum: 0, count: 0 };
      }
      acc[row.telemetry_uid].sum += row.water_temperature;
      acc[row.telemetry_uid].count += 1;
      return acc;
    }, {});

    const averagedData = Object.keys(telemetryData).map(key => ({
      telemetry_uid: key,
      avgTemperatureLevel: telemetryData[key].sum / telemetryData[key].count,
    }));

    const processedData = {
      datasets: [
        {
          label: 'Average Temperature Level',
          data: averagedData.map(row => ({
            x: row.telemetry_uid,
            y: row.avgTemperatureLevel,
          })),
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
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Temperature Level by Telemetry ID',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Telemetry ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Temperature Level',
        },
        min: 10,
        max: 35,
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

export default AvgTemperature;