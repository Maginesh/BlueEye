import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import axios from 'axios';
import './Details.css';

const Details = ({ triggerNextStep, date }) => {
    const { state, dwlrid } = useContext(GlobalContext);
    const [details, setDetails] = useState([]);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);  
                const response = await axios.get('http://127.0.0.1:5000/getTelemetryDetails', {
                    params: { dwlrid, state, date }
                });
                setDetails(response.data); 
                console.log(response.data);
                setLoading(false);  
                triggerNextStep({ value: 'details displayed', trigger: '1' });
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [dwlrid, state, date]); 

    return (
        <div className="newdetails-container">
            {loading ? (
                <div className="loader">Loading...</div>
            ) : details.length > 0 ? (
                <div className="newdetails-cards-container">
                    {details.map((detail, index) => (
                        <div key={index} className="newdetails-card">
                            <h2>Reading {index + 1}</h2>
                            <div className="newdetails-grid">
                                <div><strong>Telemetry UID:</strong> {detail.telemetry_uid}</div>
                                <div><strong>State:</strong> {detail.state}</div>
                                <div><strong>District:</strong> {detail.district}</div>
                                <div><strong>Block Name:</strong> {detail.block}</div>
                                <div><strong>Latitude:</strong> {detail.latitude}</div>
                                <div><strong>Longitude:</strong> {detail.longitude}</div>
                                <div><strong>Water Level:</strong> {detail.water_level} m</div>
                                <div><strong>Battery Level:</strong> {detail.battery}%</div>
                                <div><strong>Water Temperature:</strong> {detail.water_temperature} °C</div>
                                <div><strong>Well Depth:</strong> {detail.well_depth} m</div>
                                <div><strong>DWLR Depth:</strong> {detail.dwlr_depth} m</div>
                                <div><strong>Battery Anomaly:</strong> {detail.battery_level_anomaly ? 'Yes' : 'No'}</div>
                                <div><strong>Water Level Anomaly:</strong> {detail.water_level_anomaly ? 'Yes' : 'No'}</div>
                                <div><strong>Timestamp:</strong> {new Date(detail.timestamp).toLocaleString()}</div>
                                <div><strong>Notify:</strong> {detail.notify ? 'Yes' : 'No'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No details found.</div>
            )}
        </div>
    );
};

export default Details;
