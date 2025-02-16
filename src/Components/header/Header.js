import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-scroll'

const Header = ({ onLocationChange }) => {
    const [location, setLocation] = useState('');

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    const handleButtonClick = () => {
        if (location.trim()) {
            onLocationChange(location);
        }
    };

    return (
        <div className='header'>
            <div className='header_left'>
                <h1>TEMP<span>TRACK</span></h1>
            </div>
            <div className='header_right'>
                <div className='options'>
                    <Link to='today' smooth={true} duration={500}>
                        <h4>Today </h4>
                    </Link>
                    <Link to='hourly' smooth={true} duration={500}>
                        <h4>Hourly </h4>
                    </Link>
                    <Link to='weekly' smooth={true} duration={500}>
                        <h4>Weekly </h4>
                    </Link>
                    <Link to='monthly' smooth={true} duration={500}>
                        <h4>Monthly</h4>
                    </Link>
                </div>
                <div className='input-container'>
                    <i className='fas fa-map-marker-alt'></i>
                    <input
                        name='location'
                        value={location}
                        onChange={handleInputChange}
                        placeholder='Enter location'
                    />
                    <button onClick={handleButtonClick}>Get Weather</button>
                </div>
            </div>
        </div>
    )
}

export default Header


