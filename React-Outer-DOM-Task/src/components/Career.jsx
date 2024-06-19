// Career.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Career() {
  return (
    <div>
      <h2>All Courses</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
        <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/primosaur-ultimate.png" className="img-fluid" height={150} width={150} />
            <Card.Body>
              <Card.Title>Top 10 Local SEO Strategies for Small Businesses [2024]</Card.Title>
              <Card.Text>
              A Full stack development is the process of building both the front-end and back-end of an application.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png" />
            <Card.Body>
              <Card.Title>How to Build a Developer Portfolio That Stands Out in 2024</Card.Title>
              <Card.Text>
              Data science is an academic field that uses scientific methods, algorithms, and systems to extract insights from data.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
          <Card.Img variant="top" src="https://www.kasandbox.org/programming-images/avatars/primosaur-sapling.png" />
            <Card.Body>
              <Card.Title>25 Best Content Writing Tools in 2024: To Streamline Your Workflow</Card.Title>
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

export default Career;
