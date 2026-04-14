import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ServicesPage.module.css';

// Custom generated asset
import heroBg from '/Users/prasad/.gemini/antigravity/brain/a02cb9b0-67ac-4f59-85f0-04b6818e6fa7/services_hero_bg_1775966544341.png';

const ServicesPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const serviceCategories = [
        {
            title: 'AI Integration for Schools',
            desc: 'Transforming K-12 environments into future-ready innovation hubs with seamless AI integration and automation.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 7v1h18V7l-9-4-9 4zm2 1h14v13H5V8zm4 13h2v-4H9v4zm4 0h2v-4h-2v4z" />
                </svg>
            )
        },
        {
            title: 'AI & Lab Projects for Colleges',
            desc: 'Empowering students with industry-grade AI project frameworks and real-world ML lab ecosystems.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v8M12 14v8M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
            )
        },
        {
            title: 'Student Project Ecosystem',
            desc: 'Bridge the gap between theory and practice with our curated AI starter kits and professional mentorship.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                </svg>
            )
        },
        {
            title: 'Faculty Development',
            desc: 'Hands-on training for educators to master AI tools and confidently implement modern tech in the classroom.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z" />
                </svg>
            )
        },
        {
            title: 'Institutional Automation',
            desc: 'Optimize administrative workflows with intelligent attendance, scheduling, and automated reporting systems.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            )
        },
        {
            title: 'School Faculty Recruitment',
            desc: 'Identifying and placing top-tier subject experts and leadership talent to elevate institutional standards.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                </svg>
            ),
            link: '/hiring'
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            {/* Premium Hero Section */}
            <header className={styles.hero}>
                <div 
                    className={styles.heroBg} 
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>
                <div className={styles.heroOverlay}></div>
                <div className={`${styles.heroContent} ${headerInView ? styles.visible : ''}`} ref={headerRef}>
                    <h1 className={styles.heroTitle}>Our Services</h1>
                    <div className={styles.breadcrumb}>
                        <Link to="/">Home</Link>
                        <span>&gt;</span>
                        <span className={styles.active}>Our Services</span>
                    </div>
                </div>
            </header>

            {/* Service Grid Section */}
            <section className={styles.offeringsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.label}>Featured Services</span>
                        <h2 className={styles.mainTitle}>Make Your Institution AI-Ready — Before It’s Too Late</h2>
                    </div>

                    <div className={`${styles.offeringsGrid}`} ref={gridRef}>
                        {serviceCategories.map((service, index) => {
                            const Card = (
                                <div 
                                    className={`${styles.offeringCard} ${gridInView ? styles.visible : ''}`}
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                >
                                    <div className={styles.iconTab}>
                                        <div className={styles.iconWrapper}>{service.icon}</div>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                    <div className={styles.arrowBtn}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            );

                            return service.link ? (
                                <Link to={service.link} key={index} className={styles.cardLink}>
                                    {Card}
                                </Link>
                            ) : (
                                <div key={index}>{Card}</div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServicesPage;

