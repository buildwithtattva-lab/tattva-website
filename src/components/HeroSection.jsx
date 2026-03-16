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
      <div className={styles.backgroundElements}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.aiGraph}>
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--primary-teal)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--primary-teal)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Connection Lines */}
            <g className={styles.connections}>
              <path d="M200,150 L400,100 L600,200 L400,300 Z" />
              <path d="M800,100 L1000,250 L900,450 L700,350 Z" />
              <path d="M100,500 L300,450 L250,650 L50,600 Z" />
              <path d="M600,600 L850,550 L1000,700 L750,750 Z" />
              <path d="M400,300 L700,350 L600,600 L300,450 Z" />
            </g>
            {/* Knowledge Nodes */}
            <g className={styles.nodes}>
              <circle cx="200" cy="150" r="6" />
              <circle cx="400" cy="100" r="8" />
              <circle cx="600" cy="200" r="6" />
              <circle cx="400" cy="300" r="10" />
              <circle cx="800" cy="100" r="6" />
              <circle cx="1000" cy="250" r="8" />
              <circle cx="900" cy="450" r="6" />
              <circle cx="700" cy="350" r="8" />
              <circle cx="100" cy="500" r="6" />
              <circle cx="300" cy="450" r="8" />
              <circle cx="250" cy="650" r="6" />
              <circle cx="50" cy="600" r="6" />
              <circle cx="600" cy="600" r="8" />
              <circle cx="850" cy="550" r="6" />
              <circle cx="1000" cy="700" r="8" />
              <circle cx="750" cy="750" r="6" />
            </g>
          </svg>
        </div>
      </div>
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.heroContent} ${inView ? styles.visible : ''}`}>
          <div className={styles.taglineBadge}>
            <span className={styles.badgePulse}></span>
            The Core of Intelligent Education
          </div>
          <h1 className={styles.headline}>
            <span className={styles.aiHighlight}>AI</span> Foundations for Future-Ready Schools & Colleges
          </h1>
          <p className={styles.subheadline}>
            Tattva helps educational institutions adopt AI, automation, and industry-aligned learning so students graduate ready for the real world.
          </p>

          <div className={styles.ctaButtons}>
            <a
              href="http://wa.me/+918886945890"
              className={`${styles.btnPrimary} btn-hover`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your AI Journey
            </a>
            <Link to="/services" className={`${styles.btnSecondary} btn-hover`}>
              Explore Solutions
            </Link>
          </div>
          <div className={styles.trustSignal}>
            Helping institutions adopt AI and real-world learning
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
