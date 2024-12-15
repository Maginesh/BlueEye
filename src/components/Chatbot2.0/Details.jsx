import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios';
import './Details.css'

const Details = ({triggerNextStep}) => {
    const {state, dwlrid} = useContext(GlobalContext)
    const [details, setDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getdetails', {
                    params: { dwlrid , state}, 
                });
                setDetails(response.data); 
                console.log(response.data)
                setLoading(false);
                triggerNextStep({ value: 'details displayed', trigger: '1' });
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchDetails();
    }, []); 
    return (
        <div className="details-container">
            {loading ? (
                <div className="loader"></div>
            ) : details ? (
                <div className="details-card">
                    <h2>Details</h2>
                    <div className="details-grid">
                        <div><strong>DWLR ID:</strong> {details.dwlr_id}</div>
                        <div><strong>Well Site Type:</strong> {details.well_site_type}</div>
                        <div><strong>Water Level:</strong> {details.water_level} m</div>
                        <div><strong>Battery Level:</strong> {details.battery_level}%</div>
                        <div><strong>Last Recorded:</strong> {new Date(details.timestamp).toLocaleString()}</div>
                        <div><strong>State:</strong> {details.state}</div>
                        <div><strong>District:</strong> {details.district}</div>
                        <div><strong>Block Name:</strong> {details.block_name}</div>
                        <div><strong>Village Name:</strong> {details.village_name}</div>
                        <div><strong>Site Name:</strong> {details.site_name}</div>
                        <div><strong>Latitude:</strong> {details.latitude}</div>
                        <div><strong>Longitude:</strong> {details.longitude}</div>
                    </div>
                </div>
            ) : (
                <div>No details found.</div>
            )}
        </div>
    )
}


export default Details;
