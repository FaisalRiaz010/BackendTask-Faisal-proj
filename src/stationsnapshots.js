import React, { useState, useEffect } from 'react';
import './StationSnapshot.css'; // Import the CSS file for styling

const StationSnapshot = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/stations')//fetch backend APIs
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;//for user interaction
  }

  if (!data) {
    return <div>No data available.</div>;//if data isnt available
  }

 
  const apiTime = new Date(data.at);//fetching the time of avaialability

  return (
    <div className="station-snapshot">
      
      <h2 className="section-heading"> Time: {apiTime.toLocaleString()}</h2>

      <h2 className="section-heading">Snapshot of Stations</h2>

      <table className="station-table">
        <thead>
          <tr>
            <th>Kiosk ID</th>
            <th>Station</th>
            <th>Bikes Available</th>
            <th>Open Docks</th>
            <th>Total Docks</th>
          </tr>
        </thead>
        <tbody>
          {data.stations.map(station => (
            <tr key={station.properties.id}>
              <td>{station.properties.kioskId}</td>
              <td>{station.properties.name}</td>
              <td>{station.properties.bikesAvailable}</td>
              <td>{station.properties.docksAvailable}</td>
              <td>{station.properties.totalDocks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-heading">Weather in {data.weather.name}</h2>
      <p>Temperature: {data.weather.main.temp}K</p>
      <p>Feels Like: {data.weather.main.feels_like}K</p>
      <p>Weather Description: {data.weather.weather[0].description}</p>
    </div>
  );
};

export default StationSnapshot;
