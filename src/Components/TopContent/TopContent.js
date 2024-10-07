import React, { useState, useEffect } from 'react';
import './TopContent.css';
import axios from 'axios'
import TopGlobeRotating from '../TopGlobeRotating/TopGlobeRotating';


const TopContent = ({ location }) => {
  const [weather, setWeather] = useState('');
  const apiKey = '885e5a63877a215f293e713a946e66db';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        const data = response.data

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
        <TopGlobeRotating />
      </div>
      <div className='topcontent_right'>
        <h1> {location ? "Today's Weather in" : 'Select  location...'}</h1>
        <h1>{location}</h1>
        <h1 className='weatherValue'>{weather}</h1>
      </div>
    </div>
  );
}

export default TopContent;
