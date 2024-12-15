import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [dwlrid, setDwlrid] = useState('');
    const [block, setBlock] = useState('');
    const [wellType, setWellType] = useState('');
    const [waterLevel, setWaterLevel] = useState('');
    const [batteryLevel, setBatteryLevel] = useState('');
    const [file, setFile] = useState(null); 
    const [mfaEmail, setMfaEmail] = useState('');

    return (
        <GlobalContext.Provider value={{ state, setState, district, setDistrict, dwlrid, setDwlrid, block, setBlock, wellType, setWellType, waterLevel, setWaterLevel, batteryLevel, setBatteryLevel,file, setFile, mfaEmail, setMfaEmail }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
