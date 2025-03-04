import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.classList.toggle('lock-screen');
  };

  return (
    <header className="header">
      <div className="menu-btn-container">
        <div className="container">
          <button type="button" className="menu-btn" onClick={toggleNav}>
            {isNavOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      <Navigation isOpen={isNavOpen} onClose={toggleNav} />

      <div id="home" className="container">
        <div className="header-textbox">
          <h1 className="h1">
            <span>Hi, I'm kailash</span>
            <span>Full stack web, game and app developer </span>
          </h1>
          <p className="header-text">
            As a full stack web, game, and app developer, I possess versatile expertise across both frontend and backend technologies. I am adept at designing and implementing interactive user experiences for a wide range of applications including web applications, games, and mobile apps.
          </p>

          <div className="header-btns">
            <Link to="#contact" className="btn btn-cta">Hire me</Link>
            <Link to="#work" className="btn btn-secondary">See my work</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;