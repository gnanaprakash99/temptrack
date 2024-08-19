import React,{useState} from 'react';
import './App.css';
import Header from './Components/header/Header';
import TopContainer from './Components/TopContainer/TopContainer';

function App() {
  const [location, setLocation] = useState('');

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };
  return (
    <div>
      <Header onLocationChange={handleLocationChange}/>
      <TopContainer location={location}/>
  
    </div>
  );
}

export default App;
