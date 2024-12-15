import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AnomalyChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => { 
    let waterLevelAnomalyCount = 0;
    let batteryLevelAnomalyCount = 0;
    let dwlrDepthAnomalyCount = 0;
    let wellDepthAnomalyCount = 0; 
    data.forEach(row => {
      if (row.water_level_anomaly) waterLevelAnomalyCount++;
      if (row.battery_level_anomaly) batteryLevelAnomalyCount++;
      if (row.dwlr_depth_anomaly) dwlrDepthAnomalyCount++;
      if (row.well_depth_anomaly) wellDepthAnomalyCount++;
    }); 
    const processedData = {
      labels: [
        'Water Level Anomaly',
        'Battery Level Anomaly',
        'DWLR Depth Anomaly',
        'Well Depth Anomaly',
      ],
      datasets: [
        {
          label: 'Anomaly Counts',
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33B5'],
          data: [
            waterLevelAnomalyCount,
            batteryLevelAnomalyCount,
            dwlrDepthAnomalyCount,
            wellDepthAnomalyCount,
          ],
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
        text: 'Anomaly Count Pie Chart',
      },
    },
  };

  return chartData ? <Pie data={chartData} options={options} /> : null;
};

export default AnomalyChart;
