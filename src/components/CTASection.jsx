import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './CTASection.module.css';

const CTASection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className={styles.ctaSection} ref={ref}>
      <div className={`container ${styles.ctaContainer}`}>
        <div className={`${styles.ctaContent} ${inView ? styles.visible : ''}`}>
          <h2 className={styles.ctaHeadline}>Build a Future-Ready Institution Today.</h2>
          <p className={styles.ctaSubtext}>
            Consult with our experts to integrate AI and automation into your academic workflow.
          </p>

          <div className={styles.ctaButtons}>
            <a
              href="http://wa.me/+918886945890"
              className={styles.btnWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Consultation
            </a>
            <a href="/contact" className={styles.btnContact}>
              Request Institutional Proposal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
