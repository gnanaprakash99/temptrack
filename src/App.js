import React, { useState } from 'react';
import './App.css';
import Header from './Components/header/Header';
import TopContainer from './Components/TopContainer/TopContainer';
import HourlyContent from './Components/HourlyContent/HourlyContent';
import WeeklyContent from './Components/WeeklyContent/WeeklyContent';
import MonthlyContent from './Components/MonthlyContent/MonthlyContent';

function App() {
  const [location, setLocation] = useState('');

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };
  return (
    <div>
      <Header onLocationChange={handleLocationChange} />
      <TopContainer location={location} />
      <HourlyContent location={location} />
      <WeeklyContent location={location} />
      <MonthlyContent location={location} />
    </div>
  );
}

export default App;
