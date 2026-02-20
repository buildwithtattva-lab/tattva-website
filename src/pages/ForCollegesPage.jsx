import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css';

const ForCollegesPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const offerings = [
        {
            title: 'End-to-End Final Year Project Support',
            items: ['Topic selection', 'Development', 'Documentation', 'Presentation training'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
            )
        },
        {
            title: 'AI/ML Lab Enablement',
            items: ['Project repository', 'Tech stack guidance', 'Deployment support'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66" />
                </svg>
            )
        },
        {
            title: 'Faculty Development Workshops',
            items: ['AI/ML sessions', 'Practical implementation training'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={`container ${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>Strategic Institutional Enablement & Innovation</h1>
                    <p className={styles.subtitle}>
                        Bridging the academic-industry gap through technology integration and AI-driven curriculum support.
                    </p>
                </div>
            </header>

            <section className={styles.valueProp}>
                <div className="container">
                    <div className={styles.propGrid}>
                        <div className={styles.propCard}>
                            <h3>Why Colleges Need Industry-Ready Projects</h3>
                            <p>Modern industries evolve faster than traditional syllabi. We provide the missing link to keep your students ahead.</p>
                        </div>
                        <div className={styles.propCard}>
                            <h3>The Practical Exposure Gap</h3>
                            <p>Most students lack hands-on experience with modern tech stacks. Our projects focus on real-world deployment.</p>
                        </div>
                        <div className={styles.propCard}>
                            <h3>How ProjectMinds Bridges the Gap</h3>
                            <p>We provide ready-to-use, AI-powered project ecosystems that integrate seamlessly into your curriculum.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.offerings}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>What We Offer</h2>
                    <div className={styles.offeringsGrid}>
                        {offerings.map((offering, index) => (
                            <div key={index} className={styles.offeringCard}>
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

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Transform Your Institution?</h2>
                        <p>Join 10+ colleges already partnering with ProjectMinds for future-ready education.</p>
                        <a
                            href="http://wa.me/+918886945890"
                            className={styles.primaryBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book Free Consultation
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ForCollegesPage;
