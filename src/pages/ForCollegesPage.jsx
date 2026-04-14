import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import styles from './ForCollegesPage.module.css';

// Import local assets
import heroBg from '../assets/education/college_hero.png';
import detailImg from '../assets/education/college_detail.png';

const ForCollegesPage = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const offerings = [
        {
            title: 'AI & ML Lab Setup',
            desc: 'Curated repository of ready-to-deploy AI project frameworks integrated into your curriculum.'
        },
        {
            title: 'Industry Projects',
            desc: 'End-to-end guidance for final year projects: topic selection, development, and delivery.'
        },
        {
            title: 'Faculty Training',
            desc: 'Practical AI/ML sessions for faculty to implement modern tech stacks comfortably.'
        }
    ];

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            {/* Hero Section - Vistario Inspired */}
            <header className={styles.hero} ref={heroRef}>
                <div className={styles.heroBgWrapper}>
                    <img src={heroBg} alt="College Lab" className={styles.heroBg} />
                    <div className={styles.overlay}></div>
                </div>
                <div className={`container ${styles.heroContent} ${heroInView ? styles.visible : ''}`}>

                    <h1 className={styles.title}>Future-Ready <br/> Colleges with AI</h1>
                    <p className={styles.subtitle}>
                        Tattva helps higher education institutions integrate industry-grade AI projects and modern tech workflows into their curriculum.
                    </p>
                    <div className={styles.heroActions}>
                        <a href="https://wa.me/918886945890" className={styles.primaryBtn}>Modernize Your Campus</a>
                        <a href="#offerings" className={styles.secondaryBtn}>View Specializations</a>
                    </div>
                </div>
            </header>

            {/* Content Section - Two Column Styling */}
            <section className={styles.detailSection} ref={section1Ref} id="offerings">
                <div className={`container ${styles.detailContainer}`}>
                    <div className={`${styles.imageCol} ${section1InView ? styles.visible : ''}`}>
                        <div className={styles.imageCard}>
                            <img src={detailImg} alt="University AI Research" />
                            <div className={styles.imageDecoration}></div>
                        </div>
                    </div>
                    <div className={`${styles.textCol} ${section1InView ? styles.visible : ''}`}>
                        <span className={styles.sectionBadge}>Infinite Learning</span>
                        <h2 className={styles.sectionTitle}>Equip your students with real-world AI project skills</h2>
                        <p className={styles.sectionDesc}>
                            Traditional curricula often move slower than technology. Tattva closes this gap by providing practical, high-impact AI and software project frameworks.
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
                        <h2 className={styles.titleLarge}>Institutional Innovation Roadmap</h2>
                        <p>Our systematic approach to technical excellence in higher education</p>
                    </div>

                    <div className={`${styles.processGrid} ${gridInView ? styles.visible : ''}`}>
                        {[
                            { step: '01', title: 'Curriculum Audit', desc: 'Evaluating alignment with current industry tech stacks.' },
                            { step: '02', title: 'Lab Deployment', desc: 'Setting up state-of-the-art AI project repositories.' },
                            { step: '03', title: 'Digital Upskilling', desc: 'Hands-on faculty workshops on emerging AI tools.' },
                            { step: '04', title: 'Portfolio Excellence', desc: 'Launching industry-ready student project showcases.' }
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

export default ForCollegesPage;
