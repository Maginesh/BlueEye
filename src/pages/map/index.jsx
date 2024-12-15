
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import './MapComponent.css';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const darkBlueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [filters, setFilters] = useState({
    red: true,
    green: true,
    orange: true,
    darkBlue: true,
  });

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/mapDetails";

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        let allMarkers = [];
        Object.keys(data).forEach((state) => {
          if (Array.isArray(data[state])) {
            data[state].forEach((entry) => {
              const lat = parseFloat(entry.latitude);
              const lng = parseFloat(entry.longitude);

              if (!isNaN(lat) && !isNaN(lng)) {
                allMarkers.push({ ...entry, LATITUDE: lat, LONGITUDE: lng });
              }
            });
          }
        });

        setMarkers(allMarkers);
        setFilteredMarkers(allMarkers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = markers.filter((marker) => {
      if (selectedState !== "All" && marker.state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }

      if (marker.anomaly && marker.battery_result && filters.red) return true;
      if (marker.battery_result && !marker.anomaly && filters.orange) return true;
      if (marker.anomaly && !marker.battery_result && filters.darkBlue) return true;
      if (!marker.anomaly && !marker.battery_result && filters.green) return true;

      return false;
    });

    setFilteredMarkers(filtered);
  }, [selectedState, filters, markers]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleFilterChange = (color) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [color]: !prevFilters[color],
    }));
  };

  return (
    <div className="map-container">
      <div className="dropdown-container">
        <select
          id="stateDropdown"
          value={selectedState}
          onChange={handleStateChange}
          className="state-dropdown"
        >
          <option value="All">All</option>
          <option value="maharashtra">Maharashtra</option>
          <option value="madhyapradesh">Madhya Pradesh</option>
        </select>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={filters.red}
            onChange={() => handleFilterChange('red')}
          />
          <span>
            <span style={{ backgroundColor: 'red', width: '24px', height: '20px', display: 'inline-block' }}></span> Water Anomaly & Battery Anomaly (0)
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.orange}
            onChange={() => handleFilterChange('orange')}
          />
          <span>
            <span style={{ backgroundColor: 'orange', width: '20px', height: '20px', display: 'inline-block' }}></span> Water Anomaly (0)
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.darkBlue}
            onChange={() => handleFilterChange('darkBlue')}
          />
          <span>
            <span style={{ backgroundColor: 'darkblue', width: '20px', height: '20px', display: 'inline-block' }}></span> Battery Anomaly (0)
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.green}
            onChange={() => handleFilterChange('green')}
          />
          <span>
            <span style={{ backgroundColor: 'green', width: '20px', height: '20px', display: 'inline-block' }}></span> Normal (12)
          </span>
        </label>
      </div>

      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredMarkers.map((marker) => (
          <Marker key={marker._id} position={[marker.LATITUDE, marker.LONGITUDE]} icon={marker.anomaly && marker.battery_level_anomaly ? redIcon : marker.battery_level_anomaly ? orangeIcon : marker.anomaly ? darkBlueIcon : greenIcon}>
            <Popup>
              <strong>ID:</strong> {marker.telemetry_uid}<br />
              <strong>State:</strong> {marker.state}<br />
              <strong>District:</strong> {marker.district}<br />
              <strong>Block Name:</strong> {marker.block}<br />
              <strong>Battery:</strong> {marker.battery}<br />
              <strong>Water Temperature:</strong> {marker.water_temperature}°C<br />
              <strong>Water Level:</strong> {marker.water_level}m<br />
              <strong>DWLR Depth:</strong> {marker.dwlr_depth}m<br />
              <strong>Well Depth:</strong> {marker.well_depth}m<br />
              <strong>Anomaly Notifications:</strong> {marker.notify ? 'Yes' : 'No'}<br />
              <a
                href={`https://www.google.com/maps?q=${marker.LATITUDE},${marker.LONGITUDE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Open in Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
