import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import InfoTable from './InfoTable';
import { Chatbot } from 'components/Chatbot/Chatbot';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

export default function DashboardDefault() {

  const [dwlrConnected, setDwlrConnected] = useState(null);
  const [anomalyDetected, setAnomalyDetected] = useState(null);
  const [lowBattery, setLowBattery] = useState(null);
  const [bothAnomalyLowBattery, setBothAnomalyLowBattery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const token_data = jwtDecode(token)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // if(!token_data || token_data.role !== 'admin' || (Date.now()) > token_data.exp)
      //     navigate("/login")
      try {
        const response = await axios.get('http://127.0.0.1:5000/cardDetails');
        console.log(response.data)
        setDwlrConnected(response.data.dwlrConnected);
        setAnomalyDetected(response.data.anomalyDetected);
        setLowBattery(response.data.lowBattery);
        setBothAnomalyLowBattery(response.data.bothAnomalyLowBattery);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
      
      try {
        const res = await axios.get('http://127.0.0.1:5000/tableDetails');
        setData(res.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total DWLR's Connected" count={dwlrConnected} loading = {loading}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Anomaly Detected" count={anomalyDetected} loading = {loading}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Low Level Battery" count={lowBattery} loading = {loading}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Both Anomaly and Low Battery" count={bothAnomalyLowBattery} loading = {loading}/>
      </Grid>

      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">DWLR Details</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <InfoTable data = {data}/>
        </MainCard>
      </Grid>
      <Chatbot />
    </Grid>
  );
}
