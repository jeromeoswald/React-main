// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import NavbarComponent from './components/Navbar';
import AllCourses from './components/AllCourses';
import FullStackDevelopment from './components/FullStackDevelopment';
import DataScience from './components/DataScience';
import CyberSecurity from './components/CyberSecurity';
import Career from './components/Career';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Container>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/all" element={<AllCourses/>} />
          <Route path="/full-stack" element={<FullStackDevelopment/>} />
          <Route path="/data-science" element={<DataScience/>} />
          <Route path="/cyber-security" element={<CyberSecurity/>} />
          <Route path="/career" element={<Career/>} />
        </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
