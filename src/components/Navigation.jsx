import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ isSolid = false }) => {
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
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isSolid ? styles.solid : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/assets/icons/updated logoo (1).png"
            alt="Tattva Logo"
            className={styles.logoSymbol}
          />
          <span className={styles.logoText}>tattva.ai</span>
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
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/for-schools" onClick={() => setMobileMenuOpen(false)}>For Schools</Link>
          <Link to="/for-colleges" onClick={() => setMobileMenuOpen(false)}>For Colleges</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/events" onClick={() => setMobileMenuOpen(false)}>Events</Link>
          <Link to="/hiring" onClick={() => setMobileMenuOpen(false)}>Hiring</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <a
            href="http://wa.me/+918886945890"
            className={styles.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
