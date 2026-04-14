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
    >
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.splitLayout}>
          
          {/* Left Column: Text Content */}
          <div className={`${styles.textContent} ${inView ? styles.visible : ''}`}>
            <h1 className={styles.headline}>
              {['Make', 'Your', 'Institution', 'AI-Ready', '—', 'Before', 'It\'s', 'Too', 'Late'].map((word, i) => (
                <span key={i} className={styles.wordWrapper}>
                   <span className={styles.word} style={{ animationDelay: `${i * 0.15}s` }}>
                     {word}&nbsp;
                   </span>
                </span>
              ))}
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

          {/* Right Column: CSS Robot Graphic */}
          <div className={`${styles.graphicContent} ${inView ? styles.visible : ''}`}>
            
            {/* Floating Metric 1 */}
            <div className={`${styles.metricBadge} ${styles.metricTopLeft}`}>
              <div className={styles.metricIcon}>
                <svg viewBox="0 0 24 24" fill="#f4a261" stroke="none" style={{ width: '22px', height: '22px' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className={styles.metricText}>
                <strong>98%</strong>
                <p>Success Rate</p>
              </div>
            </div>

            {/* Floating Metric 2 */}
            <div className={`${styles.metricBadge} ${styles.metricTopRight}`}>
              <div className={styles.metricIcon}>
                <svg viewBox="0 0 24 24" fill="#5f4d38" stroke="none" style={{ width: '20px', height: '20px' }}>
                  <path d="M3 21h18v-2H3v2zM5 19h2v-9H5v9zm14 0h2v-9h-2v9zM9 19h6V5H9v14zm1-12h4v2h-4V7zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z" />
                </svg>
              </div>
              <div className={styles.metricText}>
                <strong>50+</strong>
                <p>Partner Schools</p>
              </div>
            </div>

            {/* Floating Metric 3 */}
            <div className={`${styles.metricStudents} ${styles.metricBottomLeft}`}>
              <div className={styles.avatars}>
                <div className={`${styles.avatar} ${styles.avatar1}`}></div>
                <div className={`${styles.avatar} ${styles.avatar2}`}></div>
                <div className={`${styles.avatar} ${styles.avatar3}`}></div>
              </div>
              <div className={styles.metricText}>
                <strong>10,000+</strong>
                <p>Students Impacted</p>
              </div>
            </div>

            {/* Pure CSS Robot */}
            <div className={styles.robotWrapper} style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
              <div className={styles.antenna}>
                <div className={styles.antennaStem}></div>
                <div className={styles.antennaBulb}></div>
              </div>
              
              <div className={styles.robotHead}>
                <div className={styles.visor}>
                  <div className={styles.eyeContainer}>
                    <div className={styles.eye}></div>
                    <div className={styles.eye}></div>
                  </div>
                </div>
              </div>

              <div className={styles.robotNeck}></div>
              
              <div className={styles.robotBody}>
                 {/* Representing the books from the screenshot with abstract CSS layers */}
                 <div className={styles.bookStack}>
                    <div className={styles.book} style={{backgroundColor: '#f4a261'}}></div>
                    <div className={styles.book} style={{backgroundColor: '#2a9d8f'}}></div>
                    <div className={styles.book} style={{backgroundColor: '#e76f51'}}></div>
                 </div>
                 <div className={styles.robotArm}></div>
                 <div className={styles.robotArmRight}></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
