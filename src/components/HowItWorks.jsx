
import { useInView } from 'react-intersection-observer';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      number: '1',
      title: 'Engage',
      description: 'We connect directly with your institution to understand your vision.'
    },
    {
      number: '2',
      title: 'Understand',
      description: 'Identifying specific challenges and gaps in your current system.'
    },
    {
      number: '3',
      title: 'Identify',
      description: 'Pinpointing high-impact areas where AI can create real value.'
    },
    {
      number: '4',
      title: 'Design',
      description: 'Implementing custom AI solutions and outcome-driven learning systems.'
    }
  ];

  return (
    <section className={styles.howItWorks} ref={ref}>
      <div className={`container ${styles.howItWorksContainer}`}>
        <h2 className={styles.sectionTitle}>Our Consultative & Problem-First Approach</h2>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.timelineStep} ${inView ? styles.visible : ''}`}
              style={{ transitionDelay: `${index * 0.25}s` }}
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
