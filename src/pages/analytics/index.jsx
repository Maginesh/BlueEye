import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import StateTable from './StateTable';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

const options = [
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'madhyapradesh', label: 'Madhya Pradesh' }   
];

export default function Analytics() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const token = localStorage.getItem('token');
  const token_data = jwtDecode(token)
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!token_data || token_data.role !== 'admin' || (Date.now()) > token_data.exp)
  //     navigate("/login")
  // },[])

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      width: '100%', 
    }),
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Analytics</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1.25 }}>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isClearable={false}
          styles={customStyles}
        />
      </Grid>
    

      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">State Wise Analytics</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',  }}content={false}>
          <LineGraph state = {selectedOption.value} />
        </MainCard>
        <MainCard sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',  }}content={false}>
          <BarGraph state = {selectedOption.value} />
        </MainCard>
      </Grid>


      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">DWLR Details</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <StateTable state = {selectedOption.value} />
        </MainCard>
      </Grid>
    </Grid>
  );
}
