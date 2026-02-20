import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './WhyChoose.module.css';

const WhyChoose = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px', color: 'var(--primary-yellow)' }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 11 11 13 15 9" />
        </svg>
      ),
      title: 'Industry-Aligned Innovation',
      description: 'Educational solutions built on real-world industry requirements and standard tech stacks.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px', color: 'var(--primary-yellow)' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: 'Strategic Technology Access',
      description: 'High-impact alternative to building and maintaining in-house specialized experts.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px', color: 'var(--primary-yellow)' }}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      title: 'Scalable Model',
      description: 'Seamlessly support large batches of students with consistent project quality.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px', color: 'var(--primary-yellow)' }}>
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      ),
      title: 'Modern Tech Integration',
      description: 'Focused on AI, ML, Data Science, and modern software engineering practices.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px', color: 'var(--primary-yellow)' }}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
      title: 'Placement-Focused Outcomes',
      description: 'Equipping students with practical skills that modern employers demand.'
    }
  ];

  return (
    <section className={styles.whyChoose} ref={ref}>
      <div className={`container ${styles.whyChooseContainer}`}>
        <h2 className={styles.sectionTitle}>Why Partner With ProjectMinds?</h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${inView ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
