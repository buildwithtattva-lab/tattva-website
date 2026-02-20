import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import PopularProjects from '../components/PopularProjects';
import styles from './ForCollegesPage.module.css'; // Reusing some base styles

const ForStudentsPage = () => {
    const services = [
        {
            title: 'Individual Projects',
            desc: 'Get access to curated, ready-to-submit projects tailored to your syllabus.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-yellow)' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            )
        },
        {
            title: 'Starter Kits',
            desc: 'Pre-configured environments and boilerplates to kickstart your coding journey.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-yellow)' }}>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            )
        },
        {
            title: 'Mentorship',
            desc: '1-on-1 guidance from experts to help you understand every line of code.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-yellow)' }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        },
        {
            title: 'Technical Deep-Dives',
            desc: 'Structured technical walkthroughs for project implementation and final presentation prep.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-yellow)' }}>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
            )
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Kickstart Your Career with Real-World Projects</h1>
                    <p className={styles.subtitle}>
                        From starter kits to full-fledged final year projects, we provide everything a student needs to excel.
                    </p>
                </div>
            </header>

            <section className={styles.valueProp}>
                <div className="container">
                    <div className={styles.offeringsGrid}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.offeringCard}>
                                <div className={styles.offeringIcon}>{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Categories />
            <PopularProjects />

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Build Your Future?</h2>
                        <p>Explore our technology-driven career solutions and project repositories.</p>
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

export default ForStudentsPage;
