import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from './NavDropdown';
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

  const solutionItems = [
    { label: 'For Schools', path: '/for-schools' },
    { label: 'For Colleges', path: '/for-colleges' }
  ];

  const recruitmentItems = [
    { label: 'Join as Educator', path: '/hiring/educator' },
    { label: 'Hire Talent', path: '/hiring/employer' }
  ];

  const discoverItems = [
    { label: 'Services', path: '/services' },
    { label: 'Upcoming Events', path: '/events' }
  ];

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
          
          <NavDropdown 
            label="Solutions" 
            items={solutionItems} 
            onMobileClick={() => setMobileMenuOpen(false)} 
          />

          <NavDropdown 
            label="Discover" 
            items={discoverItems} 
            onMobileClick={() => setMobileMenuOpen(false)} 
          />

          <NavDropdown 
            label="Recruitment" 
            items={recruitmentItems} 
            onMobileClick={() => setMobileMenuOpen(false)} 
          />

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
