import React from 'react';
import logo from './assets/syntex-logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Syntex Logo" className="navbar-logo-img" /></Link>
      </div>
      <ul className="navbar-links">
        <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
        <li><a href="#partners" onClick={(e) => scrollToSection(e, 'partners')}>Partners</a></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
