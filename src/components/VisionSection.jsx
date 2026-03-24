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
                            Tattva aims to bridge the gap between traditional education and modern technological advancements by making AI accessible, practical, and impactful for institutions.
                        </p>
                    </div>
                    <p className={styles.description}>
                        We don’t just teach AI — we help institutions adopt, integrate, and evolve with it.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VisionSection;
