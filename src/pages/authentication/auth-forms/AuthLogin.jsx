import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/@extended/AnimateButton';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import axios from 'axios';
import { GlobalContext } from 'GlobalContext';
import { jwtDecode } from 'jwt-decode';

export default function AuthLogin() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const {mfaEmail, setMfaEmail} = useContext(GlobalContext);
  const token = localStorage.getItem('token') || null;
  


  useEffect(()=>{
    if(!token){
      console.log(token)
      const token_data = jwtDecode(token)
      if(token_data.role ==='admin')
          navigate("dashboard/default")
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setLoading(true); // Set loading to true when request starts
      try {
        const res = await axios.post('http://127.0.0.1:5000/login', {
          email: formData.email,
          password: formData.password,
        });
        setMfaEmail(formData.email)
        console.log(mfaEmail)
        console.log(formData.email)
        setTimeout(()=>{
          navigate('/mfa', { state: { email: formData.email } });
        },1000)

      } catch (error) {
        setError(error.message);
        console.error('Error calling API:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <OutlinedInput
                type="email"
                name="email"
                placeholder="Enter email address"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={Boolean(formErrors.email)}
                disabled={loading} // Disable input when loading
              />
              <FormHelperText error>{formErrors.email}</FormHelperText>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                id="password-login"
                name="password"
                type="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      color="secondary"
                      disabled={loading} // Disable icon button when loading
                    >
                      <EyeOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
                disabled={loading} // Disable input when loading
              />
              <FormHelperText error>{formErrors.password}</FormHelperText>
            </Stack>
          </Grid>

          {error && <p>{error}</p>}

          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleLogin}
                style={{
                  background: '#0F2027',
                  backgroundImage: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                  WebkitBackground: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                  transition: 'all 0.2s ease',
                }}
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
      
    </>
  );
}

AuthLogin.propTypes = {
  isDemo: PropTypes.bool,
};
