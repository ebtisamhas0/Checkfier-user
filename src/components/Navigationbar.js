import React, { useContext } from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { useStore } from './StoreContext';
import { LanguageContext } from './LanguageContext';
import rewardsTranslations from '../translations/rewards';
import { NotificationContext } from './NotificationContext';
import '../App.css';

export function Navigationbar() {
  const store = useStore();
  const { language } = useContext(LanguageContext);
  const translations = rewardsTranslations[language];
  const { unreadCount } = useContext(NotificationContext);

  const isRtl = (document.documentElement.getAttribute('dir') || '').toLowerCase() === 'rtl';

const badgeStyle = {
  position: 'absolute',
  top: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  borderRadius: '50%',
  backgroundColor: 'rgb(147, 6, 6)',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  left: isRtl ? '5px' : 'auto',
  right: isRtl ? 'auto' : '5px',
};


return (
  <Navbar collapseOnSelect expand="sm" bg="" variant="light">
    <Navbar.Toggle
      aria-controls="navbarScroll"
      data-bs-toggle="collapse"
      data-bs-target="#navbarScroll"
      style={{ marginRight: isRtl ? '0' : 'auto', marginLeft: isRtl ? 'auto' : '0' }}
    />
    <Navbar.Collapse id="navbarScroll">
      <Nav>
        <NavLink eventKey="1" as={Link} to="/Signup">
          {translations.signup}
        </NavLink>
        <NavLink eventKey="2" as={Link} to="/Rewards2">
          {translations.navReward}
        </NavLink>
        <NavLink eventKey="5" as={Link} to="/Settings">
          {translations.settings}
        </NavLink>
      </Nav>
    </Navbar.Collapse>
    <NavLink eventKey="6" as={Link} to="/Notification">
      <FaBell style={{ fontSize: 22, marginRight: isRtl ? '5px' : 'auto', marginLeft: isRtl ? 'auto' : '5px', color: store.color }} />
      {unreadCount > 0 && (
        <span className="badge" style={badgeStyle}>
          {unreadCount}
        </span>
      )}
    </NavLink>
  </Navbar>
);

      }