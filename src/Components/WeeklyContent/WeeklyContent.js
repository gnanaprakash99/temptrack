import React, { useState, useEffect, useRef } from 'react';
import './WeeklyContent.css';
import { Element } from 'react-scroll';

const WeeklyContent = ({ location }) => {
  const [dailyWeather, setDailyWeather] = useState([]);
  const apiKey = '885e5a63877a215f293e713a946e66db';
  const scrollRef = useRef(null);
// console.log(process.env.S3_BUCKET)

  useEffect(() => {
    const fetchWeeklyWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        const groupedByDay = data.list.reduce((acc, entry) => {
          const date = new Date(entry.dt_txt).toDateString();
          if (!acc[date]) {
            acc[date] = { temp: 0, count: 0, description: entry.weather[0].description };
          }
          acc[date].temp += entry.main.temp;
          acc[date].count += 1;
          return acc;
        }, {});

        const dailyData = Object.keys(groupedByDay).map(date => ({
          date,
          temp: (groupedByDay[date].temp / groupedByDay[date].count).toFixed(1),
          description: groupedByDay[date].description,
        }));

        setDailyWeather(dailyData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setDailyWeather([]);
      }
    };

    if (location) {
      fetchWeeklyWeather();
    }
  }, [location]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Element name='weekly' className='weeklyContent'>
        <div>
          <h1>Weekly Weather in {location}</h1>
          <div className='weeklyWeatherWrapper'>
            <div className='weeklyWeather' ref={scrollRef}>
              {dailyWeather.length > 0 ? (
                <>
                  <button className='scroll-arrow left' onClick={scrollLeft}>⬅</button>

                  <div className='weeklyWeatherCards'>
                    {dailyWeather.map((day, index) => (
                      <div key={index} className='day'>
                        <p>{new Date(day.date).toLocaleDateString()}</p>
                        <p>{day.temp} °C</p>
                        <p>{day.description}</p>
                      </div>
                    ))}
                  </div>

                  <button className='scroll-arrow right' onClick={scrollRight}>➡</button>
                </>
              ) : (
                <p>Select your location...</p>
              )}
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default WeeklyContent;
