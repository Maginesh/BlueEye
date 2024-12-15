import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarGraph = ({ state }) => {
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

          const processedData = {
            datasets: [
              {
                label: 'Water Level',
                data: rawData.slice(0, 25).map(row => ({
                  x: row.dwlr_id,
                  y: row.water_level,
                })),
                backgroundColor: rawData.slice(0, 25).map(row =>
                  row.anomaly ? '#D9534F' : '#3A7BAE'
                ),
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.8,
                hoverBackgroundColor: 'rgba(255, 159, 64, 1)',
                hoverBorderColor: 'rgba(255, 159, 64, 1)',
                hoverBorderWidth: 2,
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
        // border: '0px solid #ddd',
        borderRadius: '10px',
        // backgroundColor: '#f9f9f9',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
      Loading chart...
    </div>
  );
};

export default BarGraph;
