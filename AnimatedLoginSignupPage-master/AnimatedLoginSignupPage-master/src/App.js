import React from 'react'
import Signup from "./components/Signup"
import Signin from './components/Signin';
import Overlayleft from './components/Overlayleft'
import Overlayright from './components/Overlayright'
import './App.css';

function App() {
  return (
    <div className="container" id="container">
      <Signup />
      <Signin />
      <div className="overlay-container">
        <div className="overlay">
          <Overlayleft />
          <Overlayright />
        </div>
      </div>
    </div>
  );
}

export default App;
