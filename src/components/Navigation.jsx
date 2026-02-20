import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className={styles.logoLink}>
          <img
            src="/assets/icons/new logo.png"
            alt="ProjectMinds Logo"
            className={styles.logo}
          />
        </Link>

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
          <Link to="/">Home</Link>
          <Link to="/for-schools">For Schools</Link>
          <Link to="/for-colleges">For Colleges</Link>
          <Link to="/for-students">For Students</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <a
            href="http://wa.me/+918886945890"
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
