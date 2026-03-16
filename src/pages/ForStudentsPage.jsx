import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import PopularProjects from '../components/PopularProjects';
import styles from './ForStudentsPage.module.css';
import { useInView } from 'react-intersection-observer';

const ForStudentsPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const services = [
        {
            title: 'Individual Projects',
            desc: 'Get access to curated, ready-to-submit projects tailored to your syllabus.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            )
        },
        {
            title: 'Starter Kits',
            desc: 'Pre-configured environments and boilerplates to kickstart your coding journey.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px' }}>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                </svg>
            )
        },
        {
            title: 'Mentorship',
            desc: '1-on-1 guidance from experts to help you understand every line of code.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                </svg>
            )
        },
        {
            title: 'Technical Deep-Dives',
            desc: 'Structured technical walkthroughs for project implementation and presentation prep.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px' }}>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
            )
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={styles.backgroundElements}>
                    <div className={styles.techIcon}>&lt;/&gt;</div>
                    <div className={styles.techIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                            <rect x="9" y="9" width="6" height="6" />
                            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                        </svg>
                    </div>
                    <div className={styles.techIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
                            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                        </svg>
                    </div>
                </div>
                <div className={`${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>Build Real-World AI & Tech Projects That Stand Out</h1>
                    <p className={styles.subtitle}>
                        Explore industry-grade AI, software, and IoT projects designed to help you build practical skills and stand out in your career.
                    </p>
                </div>
            </header>

            <section className={styles.valueProp}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {services.map((service, index) => {
                            const { ref: cardRef, inView: cardInView } = useInView({ threshold: 0.1, triggerOnce: true });
                            return (
                                <div 
                                    key={index} 
                                    ref={cardRef}
                                    className={`${styles.offeringCard} ${cardInView ? styles.visible : ''} card-hover`}
                                    style={{ transitionDelay: `${index * 0.15}s` }}
                                >
                                    <div className={styles.offeringIcon}>{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Categories />
            <PopularProjects />

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Start Building Your First AI Project</h2>
                        <p>Join Tattva and gain real-world experience through hands-on projects designed for the future.</p>
                        <a
                            href="https://wa.me/918886945890"
                            className={styles.primaryBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explore Projects
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ForStudentsPage;
