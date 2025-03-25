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
          <span>Hey there! I'm Kailash 👋</span>
          <span className="rainbow-text">Coding Wizard • Professional Problem Creator (whoops, solver!)</span>
        </h1>
        <p className="header-text">
          I'm a Swiss Army knife developer who can't decide between web, apps, games, or blockchain - so I build them all! 🚀 Whether I'm crafting pixel-perfect interfaces users actually enjoy, or wrestling with backend dragons to protect your precious data, I turn caffeine into clean code and wild ideas into working tech. Bonus: I speak fluent JavaScript, Java, and Blockchain-ese (still working on my human language skills!).
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