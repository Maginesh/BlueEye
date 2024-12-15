import React, { useState, useRef, useEffect, useContext } from 'react';
import './OtpVerification.css'; 
import { useNavigate } from 'react-router';
import AuthBackground from 'assets/images/auth/AuthBackground';
import axios from 'axios'
import { useLocation } from 'react-router';
import { GlobalContext } from 'GlobalContext';
import { jwtDecode } from 'jwt-decode';
const OtpVerification = () => {
  const location = useLocation()
  const {email} = location.state || ""
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || null;
  


  useEffect(()=>{
    if(!token){
      console.log(token)
      const token_data = jwtDecode(token)
      if(token_data.role ==='admin')
          navigate("dashboard/default")
    }
  })

  

  const handleChange = (element, index) => {
    const value = element.value;

    if (!isNaN(value) && value !== '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    const value = e.target.value;

    if (e.key === 'Backspace') {
      if (value === '') {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  const verifyOtp = async() => {
    console.log(email)
    try{
      const res = await axios.post('http://127.0.0.1:5000/mfaCheck', {
        email: email,
        otp: otp,
        exp: Date.now() + 720000,
        iat: Date.now()
      });
      const token = res.data.data.token
      localStorage.setItem('token', token)
      setTimeout(()=>{
        navigate('/dashboard/default')
      },1000)

    }
    catch(error){
      console.error(error.message)
    }
    
  };

  return (
    <div className='main-otp'>
    <div className="otp-container">
      <header>OTP</header>
      <h4>Enter the 6-digit OTP</h4>
      <form className='otp-form'>
        <div className="otp-input-field">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              ref={(el) => (inputs.current[index] = el)}
              />
            ))}
        </div>
        <button 
          type="button" 
          className={otp.join('').length === 6 ? 'active' : ''}
          onClick={verifyOtp}
          >
          Verify OTP
        </button>
      </form>
    </div>
    </div>
  );
};

export default OtpVerification;