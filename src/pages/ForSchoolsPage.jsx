import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForSchoolsPage.module.css';

const ForSchoolsPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });
    
    // For staggered card entrance
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const offerings = [
        {
            title: 'AI-Powered School Operations',
            items: [
                'Attendance automation',
                'Smart timetable generation',
                'AI-based admin reporting',
                'Smart student queries'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            )
        },
        {
            title: 'AI Literacy for Students',
            items: [
                'Introduction to AI concepts',
                'Hands-on beginner AI projects',
                'Responsible AI awareness',
                'Future-tech career paths'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            )
        },
        {
            title: 'AI for Modern Teaching',
            items: [
                'AI lesson planning tools',
                'AI-assisted assessment',
                'Teacher productivity tools',
                'Automated grading support'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            )
        },
        {
            title: 'AI Innovation Labs',
            items: [
                'School AI clubs',
                'Student innovation projects',
                'Real-world problem solving',
                'Inter-school AI challenges'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
            )
        }
    ];

    const steps = [
        { title: 'Assess Readiness', desc: 'We evaluate your current digital maturity.' },
        { title: 'Implement Tools', desc: 'Secure deployment of AI operations tools.' },
        { title: 'Train Teachers', desc: 'Practical workshops for faculty adoption.' },
        { title: 'Enable Projects', desc: 'Launching student AI innovation labs.' }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={styles.backgroundElements}>
                    <div className={styles.grid}></div>
                    <div className={styles.nodes}>
                        <div className={styles.node}></div>
                        <div className={styles.node}></div>
                        <div className={styles.node}></div>
                    </div>
                </div>
                <div className={`container ${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>AI-Powered Schools for the Future</h1>
                    <p className={styles.subtitle}>
                        Tattva helps schools integrate AI into classrooms, automate administrative workflows, and equip students with essential AI literacy for the future.
                    </p>
                </div>
            </header>

            <section className={styles.offerings} ref={gridRef}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {offerings.map((offering, index) => (
                            <div 
                                key={index} 
                                className={`${styles.offeringCard} ${gridInView ? styles.visible : ''} card-hover ${index % 2 === 0 ? styles.slideLeft : styles.slideRight}`}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                            >
                                <div className={styles.offeringIcon}>{offering.icon}</div>
                                <h3>{offering.title}</h3>
                                <ul>
                                    {offering.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.process}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <h2>How Tattva Works with Schools</h2>
                        <p>Our systematic approach to AI integration</p>
                    </div>
                    <div className={styles.processGrid}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.processStep}>
                                <div className={styles.stepNumber}>{index + 1}</div>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Bring AI to Your School</h2>
                        <p>Partner with Tattva to prepare your students for an AI-driven future.</p>
                        <a
                            href="https://wa.me/918886945890"
                            className={styles.primaryBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book a Consultation
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ForSchoolsPage;
