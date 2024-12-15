import React, { useContext, useEffect, useState } from 'react'
import './Loader.css'
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';

const DataAnalysis = ({triggerNextStep}) => {
  const [loading, setLoading] = useState(true);
  const { file } = useContext(GlobalContext)
  
  const callBackendApi = async () => {
    try {
        const formData = new FormData();
        formData.append('file', file); 
        
        const response = await axios.post('http://127.0.0.1:5000/dataAnalyse', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([response.data])); 
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'processed_data.csv'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


        const blob = new Blob([response.data], { type: 'text/csv' }); 
        const secondFormData = new FormData();
        secondFormData.append('file', blob, file.name);

        const secondResponse = await axios.post('http://127.0.0.1:5000//updateFile', secondFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log(secondResponse.data);
        setLoading(false);
        triggerNextStep({ value: response.data, trigger: '1' });
    } 
    catch (error) {
        console.error(error);
        alert('Data Analysis failed. Please try again.');
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
          All data has been successfully analysed and check your dashboard for further details. 
        </div>  
      )}
    </div>
  )
}

export default DataAnalysis
