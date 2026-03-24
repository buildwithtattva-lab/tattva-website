import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './WhyChoose.module.css';

const WhyChoose = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Problem-First Approach',
      description: 'We focus on solving specific institutional challenges rather than offering generic training programs.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="10" y1="8" x2="3" y2="15" />
          <polyline points="3 10 3 15 8 15" />
        </svg>
      ),
      title: 'Real-World Implementation',
      description: 'Our emphasis is on practical applications of AI in education, operations, and problem solving.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Comprehensive Ecosystem Coverage',
      description: 'We empower the entire ecosystem: students, faculty, and institutional administrative systems.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      ),
      title: 'Ethical & Responsible AI',
      description: 'Every program emphasizes the ethical and socially responsible usage of AI technologies.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      title: 'Long-Term Transformation',
      description: 'Designed for sustained institutional evolution rather than one-time workshops.'
    }
  ];

  return (
    <section className={styles.whyChoose} ref={ref}>
      <div className={`container ${styles.splitContainer}`}>
        
        {/* Left Sticky Sidebar */}
        <div className={styles.stickySidebar}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>Our Differentiators</span>
          </div>
          <h2 className={styles.sectionTitle}>What Makes Tattva Different</h2>
          <p className={styles.sidebarText}>
            We don’t just implement generic tools. Tattva engineers long-term, ethical, and problem-first AI transformations tailored for your entire educational ecosystem.
          </p>
        </div>

        {/* Right Scrolling List */}
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureItem} ${inView ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
