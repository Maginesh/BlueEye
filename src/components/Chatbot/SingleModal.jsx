import React, { useContext, useEffect, useState } from 'react'
import './Loader.css'
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';

const SingleModal = ({date}) => {
  const [loading, setLoading] = useState(true);
  const[message, setMessage] = useState('');
  const { state, dwlrid } = useContext(GlobalContext);

  
  const callBackendApi = async () => {
    const fetchDetails = async () => {
      try {
          setLoading(true);  
          const response = await axios.get('http://127.0.0.1:5000/getNewDetails', {
              params: { dwlrid, state, date }
          });
          console.log(response.data.message)
          setMessage(response.data.message)
          setLoading(false);  
          triggerNextStep({ value: 'details displayed', trigger: '1' });
      } catch (err) {
          console.log(err);
          setLoading(false);
      }
    };
    fetchDetails()
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
