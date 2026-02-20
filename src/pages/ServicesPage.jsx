import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css'; // Reusing base page styles

const ServicesPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const serviceVerticals = [
        {
            title: 'School Automation & ERP Guidance',
            items: [
                'Custom administrative workflow digitization',
                'Attendance & fee management automation',
                'Report card & academic record systems',
                'ERP selection & integration advisory',
                'School-parent communication portals'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M3 21h18M3 7v1h18V7l-9-4-9 4zm2 1h14v13H5V8zm4 13h2v-4H9v4zm4 0h2v-4h-2v4z" />
                </svg>
            ),
            tag: 'Admin Productivity'
        },
        {
            title: 'College Innovation & Lab Setup',
            items: [
                'Industry-standard AI/ML lab configuration',
                'Project repository management',
                'Deployment of cloud architectures for education',
                'Open-source ecosystem integration',
                'Research & prototyping support'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66" />
                </svg>
            ),
            tag: 'Technical Infrastructure'
        },
        {
            title: 'Faculty AI Enablement Workshops',
            items: [
                'AI tools for automated lesson planning',
                'Assessment creation using LLMs',
                'Digital literacy & AI Ethics for educators',
                'Productivity hacks for academic staff',
                'Hands-on technical upskilling'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            tag: 'Capability Building'
        },
        {
            title: 'Research Paper Assistance',
            items: [
                'IEEE, Scopus, & Springer paper guidance',
                'Technical writing & plagiarism checks',
                'Literature review & data analysis support',
                'Conference & Journal selection advisory',
                'Formatting & submission assistance'
            ],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: 'var(--primary-yellow)' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
            tag: 'Academic Excellence'
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={`container ${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>Strategic Technology Services</h1>
                    <p className={styles.subtitle}>
                        Comprehensive technical enablement and automation solutions for modern academic institutions.
                    </p>
                </div>
            </header>

            <section className={styles.offerings}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {serviceVerticals.map((service, index) => (
                            <div key={index} className={styles.offeringCard}>
                                <div className={styles.offeringIcon}>{service.icon}</div>
                                <span style={{ color: 'var(--primary-yellow)', fontWeight: '700', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>{service.tag}</span>
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
                        <h2>Tailored Solutions for Your Institution</h2>
                        <p>Every institution is unique. Let's discuss a customized enablement roadmap.</p>
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

export default ServicesPage;
