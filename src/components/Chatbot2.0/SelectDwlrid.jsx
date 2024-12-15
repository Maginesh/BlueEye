import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../../GlobalContext';

const options = [
  { value: 'CGWNAG2174', label: 'CGWNAG2174' }
];

const SelectDwlrid = ({ triggerNextStep }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const {setDwlrid} = useContext(GlobalContext);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsDisabled(true);
      setDwlrid(selectedOption.value)
    //   if(id === 1)
        triggerNextStep({value: selectedOption, trigger: 'dataEnter'})
    //   else  
        // triggerNextStep({value: selectedOption, trigger: '16'})
    } else {
      alert('Please select an option before submitting.');
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
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isClearable={true}
        isDisabled={isDisabled} 
        styles={customStyles}
      />
      <button
        onClick={handleSubmit}
        disabled={isDisabled} 
        style={buttonStyle}
      >
        Get Details
      </button>
    </div>
  );
};

export default SelectDwlrid;