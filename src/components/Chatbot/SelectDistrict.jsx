import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../../GlobalContext';

const options = {
  maharashtra: ["CGWNAG2174", "CGWNAG2175", "CGWNAG2176", "CGWNAG2177", "CGWNAG2178","CGWNAG2180"],
  madhyapradesh: ["CGWNAG2165", "CGWKOL0167", "CGWKOL0168", "CGWKOL0169", "CGWKOL0170","CGWKOL0171"]
};

const SelectDistrict = ({ id, triggerNextStep }) => {
  
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const {state, setDwlrid} = useContext(GlobalContext)

  useEffect(() => {
    if (state && options[state]) {
      const districts = options[state].map((district) => ({
        value: district,
        label: district,
      }));
      setDistrictOptions(districts);
    } else {
      setDistrictOptions([]); 
    }
    setSelectedDistrict(null); 
  }, [state]);

  const handleChange = (selectedOption) => {
    setSelectedDistrict(selectedOption ? selectedOption.value : null);
  };

  const handleSubmit = () => {
    if (selectedDistrict) {
      setIsDisabled(true);
      setDwlrid(selectedDistrict)
      if(id == 1){
        if(state === 'maharashtra')
          triggerNextStep({ value: selectedDistrict, trigger: 'dataEnter1' });
        else 
          triggerNextStep({ value: selectedDistrict, trigger: 'dataEnter2' });
      }
      else{
        if(state === 'maharashtra')
          triggerNextStep({ value: selectedDistrict, trigger: 'dataEnter12' });
        else 
          triggerNextStep({ value: selectedDistrict, trigger: 'dataEnter22' });
      }
    } else {
      alert('Please select a district before submitting.');
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '250px',
      minWidth: '200px',
    }),
  };

  const buttonStyle = {
    padding: '9px 20px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isDisabled ? '#d6d6d6' : '#00994C',
    color: isDisabled ? '#6c757d' : 'white', 
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    boxShadow: isDisabled ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.1)', 
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} disabled={isDisabled}>
      <Select
        options={districtOptions}
        value={districtOptions.find((option) => option.value === selectedDistrict)}
        onChange={handleChange}
        isClearable={true}
        isDisabled={isDisabled || districtOptions.length === 0}
        placeholder="Select a district"
        styles={customStyles}
      />
      <button
        onClick={handleSubmit}
        disabled={isDisabled} 
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
};

export default SelectDistrict;
