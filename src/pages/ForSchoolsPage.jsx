import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css'; // Reusing base page styles

const ForSchoolsPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const sections = [
        {
            title: 'School Process Automation',
            items: [
                'Attendance system automation',
                'Report card generation systems',
                'Admin workflow digitization',
                'Fee tracking systems',
                'Basic ERP guidance',
                'Chatbot for student queries'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            ),
            tag: 'Institutional Automation for Modern Schools'
        },
        {
            title: 'AI Awareness Programs for Students',
            items: [
                'Introduction to AI workshops',
                'Hands-on beginner AI projects',
                'Responsible AI usage training',
                'Career guidance in AI/ML'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            )
        },
        {
            title: 'Teacher AI Enablement',
            items: [
                'How teachers can use AI tools',
                'AI for lesson planning',
                'AI for assessment creation',
                'AI productivity workshops'
            ],
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
                    <h1 className={styles.title}>Future-Ready Schooling with AI & Automation</h1>
                    <p className={styles.subtitle}>
                        Empowering schools to digitize operations and prepare the next generation for an AI-driven world.
                    </p>
                </div>
            </header>

            <section className={styles.offerings}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {sections.map((section, index) => (
                            <div key={index} className={styles.offeringCard}>
                                <div className={styles.offeringIcon} style={{ marginBottom: '1.5rem', display: 'block' }}>{section.icon}</div>
                                {section.tag && <span style={{ color: 'var(--primary-yellow)', fontWeight: '700', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>{section.tag}</span>}
                                <h3>{section.title}</h3>
                                <ul>
                                    {section.items.map((item, i) => (
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
                        <h2>Prepare Your School for the Future</h2>
                        <p>Schedule a discussion with our automation consultants.</p>
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

export default ForSchoolsPage;
