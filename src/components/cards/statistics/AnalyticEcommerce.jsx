import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import '../../Chatbot/Loader.css'
import { borderRadius } from '@mui/system';


export default function AnalyticEcommerce({ color = 'primary', title, count,  loading }) {
  return (
    <MainCard contentSX={{ p: 2.25 , height: 125, pt: 3.2, backgroundColor: '#f7c21f', borderRadius: 5}}>
      <Stack spacing={1.2}>
        <Typography variant="h5" color="black">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h3" color="inherit">
            {loading ? (
             <div className='loader'></div>
            ) : (
              <>{count}</>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
}
AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};
