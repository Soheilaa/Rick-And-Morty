import React from 'react';
import { gql, useQuery } from '@apollo/client';
import LocationList from './components/LocationList';
import './App.css';

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      results {
        id
        name
        type
        dimension
        residents {
          name
          status
          species
          gender
          image
        }
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Rick and Morty Locations</h1>
      <LocationList locations={data.locations.results} />
    </div>
  );
};

export default App;
