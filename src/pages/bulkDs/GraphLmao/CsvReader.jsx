import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import LineGraph from './dwlr/Graph';
import BarGraph from './dwlr/BarGraph';
import InfoTable from './InfoTable';
import BatteryGraph from './dwlr/BatteryGraph';
import TempGraph from './dwlr/TempGraph';
import ScatterTemp from './dwlr/ScatterTemp';
import ScatterLevel from './dwlr/ScatterLevel';
import AvgLevel from './state/dwlrToAvgLevel';
import AvgBattery from './state/dwlrToAvgBattery';
import AvgTemperature from './state/dwlrToAvgTemp';
import DwlrAnomalies from './state/dwlrToNumAnomaly';
import DayLevel from './dwlr/DayLevel';
import WeekLevel from './dwlr/WeekLevel';
import MonthLevel from './dwlr/MonthLevel';
import WeekProgression from './dwlr/WeekProgression';
import MonthProgression from './dwlr/MonthProgression';
import AnomalyChart from './state/AnomalyChart';
import axios from 'axios';

const CsvReader = ({ csv }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, [csv]);

  const handleDownload = async () => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const formData = new FormData();
    formData.append('file', blob, 'report.csv'); 
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.csv'; 
    link.click();
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/emailReport', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div style={{ marginTop: '8' }}>
      <div style={{ position: 'relative' }}>
        <button 
          onClick={handleDownload} 
          style={{
            position: 'absolute',
            top: '30px',
            right: '10px',
            padding: '10px 15px',
            backgroundColor: 'purple',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download Report
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '2%' }}>
        
          <div className="graph-container" style={{ width: '80%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <InfoTable data={data} />
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <LineGraph data={data} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <BatteryGraph data={data} />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <BarGraph data={data} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <TempGraph data={data} />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <AvgLevel data={data} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <AvgBattery data={data} />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <AvgTemperature data={data} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <DwlrAnomalies data={data} />
          </div>
        </div>
      )}

      <h2>Regular Analysis</h2>
      
      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <DayLevel data={data} telemetry_uid={data[0].telemetry_uid} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <WeekLevel data={data} telemetry_uid={data[0].telemetry_uid} />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <MonthLevel data={data} telemetry_uid={data[0].telemetry_uid} />
          </div>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <WeekProgression data={data} telemetry_uid={data[0].telemetry_uid} />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div className="graph-container" style={{ width: '100%', height: '500px' }}>
            <MonthProgression data={data} telemetry_uid={data[0].telemetry_uid} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvReader;
