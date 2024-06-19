// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import AllCourses from './components/AllCourses';
import FullStackDevelopment from './components/FullStackDevelopment';
import DataScience from './components/DataScience';
import CyberSecurity from './components/CyberSecurity';
import Career from './components/Career';

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Container>
          <Switch>
            <Route path="/all" component={AllCourses} />
            <Route path="/full-stack" component={FullStackDevelopment} />
            <Route path="/data-science" component={DataScience} />
            <Route path="/cyber-security" component={CyberSecurity} />
            <Route path="/career" component={Career} />
            {/* Additional routes */}
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
