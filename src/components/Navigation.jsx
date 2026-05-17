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
          <span className={styles.logoText}>tattva-ai</span>
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
          <Link to="/for-students" onClick={() => setMobileMenuOpen(false)}>Student Programs</Link>
          <Link to="/faculty-training" onClick={() => setMobileMenuOpen(false)}>Faculty Training</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          
          <a
            href="https://wa.me/918886945890"
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
