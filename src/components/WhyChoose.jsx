import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './WhyChoose.module.css';

const WhyChoose = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: '✅',
      title: 'Complete Package',
      description: 'Code, Report, PPT — all included.'
    },
    {
      icon: '⚙️',
      title: 'Customizable Projects',
      description: 'Tailored for your syllabus and department.'
    },
    {
      icon: '⏱️',
      title: 'Fast Delivery',
      description: 'Ready within 1 week.'
    },
    {
      icon: '💬',
      title: 'Support Till Viva',
      description: 'We guide you till your presentation day.'
    }
  ];

  return (
    <section className={styles.whyChoose} ref={ref}>
      <div className={`container ${styles.whyChooseContainer}`}>
        <h2 className={styles.sectionTitle}>Why Students Trust ProjectMinds 💡</h2>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${styles.featureCard} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.featureIcon}>{feature.icon}</span>
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
