import React, { useEffect } from 'react';

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

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault(); // Prevent default anchor behavior

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    onClose(); // Close the navigation menu after clicking
  };

  return (
    <nav className={`nav ${isOpen ? '' : 'hidden'}`}>
      <ol className="nav-items">
        <li className="nav-item">
          <a href="#home" onClick={(e) => handleLinkClick(e, "home")}>Home</a>
        </li>
        <li className="nav-item">
          <a href="#coding-activity" onClick={(e) => handleLinkClick(e, "coding-activity")}>My Coding Activity</a>
        </li>
        <li className="nav-item">
          <a href="#work" onClick={(e) => handleLinkClick(e, "work")}>My Work</a>
        </li>
        <li className="nav-item">
          <a href="#skills" onClick={(e) => handleLinkClick(e, "skills")}>My Skills</a>
        </li>
        <li className="nav-item">
          <a href="#contact" data-focused="last-focused" onClick={(e) => handleLinkClick(e, "contact")}>Contact</a>
        </li>
      </ol>
    </nav>
  );
};

export default Navigation;
