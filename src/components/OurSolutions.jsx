import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './OurSolutions.module.css';

const solutions = [
    {
        title: 'AI Awareness & Education',
        desc: 'Introducing students, teachers, and institutions to AI beyond basic tools. Understanding real-world applications and global trends.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
        )
    },
    {
        title: 'Student Training & Skill Development',
        desc: 'Training students to use AI effectively in learning and problem solving with industry-relevant skill development.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        )
    },
    {
        title: 'Faculty & Teacher Enablement',
        desc: 'Empowering educators to integrate AI into teaching, lesson planning, and automated content creation.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        title: 'Institutional Solutions & Automation',
        desc: 'Helping institutions streamline operations, smart attendance, and data-driven decision making using AI.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    },
    {
        title: 'AI Workshops & Programs',
        desc: 'Structured programs for practical learning, ethical use of AI, and responsible AI practices.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    }
];

const OurSolutions = () => {
    const { ref, inView } = useInView({ 
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '-50px'
    });

    return (
        <section className={styles.solutions} ref={ref}>
            <div className="container">
                <h2 className={styles.title}>What Tattva Enables</h2>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurSolutions;
