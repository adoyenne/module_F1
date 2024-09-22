import React from 'react';

const CitySelector = ({ cities, onChange }) => {
  return (
    <select onChange={(e) => onChange(cities[e.target.selectedIndex])}>
      {cities.map((city, index) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;