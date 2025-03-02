import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <nav>
            <ol className="footer-links">
              <li className="footer-link">
                <a title="GitHub" href="https://github.com/kailzxh?tab=overview&from=2024-07-01&to=2024-07-12" target="_blank" rel="noopener">
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/github.svg"
                    alt="GitHub"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a title="Codepen" href="https://codepen.io/Kailash-Godara" target="_blank" rel="noopener">
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/codepen.svg"
                    alt="Codepen"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a title="Linkedin" href="https://www.linkedin.com/in/kailzxh" target="_blank" rel="noopener">
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/linkedin.svg"
                    alt="Linkedin"
                  />
                </a>
              </li>
              <li className="footer-link">
                <a title="Twitter" href="https://x.com/kailzxh" target="_blank" rel="noopener">
                  <img
                    loading="lazy"
                    src="/assets/images/social-links/twitter.svg"
                    alt="Twitter"
                  />
                </a>
              </li>
            </ol>
          </nav>
          <p className="footer-text">
            &copy; <span>{currentYear}</span> - designed & developed by <a target="_blank" rel="noopener" href="https://github.com/kailzxh?tab=overview&from=2024-07-01&to=2024-07-12">Kailash</a>
          </p>
          <label className="theme-switch" htmlFor="theme-switch">
            <span>Dark Theme</span>
            <input 
              type="checkbox" 
              id="theme-switch" 
              role="switch"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;