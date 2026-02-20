import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className={styles.hero}
      ref={ref}
      style={{ transform: `translateY(${scrollY * 0.3}px)` }}
    >
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.heroContent} ${inView ? styles.visible : ''}`}>
          <h1 className={styles.headline}>
            Empowering Schools & Colleges with AI, Automation & Industry-Ready Learning
          </h1>
          <p className={styles.subheadline}>
            We help educational institutions integrate AI-driven tools, streamline operations, and prepare students for the future workforce.
          </p>

          <div className={styles.ctaButtons}>
            <a
              href="http://wa.me/+918886945890"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Consultation
            </a>
            <a
              href="http://wa.me/+918886945890"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Institutional Solutions
            </a>
            <Link to="/for-students" className={styles.btnSecondary}>
              Future-Ready Education
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
