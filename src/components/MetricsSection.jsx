import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './MetricsSection.module.css';

const metrics = [
    { label: 'Projects Delivered', value: '150+' },
    { label: 'Technologies Implemented', value: '10+' },
    { label: 'Placement-Oriented Framework', value: 'Designed to support career readiness' },
    { label: 'End-to-End Support', value: 'From planning to implementation' }
];

const MetricsSection = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className={styles.metrics} ref={ref}>
            <div className={`container ${styles.metricsContainer}`}>
                <div className={styles.metricsGrid}>
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className={`${styles.metricCard} ${inView ? styles.visible : ''}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <h3 className={`${styles.value} ${metric.value.length > 5 ? styles.textValue : ''}`}>
                                {metric.value}
                            </h3>
                            <p className={styles.label}>{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MetricsSection;
