import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './SiteHeader.module.css';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'For Schools', to: '/for-schools' },
  { label: 'Student Programs', to: '/for-students' },
  { label: 'Faculty Training', to: '/faculty-training' },
  { label: 'Gallery', to: '/projects' },
  { label: 'About', to: '/about' }
];

const whatsappUrl = 'https://wa.me/918886945890';

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // The homepage keeps its image-integrated navigation treatment.
  if (pathname === '/') return null;

  return (
    <header className={styles.siteHeader}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link to="/" className={styles.logoLink} onClick={() => setIsOpen(false)}>
          <img src="/assets/icons/updated logoo (1).png" alt="" />
          <span>tattva-ai</span>
        </Link>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.actions}>
          <a href={whatsappUrl} className={styles.demoButton} target="_blank" rel="noreferrer">Book a Demo</a>
          <a href={whatsappUrl} className={styles.whatsappButton} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 .156 7.125.156 15.875c0 2.781.75 5.5 2.125 7.875L0 32l8.5-2.25c2.281 1.25 4.875 1.906 7.531 1.906 8.75 0 15.969-7.125 15.969-15.875 0-4.25-1.719-8.131-4.719-11.131ZM16.031 29c-2.375 0-4.687-.625-6.687-1.781l-.469-.281-5.031 1.281 1.312-4.875-.312-.5a12.94 12.94 0 0 1-1.969-6.969c0-7.25 5.906-13.156 13.156-13.156 3.5 0 6.782 1.375 9.25 3.875 2.469 2.5 3.875 5.781 3.875 9.281C29.281 23.125 23.281 29 16.031 29Zm7.219-9.875c-.406-.187-2.406-1.156-2.781-1.312-.375-.125-.656-.188-.938.219-.281.406-1.094 1.312-1.344 1.562-.25.281-.531.313-.938.094-.406-.188-1.75-.656-3.344-2.094-1.25-1.125-2.063-2.5-2.313-2.906-.25-.406 0-.594.188-.781.156-.156.344-.438.531-.656.156-.219.219-.406.313-.688.094-.25.031-.5-.063-.688-.094-.187-.938-2.25-1.281-3.062-.344-.813-.688-.688-.938-.719h-.781c-.281 0-.719.094-1.094.5-.375.406-1.438 1.406-1.438 3.438 0 2.031 1.469 4 1.688 4.25.188.281 2.875 4.375 6.969 6.156.969.406 1.719.656 2.313.844.969.313 1.844.25 2.531.156.781-.125 2.406-.969 2.75-1.906.344-.906.344-1.719.25-1.875-.125-.156-.406-.25-.813-.438Z" fill="currentColor" />
            </svg>
          </a>
          <button type="button" className={styles.menuButton} onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={isOpen}>☰</button>
        </div>
      </nav>

      <div className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setIsOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default SiteHeader;
