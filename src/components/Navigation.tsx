import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className={`nav ${isOpen ? '' : 'hidden'}`}>
      <ol className="nav-items">
        <li className="nav-item"><Link to="#" onClick={handleLinkClick}>Home</Link></li>
        <li className="nav-item"><Link to="#work" onClick={handleLinkClick}>My Work</Link></li>
        <li className="nav-item"><Link to="#skills" onClick={handleLinkClick}>My Skills</Link></li>
        <li className="nav-item">
          <Link to="#contact" data-focused="last-focused" onClick={handleLinkClick}>Contact</Link>
        </li>
      </ol>
    </nav>
  );
};

export default Navigation;