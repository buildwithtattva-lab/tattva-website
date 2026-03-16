import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './MetricsSection.module.css';

const CountUp = ({ end, duration = 2000, startAnimation }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    useEffect(() => {
        if (!startAnimation) return;

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            
            if (currentCount !== countRef.current) {
                setCount(currentCount);
                countRef.current = currentCount;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, startAnimation]);

    return <span>{count}</span>;
};

const metrics = [
    { label: 'Projects Delivered', value: 150, suffix: '+' },
    { label: 'Technologies Implemented', value: 10, suffix: '+' },
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
                            <h3 className={`${styles.value} ${typeof metric.value === 'string' && metric.value.length > 5 ? styles.textValue : ''}`}>
                                {typeof metric.value === 'number' ? (
                                    <>
                                        <CountUp end={metric.value} startAnimation={inView} />
                                        {metric.suffix}
                                    </>
                                ) : (
                                    metric.value
                                )}
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
