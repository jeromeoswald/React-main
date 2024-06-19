// CyberSecurity.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CyberSecurity() {
  return (
    <div>
      <h2>All Courses</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
        <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/spunky-sam.png" className="img-fluid" height={150} width={150} />
            <Card.Body>
              <Card.Title>Cybersecurity Vs Ethical Hacking: Top 10 Differences</Card.Title>
              <Card.Text>
              A Full stack development is the process of building both the front-end and back-end of an application.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png" />
            <Card.Body>
              <Card.Title>8 Different Types of Cybersecurity and Threats Involved</Card.Title>
              <Card.Text>
              Data science is an academic field that uses scientific methods, algorithms, and systems to extract insights from data.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/purple-pi.png" />
            <Card.Body>
              <Card.Title>What Is Hacking? Types of Hacking & More</Card.Title>
              <Card.Text>
              Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. 
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CyberSecurity;
