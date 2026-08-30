import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return <footer className={styles.footer}>
    <div className={styles.panel}>
      <div className={styles.topRow}>
        <div className={styles.intro}>
          <p>✦ Contact us</p>
          <h2>Interested in working together, bringing AI learning to your institution, or simply learning more?</h2>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/for-schools">For Schools</Link>
          <Link to="/for-students">Programs</Link>
          <Link to="/projects">Gallery</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      <div className={styles.contact}><span>Contact Tattva at:</span><a href="mailto:team@tattva-ai.in">team@tattva-ai.in ↗</a></div>
      <div className={styles.brandRow}>
        <Link to="/" className={styles.brand}><img src="/assets/icons/updated logoo (1).png" alt="" /><span>tattva-ai</span></Link>
        <div className={styles.socials}><a href="https://instagram.com/tattvahq" target="_blank" rel="noreferrer">Instagram</a><a href="https://wa.me/918886945890" target="_blank" rel="noreferrer">WhatsApp</a></div>
      </div>
      <div className={styles.legal}>© {currentYear} Tattva AI. All rights reserved.</div>
    </div>
  </footer>;
};

export default Footer;
