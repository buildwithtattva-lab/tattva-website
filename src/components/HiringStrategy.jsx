import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './HiringStrategy.module.css';

const HiringStrategy = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const steps = [
        {
            num: '01',
            title: 'Curated Identification',
            desc: 'Sourcing the top 1% of teaching talent with specialized expertise.'
        },
        {
            num: '02',
            title: 'Expert Interview Screening',
            desc: 'Candidates undergo rigorous interviews conducted by highly experienced educators and professionals.'
        },
        {
            num: '03',
            title: 'Institutional Placement',
            desc: 'Connecting future-ready teachers with elite global institutions.'
        }
    ];

    return (
        <section className={styles.hiringSection} ref={ref}>
            <div className={`container ${styles.content}`}>
                <div className={styles.header}>
                    <span className={styles.badge}>QUICK STEP PLAN</span>
                    <h2 className={styles.title}>
                        Our Hiring Strategy for <br/> School Teachers for Top Schools
                    </h2>
                </div>

                <div className={`${styles.stepsGrid} ${inView ? styles.visible : ''}`}>
                    {steps.map((step, i) => (
                        <div key={i} className={styles.stepCard}>
                            <div className={styles.numberPill}>{step.num}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HiringStrategy;
