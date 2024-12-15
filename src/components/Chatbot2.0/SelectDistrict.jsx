import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../../GlobalContext';

const options = {
  goa: ["NorthGoa", "SouthGoa"],
  arunachal: [
    "Changlang",
    "EastSiang",
    "Lohit",
    "LowerDibangValley",
    "LowerSubansiri",
    "Papumpare",
    "Tirap"
  ],
  west_bengal: [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "CoochBihar",
    "DakshinDinajpur",
    "Darjeeling",
    "Hugli",
    "Jalpaiguri",
    "Kochbehar",
    "Malda",
    "Murshidabad",
    "Howrah",
    "PurbaBarddhaman",
    "Purulia"
  ],
  karnataka: [
    "Bagalkot",
    "BangaloreRural",
    "BangaloreUrban",
    "Belagavi",
    "Bellary",
    "Bidar",
    "Bijapur",
    "Chamarajanagar",
    "Chikballapur",
    "Chikballapur",
    "Chikkamagalur",
    "Chikkamagalur",
    "Chitradurga",
    "DakshinKannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Gulbarga",
    "Hassan",
    "Haveri",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysore",
    "Raichur",
    "Ramanagara",
    "Shimoga",
    "Tumkur",
    "Udupi",
    "UttaraKannada"
  ],
  andhra: [
    "Anantapur",
    "Chittoor",
    "WestGodavari",
    "Cuddapah",
    "EastGodavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram"
  ]
};

const SelectDistrict = ({ id, triggerNextStep }) => {
  
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const {state, setDistrict} = useContext(GlobalContext)

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
      setDistrict(selectedDistrict)
      if(id === 1)
        triggerNextStep({ value: selectedDistrict, trigger: '28' });
      else 
        triggerNextStep({ value: selectedDistrict, trigger: '30' });
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
