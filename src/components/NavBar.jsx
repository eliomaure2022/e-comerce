import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import SidebarCart from './SidebarCart';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <> 
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>E-comerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
              <Nav.Link as={Link} to={'/purchases'}>Purchases</Nav.Link>
              <Nav.Link as={Button} onClick={() => setShow(true)} >Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SidebarCart show={show} handleClose={handleClose}/>
    </>
  );
};


export default NavBar;