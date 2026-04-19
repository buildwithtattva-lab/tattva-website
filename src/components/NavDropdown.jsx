import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavDropdown.module.css';

const NavDropdown = ({ label, items, onMobileClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles.dropdownLabel}>
        {label}
        <svg 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        {items.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={styles.menuLink}
            onClick={() => {
              setIsOpen(false);
              if (onMobileClick) onMobileClick();
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavDropdown;
