import React from 'react';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: founderRef, inView: founderInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: principlesRef, inView: principlesInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: focusRef, inView: focusInView } = useInView({ threshold: 0.2, triggerOnce: true });

    const principles = [
        {
            title: 'Practical Learning',
            desc: 'Students learn best by building real projects.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            )
        },
        {
            title: 'Future-Ready Education',
            desc: 'We align education with emerging technologies.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            )
        },
        {
            title: 'Institutional Empowerment',
            desc: 'We support schools and colleges in adopting modern tools.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            )
        },
        {
            title: 'Accessible Innovation',
            desc: 'Advanced technologies should be accessible to all institutions.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                    <path d="M12 2v8M12 14v8M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
            )
        }
    ];

    const focusAreas = [
        { title: 'AI Integration for Education', desc: 'Custom LLMs and literacy programs.' },
        { title: 'Industry-Ready Projects', desc: 'Building portfolios that get students hired.' },
        { title: 'Faculty Tech Training', desc: 'Upskilling educators for the AI era.' },
        { title: 'Digital Transformation', desc: 'End-to-end institutional automation.' }
    ];

    return (
        <div className={styles.aboutPage}>
            <Navigation />

            {/* Hero Section */}
            <header className={styles.hero} ref={heroRef}>
                <div className={styles.backgroundElements}>
                    <div className={styles.glowDot}></div>
                    <div className={styles.glowDot}></div>
                    <div className={styles.glowDot}></div>
                </div>
                <div className={`container ${styles.headerContent} ${heroInView ? styles.visible : ''}`}>
                    <h1 className={styles.heroTitle}>
                        Transforming Education with AI & Real-World Innovation
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Tattva helps educational institutions adopt AI, build real-world learning ecosystems, and prepare students for a rapidly evolving technology landscape.
                    </p>
                </div>
            </header>

            {/* Our Mission */}
            <section className={styles.missionSection} ref={missionRef}>
                <div className="container">
                    <div className={`${styles.missionContent} ${missionInView ? styles.visible : ''}`}>
                        <h2 className={styles.sectionTitle}>Our Mission</h2>
                        <p className={styles.missionText}>
                            To make advanced technologies like AI accessible to every educational institution by providing practical tools, training, and innovation frameworks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder's Note */}
            <section className={styles.founderSection} ref={founderRef}>
                <div className="container">
                    <div className={`${styles.founderContent} ${founderInView ? styles.visible : ''}`}>
                        <div className={styles.founderImage}>
                            <div className={styles.founderAvatar}>👨‍💻</div>
                        </div>
                        <div className={styles.founderText}>
                            <h2 className={styles.sectionTitle}>Founder's Note</h2>
                            <p className={styles.founderQuote}>
                                "I'm Prasad, founder of Tattva."
                            </p>
                            <p className={styles.founderMessage}>
                                I started Tattva after noticing a growing gap between what students learn in classrooms and the skills demanded by the technology industry.
                            </p>
                            <p className={styles.founderMessage}>
                                Our goal is simple — help institutions bridge this gap through AI, real-world projects, and modern technology ecosystems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Principles */}
            <section className={styles.gridSection} ref={principlesRef}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Our Core Principles</h2>
                    <div className={styles.principlesGrid}>
                        {principles.map((p, i) => (
                            <div 
                                key={i} 
                                className={`${styles.card} ${principlesInView ? styles.visible : ''}`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <div className={styles.infoIcon}>{p.icon}</div>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Focus Areas */}
            <section className={`${styles.gridSection} ${styles.alt}`} ref={focusRef}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>What We Focus On</h2>
                    <div className={styles.focusGrid}>
                        {focusAreas.map((f, i) => (
                            <div 
                                key={i} 
                                className={`${styles.card} ${focusInView ? styles.visible : ''}`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Bring AI Innovation to Your Institution</h2>
                        <p className={styles.ctaText}>
                            Partner with Tattva to prepare your students for the future of technology.
                        </p>
                        <a
                            href="https://wa.me/918886945890"
                            className={`${styles.whatsappBtn} btn-hover`}
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

export default AboutPage;


