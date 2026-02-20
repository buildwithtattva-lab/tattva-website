import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './OurSolutions.module.css';

const solutions = [
    {
        title: 'School Automation Solutions',
        desc: 'Streamlining academic and administrative workflows through structured automation systems.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M3 7v1h18V7l-9-4-9 4zm2 1h14v13H5V8zm4 13h2v-4H9v4zm4 0h2v-4h-2v4z" />
            </svg>
        ),
        link: '/for-schools'
    },
    {
        title: 'College Project & Innovation Support',
        desc: 'Delivering industry-aligned academic projects with structured mentorship and implementation guidance.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        ),
        link: '/for-colleges'
    },
    {
        title: 'AI Skill Development Programs',
        desc: 'Practical AI exposure for students and faculty, aligned with emerging industry standards.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
        ),
        link: '/services'
    }
];

const OurSolutions = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className={styles.solutions} ref={ref}>
            <div className="container">
                <h2 className={styles.title}>Our Solutions</h2>
                <div className={styles.grid}>
                    {solutions.map((sol, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${inView ? styles.visible : ''}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.iconWrapper}>{sol.icon}</div>
                            <h3>{sol.title}</h3>
                            <p>{sol.desc}</p>
                            <a href={sol.link} className={styles.learnMore}>Learn More →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurSolutions;
