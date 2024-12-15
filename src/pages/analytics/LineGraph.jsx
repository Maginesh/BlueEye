import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ state }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/getStateDetails', {
          params: { state },
        });

        if (isMounted) {
          const rawData = response.data;
          console.log(rawData)

          const processedData = {
            datasets: [
              {
                label: 'Water Level',
                data: rawData.slice(0, 25).map(row => ({
                  x: row.telemetry_uid,
                  y: row.water_level,
                })),
                pointBackgroundColor: rawData.slice(0, 25).map(row =>
                  row.water_level_anomaly ? 'red' : 'blue'
                ),
                pointBorderColor: rawData.slice(0, 25).map(row =>
                  row.water_level_anomaly ? 'red' : 'blue'
                ),
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3.4,
                pointHoverRadius: 7,
              },
            ],
          };

          setChartData(processedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [state]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      title: {
        display: true,
        text: 'Water Level Chart with Anomaly Detection',
        font: {
          size: 18,
          family: 'Arial, sans-serif',
        },
        color: '#004080',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'DWLR ID',
          color: '#004080',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water Level',
          color: '#004080',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
    },
    animation: {
      duration: 1000, 
      easing: 'easeInOutQuad', 
      onComplete: () => {
        console.log('Animation Complete!');
      },
    },
  };

  return chartData ? (
    <div
      style={{
        width: '85%',
        height: '100%',
        margin: 'auto auto auto auto',
        padding: '4%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
      Loading chart...
    </div>
  );
};

export default LineGraph;
