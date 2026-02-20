import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './VisionSection.module.css';

const VisionSection = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className={styles.vision} ref={ref}>
            <div className={`container ${styles.container}`}>
                <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
                    <span className={styles.tagline}>Future-Ready Education</span>
                    <h2 className={styles.title}>Our Vision</h2>
                    <div className="vertical-accent">
                        <p className={styles.statement}>
                            To bridge the gap between traditional education systems and emerging AI-driven industries.
                        </p>
                    </div>
                    <p className={styles.description}>
                        We believe that every educational institution, whether a school or a college, deserves access
                        to the same cutting-edge technology that drives industry giants. Our mission is to democratize
                        AI and automation in academia.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
