import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css'; // Reusing base page styles

const ContactPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={`container ${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        Have questions about our institutional solutions? Let's discuss how we can partner together.
                    </p>
                </div>
            </header>

            <section className={styles.offerings} style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            padding: '2.5rem',
                            background: 'var(--white)',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-md)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-teal)' }}>
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>WhatsApp Support</h3>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--charcoal)' }}>Instant support for students and institutional inquiries.</p>
                            <a
                                href="http://wa.me/+918886945890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.primaryBtn}
                                style={{ display: 'inline-block' }}
                            >
                                Chat on WhatsApp
                            </a>
                        </div>

                        <div style={{
                            padding: '2.5rem',
                            background: 'var(--white)',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-md)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--primary-teal)' }}>
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>Email Us</h3>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--charcoal)' }}>For formal proposals and institutional collaborations.</p>
                            <a
                                href="mailto:buildwithtattva@gmail.com"
                                className={styles.primaryBtn}
                                style={{ display: 'inline-block' }}
                            >
                                buildwithtattva@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
