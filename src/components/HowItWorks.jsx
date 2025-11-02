import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      number: '1',
      title: 'Share Your Idea',
      description: 'or pick from our trending list.'
    },
    {
      number: '2',
      title: 'We Develop & Test',
      description: 'complete with code & output.'
    },
    {
      number: '3',
      title: 'Get Report + PPT',
      description: 'ready for review & submission.'
    },
    {
      number: '4',
      title: 'Present with Confidence',
      description: 'viva support included!'
    }
  ];

  return (
    <section className={styles.howItWorks} ref={ref}>
      <div className={`container ${styles.howItWorksContainer}`}>
        <h2 className={styles.sectionTitle}>How We Build Your Project in 4 Simple Steps 🚀</h2>
        
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`${styles.timelineStep} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className={styles.connector}></div>}
            </div>
          ))}
        </div>
        
        <div className={styles.ctaWrapper}>
          <a 
            href="http://wa.me/+918886945890" 
            className={styles.startBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start My Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
