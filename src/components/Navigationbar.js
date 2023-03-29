import React from 'react'
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Navigationbar ()  {
  return (
    
        <Navbar collapseOnSelect expand="sm" bg="" variant="light">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink  eventKey="1" as={Link} to="/">Signup</NavLink>
                    <NavLink  eventKey="2" as={Link} to="/Rewards2">Rewards</NavLink>
                    <NavLink  eventKey="5" as={Link} to="/Settings">Settings</NavLink>

                </Nav>
            </Navbar.Collapse>     
        </Navbar>

  )
}


