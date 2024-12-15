import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Translator from './Translator'; 

function GetDept(props) {
  const [departmentData, setDepartmentData] = useState(null);

  useEffect(() => {
    async function fetchDepartmentData() {
      try {
        const response = await axios.get('http://localhost:3001/gptData');
        setDepartmentData(response.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    }

    fetchDepartmentData();
  }, []);

  const departmentName = departmentData?.department;

  return (
    <div>
      {departmentName ? (
        <Translator text={`Your grievance has been submitted to the department of ${departmentName}`} targetLang={props.lang} />
      ) : (
        <p>Loading department data...</p>
      )}
    </div>
  );
}

export default GetDept;
