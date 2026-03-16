import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css';

const ForCollegesPage = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: propRef, inView: propInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const propCards = [
        {
            title: 'The Industry Skills Gap',
            desc: 'Traditional curricula move slower than modern technology. Students need real-world project experience to stay competitive.'
        },
        {
            title: 'Lack of Hands-On Experience',
            desc: 'Many students graduate without building real applications. Practical AI and software projects close this gap.'
        },
        {
            title: "Tattva’s AI Project Ecosystem",
            desc: 'We provide ready-to-deploy AI and software project frameworks integrated directly into your curriculum.'
        }
    ];

    const offerings = [
        {
            title: 'Industry-Grade Final Year Projects',
            items: ['Topic selection', 'Development', 'Documentation', 'Presentation training'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            )
        },
        {
            title: 'AI & Machine Learning Lab Setup',
            items: ['Curated AI project repository', 'Modern tech stack guidance', 'Deployment & demo support'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v8M12 14v8M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                </svg>
            )
        },
        {
            title: 'AI Training for Faculty',
            items: ['AI/ML sessions', 'Hands-on implementation', 'Teaching with AI tools'],
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
            )
        }
    ];

    const steps = [
        { title: 'Assess Needs', desc: 'Evaluating curriculum alignment.' },
        { title: 'Deploy Frameworks', desc: 'Secure project repository setup.' },
        { title: 'Train Faculty', desc: 'Practical implementation workshops.' },
        { title: 'Guide Students', desc: 'Expert-led project development.' }
    ];

    const impacts = [
        { title: 'Portfolio Excellence', desc: 'Industry-ready student projects.' },
        { title: 'Modern Infrastructure', desc: 'State-of-the-art AI labs.' },
        { title: 'Placement Ready', desc: 'Students equipped for tech careers.' },
        { title: 'Digital Upskilling', desc: 'Faculty experts in emerging AI.' }
    ];

    return (
        <div className={styles.page}>
            <Navigation />

            <header className={styles.header} ref={headerRef}>
                <div className={styles.backgroundElements}>
                    <div className={styles.shape1}></div>
                    <div className={styles.shape2}></div>
                    <div className={styles.shape3}></div>
                </div>
                <div className={`container ${styles.headerContent} ${headerInView ? styles.visible : ''}`}>
                    <h1 className={styles.title}>AI & Industry Projects for Future-Ready Colleges</h1>
                    <p className={styles.subtitle}>
                        Tattva helps colleges integrate AI, build real-world student projects, and equip faculty with modern technology skills aligned with industry needs.
                    </p>
                </div>
            </header>

            <section className={styles.valueProp} ref={propRef}>
                <div className="container">
                    <div className={styles.propGrid}>
                        {propCards.map((card, index) => (
                            <div 
                                key={index} 
                                className={`${styles.propCard} ${propInView ? styles.visible : ''} card-hover`}
                                style={{ transitionDelay: `${index * 0.15}s` }}
                            >
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.offerings} ref={gridRef}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <h2>What We Offer</h2>
                        <p>Specialized institutional support for technical excellence</p>
                    </div>
                    <div className={styles.offeringsGrid}>
                        {offerings.map((offering, index) => (
                            <div 
                                key={index} 
                                className={`${styles.offeringCard} ${gridInView ? styles.visible : ''} card-hover`}
                                style={{ transitionDelay: `${index * 0.2}s` }}
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
                <div className="container" ref={useInView({ threshold: 0.1, triggerOnce: true }).ref}>
                    <div className={styles.sectionTitle}>
                        <h2>How Tattva Works with Colleges</h2>
                        <p>A systematic roadmap for institutional innovation</p>
                    </div>
                    <div className={styles.processGrid}>
                        {steps.map((step, index) => {
                            const { ref: stepRef, inView: stepInView } = useInView({ threshold: 0.1, triggerOnce: true });
                            return (
                                <div 
                                    key={index} 
                                    ref={stepRef}
                                    className={`${styles.processStep} ${stepInView ? styles.visible : ''}`}
                                    style={{ transitionDelay: `${index * 0.2}s` }}
                                >
                                    <div className={styles.stepNumber}>{index + 1}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.impact}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <h2>Impact for Colleges</h2>
                        <p>The Tattva advantage for your institution</p>
                    </div>
                    <div className={styles.impactGrid}>
                        {impacts.map((impact, index) => (
                            <div key={index} className={styles.impactItem}>
                                <div className={styles.impactIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h4>{impact.title}</h4>
                                <p>{impact.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Bring Industry-Ready AI Education to Your College</h2>
                        <p>Tattva helps institutions prepare students for real-world technology careers.</p>
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

export default ForCollegesPage;
