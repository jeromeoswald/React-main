// Navbar.jsx

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Guvi Blog</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/all">All</Nav.Link>
        <Nav.Link href="/full-stack">Full Stack Development</Nav.Link>
        <Nav.Link href="/data-science">Data Science</Nav.Link>
        <Nav.Link href="/cyber-security">Cyber Security</Nav.Link>
        <Nav.Link href="/career">Career</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
