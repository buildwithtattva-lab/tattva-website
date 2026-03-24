import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15px shift
    const y = (e.clientY / window.innerHeight - 0.5) * 30; 
    setMousePos({ x, y });
  };

  return (
    <section
      className={styles.hero}
      ref={ref}
      style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      onMouseMove={handleMouseMove}
    >
      <div 
        className={styles.backgroundElements}
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <div className={styles.networkGrid}></div>
        <div className={`${styles.focusNode} ${styles.fn1}`}></div>
        <div className={`${styles.focusNode} ${styles.fn2}`}></div>
        <div className={`${styles.focusNode} ${styles.fn3}`}></div>
        <div className={`${styles.focusNode} ${styles.fn4}`}></div>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>
      
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.heroContent} ${inView ? styles.visible : ''}`}>
          
          <div className={styles.badgeWrapper}>
            <div className={styles.taglineBadge}>
              <span className={styles.badgePulse}></span> Empowering Future-Ready Institutions
            </div>
          </div>

          <h1 className={styles.headline}>
            Make Your Institution <span className={styles.highlightWord}>AI-Ready</span> — Before It’s Too Late
          </h1>
          
          <p className={styles.subheadline}>
            We help schools and colleges move beyond basic tools and actually integrate AI into learning, teaching, and operations.
          </p>

          <div className={styles.ctaButtons}>
            <a
              href="http://wa.me/+918886945890"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your Journey
            </a>
            <Link to="/services" className={styles.btnSecondary}>
              Explore Solutions
            </Link>
          </div>
        </div>
      </div>

      <div className={`${styles.scrollHint} ${inView ? styles.visibleHint : ''}`}>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default HeroSection;
