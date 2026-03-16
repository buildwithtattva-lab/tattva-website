import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ServicesPage.module.css';

const ServicesPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const serviceCategories = [
        {
            title: 'AI Integration for Schools',
            items: [
                'AI literacy programs',
                'Classroom AI tools',
                'School automation systems'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 7v1h18V7l-9-4-9 4zm2 1h14v13H5V8zm4 13h2v-4H9v4zm4 0h2v-4h-2v4z" />
                </svg>
            )
        },
        {
            title: 'AI & Industry Projects for Colleges',
            items: [
                'Final year project ecosystems',
                'AI/ML lab enablement',
                'Industry-ready project frameworks'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v8M12 14v8M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
            )
        },
        {
            title: 'Student Project Ecosystem',
            items: [
                'Real-world AI projects',
                'Starter kits',
                'Mentorship support'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                </svg>
            )
        },
        {
            title: 'Faculty Development',
            items: [
                'AI training workshops',
                'Modern tech stack training',
                'AI-assisted teaching tools'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z" />
                </svg>
            )
        },
        {
            title: 'Institutional Automation',
            items: [
                'Attendance automation',
                'Digital workflow systems',
                'AI-driven reporting tools'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            )
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={styles.backgroundElements}>
                    <div className={styles.circuitLine}></div>
                    <div className={styles.circuitLine}></div>
                    <div className={styles.chipNode}></div>
                    <div className={styles.chipNode}></div>
                </div>
                <div className={`${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>AI & Innovation Solutions for Educational Institutions</h1>
                    <p className={styles.subtitle}>
                        Tattva provides AI-powered education programs, automation tools, and real-world project ecosystems for schools, colleges, and students.
                    </p>
                </div>
            </header>

            <section className={styles.offerings} ref={gridRef}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {serviceCategories.map((service, index) => (
                            <div 
                                key={index} 
                                className={`${styles.offeringCard} ${gridInView ? styles.visible : ''}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.offeringIcon}>{service.icon}</div>
                                <h3>{service.title}</h3>
                                <ul>
                                    {service.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Innovate Your Institution?</h2>
                        <p>Join Tattva in building the future of intelligence in education.</p>
                        <a
                            href="https://wa.me/918886945890"
                            className={styles.primaryBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Schedule a Consultation
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServicesPage;
