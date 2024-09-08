// src/components/LocationList.tsx
import React, { useState } from 'react';
import './LocationList.css';  // Ensure this file exists and is properly styled

interface Resident {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
}

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [dimensionFilter, setDimensionFilter] = useState<string>('');

  const filteredLocations = locations.filter(location => 
    (typeFilter === '' || location.type === typeFilter) &&
    (dimensionFilter === '' || location.dimension === dimensionFilter)
  );

  const getStatistics = (location: Location) => {
    const aliveCount = location.residents.filter(res => res.status === 'Alive').length;
    const deadCount = location.residents.filter(res => res.status === 'Dead').length;
    const humanCount = location.residents.filter(res => res.species === 'Human').length;
    const alienCount = location.residents.filter(res => res.species === 'Alien').length;
    const robotCount = location.residents.filter(res => res.species === 'Robot').length;

    return {
      aliveCount,
      deadCount,
      humanCount,
      alienCount,
      robotCount
    };
  };

  return (
    <div>
      <div className="filters">
        <label>Filter by Type:</label>
        <input 
          type="text" 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)} 
        />
        <label>Filter by Dimension:</label>
        <input 
          type="text" 
          value={dimensionFilter} 
          onChange={(e) => setDimensionFilter(e.target.value)} 
        />
      </div>

      <div className="container">
        {filteredLocations.map((location, index) => (
          <div
            key={location.id}
            className={index === 0 ? "location-card single-column" : "location-card two-columns"}
          >
            <div className="location-details">
              <h2>{location.name}</h2>
              <p>Type: {location.type}</p>
              <p>Dimension: {location.dimension}</p>
              <h3>Residents:</h3>
            </div>
            <div className="residents-details">
              {location.residents.map((resident, i) => (
                <div key={i} className="resident-card">
                  <div className="resident-image">
                    <img src={resident.image} alt={resident.name} />
                  </div>
                  <div className="resident-info">
                    <p>Name: {resident.name}</p>
                    <p>Status: {resident.status}</p>
                    <p>Species: {resident.species}</p>
                    <p>Gender: {resident.gender}</p>
                  </div>
                </div>
              ))}
              <div className="statistics">
                <p>Alive Residents: {getStatistics(location).aliveCount}</p>
                <p>Dead Residents: {getStatistics(location).deadCount}</p>
                <p>Humans: {getStatistics(location).humanCount}</p>
                <p>Aliens: {getStatistics(location).alienCount}</p>
                <p>Robots: {getStatistics(location).robotCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
