import React, {useContext, useEffect, useState} from 'react'
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import { useStore } from './StoreContext';
import { LanguageContext } from './LanguageContext';
import rewardsTranslations from '../translations/rewards';
import { NotificationContext } from './NotificationContext';
import '../App.css';

export function Navigationbar ()  {
    const store = useStore();
    const { language } = useContext(LanguageContext);
  const translations = rewardsTranslations[language];
  const { unreadCount } = useContext(NotificationContext);

  return (
    
        <Navbar collapseOnSelect expand="sm" bg="" variant="light">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink  eventKey="1" as={Link} to="/">{translations.signup}</NavLink>
                    <NavLink  eventKey="2" as={Link} to="/Rewards2">{translations.navReward}</NavLink>
                    <NavLink  eventKey="5" as={Link} to="/Settings">{translations.settings}</NavLink>
       
                </Nav>
            </Navbar.Collapse> 
            <NavLink eventKey="6" as={Link} to="/Notification">
            <FaBell style={{fontSize:22, marginRight: 5,color: store.color}}/>
            {unreadCount > 0 &&
              <span className="badge">{unreadCount}</span>
            }

          </NavLink>    
        </Navbar>

  )
}


