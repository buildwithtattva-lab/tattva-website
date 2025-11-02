import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="/" className={styles.logoLink}>
          <img 
            src="/assets/icons/new logo.png" 
            alt="ProjectMinds Logo" 
            className={styles.logo}
          />
        </a>
        
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
          <a 
            href="http://wa.me/+918886945890" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
          <a 
            href="http://wa.me/+918886945890" 
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
