import { useState, useEffect } from "react";
import DayCard from "./DayCard";
import axios from "axios";

function CardContainer() {
  const [uniqueData, setUniqueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/getStateDetails", {
          params: { state: "maharashtra" },
        });
    

        // Extract unique data
        const unique = {};
        const uniqueArray = [];

        res.data.forEach((row) => {
          const key = `${row.telemetry_uid}-${row.latitude}-${row.longitude}-${row.state}`;
          if (!unique[key]) {
            unique[key] = true;
            uniqueArray.push({
              telemetry_uid: row.telemetry_uid,
              latitude: row.latitude,
              longitude: row.longitude,
              state: row.state,
              water_level: row.water_level,
            });
          }
        });

        setUniqueData(uniqueArray);
        
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []); 
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mt-10">
      {uniqueData.map((row, index) =>
          <DayCard
            key={index}
            data={row}
            className="p-4 border rounded shadow-md w-48"
          />
        
      )}
    </div>
  );
}

export default CardContainer;
