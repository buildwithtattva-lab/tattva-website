import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForSchoolsPage.module.css';

// Import local assets
import heroBg from '../assets/education/school_hero.png';
import detailImg from '../assets/education/school_detail.png';

const ForSchoolsPage = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const offerings = [
        {
            title: 'AI Operations',
            desc: 'Automate attendance, timetable generation, and administrative reporting with intelligent workflows.'
        },
        {
            title: 'AI Literacy',
            desc: 'Equip students with hands-on AI project skills and ethical AI awareness for the future.'
        },
        {
            title: 'Teacher Tools',
            desc: 'Empower faculty with AI-driven lesson planning and automated assessment support.'
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            {/* Hero Section - Vistario Inspired */}
            <header className={styles.hero} ref={heroRef}>
                <div className={styles.heroBgWrapper}>
                    <img src={heroBg} alt="Modern Classroom" className={styles.heroBg} />
                    <div className={styles.overlay}></div>
                </div>
                <div className={`container ${styles.heroContent} ${heroInView ? styles.visible : ''}`}>

                    <h1 className={styles.title}>AI-Powered Schools <br/> for the Future</h1>
                    <p className={styles.subtitle}>
                        Transforming traditional K-12 environments into future-ready innovation hubs with seamless AI integration.
                    </p>
                    <div className={styles.heroActions}>
                        <a href="https://wa.me/918886945890" className={styles.primaryBtn}>Initialize Integration</a>
                        <a href="#offerings" className={styles.secondaryBtn}>Explore Features</a>
                    </div>
                </div>
            </header>

            {/* Content Section - Two Column Styling */}
            <section className={styles.detailSection} ref={section1Ref} id="offerings">
                <div className={`container ${styles.detailContainer}`}>
                    <div className={`${styles.imageCol} ${section1InView ? styles.visible : ''}`}>
                        <div className={styles.imageCard}>
                            <img src={detailImg} alt="Students using AI" />
                            <div className={styles.imageDecoration}></div>
                        </div>
                    </div>
                    <div className={`${styles.textCol} ${section1InView ? styles.visible : ''}`}>
                        <span className={styles.sectionBadge}>Essence of Growth</span>
                        <h2 className={styles.sectionTitle}>Experience infinite learning and endless growth</h2>
                        <p className={styles.sectionDesc}>
                            Tattva helps schools move beyond basic digital tools. we actually integrate AI into learning, teaching, and operations to create a truly intelligent ecosystem.
                        </p>
                        
                        <div className={styles.miniFeatures}>
                            {offerings.map((item, i) => (
                                <div key={i} className={styles.miniItem}>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Process Section */}
            <section className={styles.processSection} ref={gridRef}>
                <div className="container">
                    <div className={styles.centeredHeader}>
                        <h2 className={styles.titleLarge}>Your Path to AI-Readiness</h2>
                        <p>A simple, structured plan to modernize your institution</p>
                    </div>

                    <div className={`${styles.processGrid} ${gridInView ? styles.visible : ''}`}>
                        {[
                            { step: '01', title: 'Readiness Audit', desc: 'Detailed evaluation of your current infrastructure.' },
                            { step: '02', title: 'Seamless Setup', desc: 'Secure deployment of operational AI tools.' },
                            { step: '03', title: 'Faculty Mastery', desc: 'Hands-on training for teacher adoption.' },
                            { step: '04', title: 'Innovation Launch', desc: 'Activating student-led AI innovation labs.' }
                        ].map((step, i) => (
                            <div key={i} className={styles.stepCard} style={{ transitionDelay: `${i * 0.1}s` }}>
                                <div className={styles.stepNum}>{step.step}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <Footer />
        </div>
    );
};

export default ForSchoolsPage;
