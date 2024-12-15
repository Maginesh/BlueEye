import React, { useContext, useEffect, useState } from 'react'
import './Loader.css'
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';

const SingleModal = ({date}) => {
  const [loading, setLoading] = useState(true);
  const[message, setMessage] = useState('');
  const {dwlrid} = useContext(GlobalContext)
  
  const callBackendApi = async () => {
        try {
          const res = await axios.post('http://127.0.0.1:5000/getNewDetails', { dwlrid, 'date' : date.value });
          console.log('API response:', res.data);
          setMessage(res.message)
          setLoading(false);
        } catch (error) {
          console.error('Error Fetching', error);
        }
  };
  useEffect(() => {
    callBackendApi();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <div>
          {message}
        </div>  
      )}
    </div>
  )
}

export default SingleModal
