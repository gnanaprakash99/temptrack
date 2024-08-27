import React, { useState, useEffect } from 'react';
import './TopContent.css';


const TopContent = ({ location }) => {
  const [weather, setWeather] = useState('');
  const apiKey = '885e5a63877a215f293e713a946e66db';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        setWeather(`${data.main.temp} °C`);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeather('Failed to load');
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  return (
    <div className='topcontent'>
      <div className='topcontent_left'>
        
      </div>
      <div className='topcontent_right'>
        <h1>Today's Weather in </h1>
        <h1>{location}</h1>
        <h1 className='weatherValue'>{weather}</h1>
      </div>
    </div>
  );
}

export default TopContent;
