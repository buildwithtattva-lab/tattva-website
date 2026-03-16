import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      number: '1',
      title: 'Strategy Consultation',
      description: 'We analyze your current education ecosystem and goals.'
    },
    {
      number: '2',
      title: 'Technology Integration',
      description: 'Customizing AI and automation tools for your institution.'
    },
    {
      number: '3',
      title: 'Institutional Enablement',
      description: 'Training faculty and setting up project repositories.'
    },
    {
      number: '4',
      title: 'Future-Ready Outcomes',
      description: 'Sustained support for placement-oriented excellence.'
    }
  ];

  return (
    <section className={styles.howItWorks} ref={ref}>
      <div className={`container ${styles.howItWorksContainer}`}>
        <h2 className={styles.sectionTitle}>How Institutions Work With Tattva</h2>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.timelineStep} ${inView ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
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
            Schedule Institutional Discussion
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
