import React, { useState, useEffect, useRef } from 'react';
import './HourlyContent.css';
import { Element } from 'react-scroll';

const HourlyContent = ({ location }) => {
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const apiKey = '885e5a63877a215f293e713a946e66db';
    const scrollRef = useRef(null);
    
    useEffect(() => {
        const fetchHourlyWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
                );
                const data = await response.json();
                const hourlyData = data.list.slice(0, 12);
                setHourlyWeather(hourlyData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setHourlyWeather([]);
            }
        };
        if (location) {
            fetchHourlyWeather();
        }
    }, [location]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.querySelector('.hour').offsetWidth * 3; 
            scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.querySelector('.hour').offsetWidth * 3; 
            scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Element name='hourly' className='hourlyContent'>
                <div>
                    <h1>Hourly Weather in {location} </h1>

                    <div className='scroll-container'>
                        {hourlyWeather.length > 0 ? (
                            <>
                                <div className='hourlyContent_weather' ref={scrollRef}>
                                    {hourlyWeather.map((hour, index) => (
                                        <div key={index} className='hour'>
                                            <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <p>{hour.main.temp} °C</p>
                                            <p>{hour.weather[0].description}</p>
                                        </div>
                                    ))}
                                </div>

                                <button className='scroll-arrow left' onClick={scrollLeft}>⬅</button>
                                <button className='scroll-arrow right' onClick={scrollRight}>➡</button>
                            </>
                        ) : (
                            <p>Select your location...</p>
                        )}
                    </div>
                </div>
            </Element>
        </div>
    );
};

export default HourlyContent;
