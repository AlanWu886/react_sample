import React from 'react'
import { Button,  Navbar, Nav, Form, FormControl } from 'react-bootstrap';

function Menu() {
  return(
    <div style={{margin: '10px 0 10px 0', opacity: '0.75'}}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#newA">New Arrival</Nav.Link>
            <Nav.Link href="#racquets">Racquets</Nav.Link>
            <Nav.Link href="#shuttlecocks">Shuttlecocks</Nav.Link>
            <Nav.Link href="#string">String</Nav.Link>
            <Nav.Link href="#footwear">Footwear</Nav.Link>
            <Nav.Link href="#bags">Bags</Nav.Link>
            <Nav.Link href="#accessories">Accessories</Nav.Link>
            <Nav.Link href="#contactUs">Contact Us</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
