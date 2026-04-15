import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './AboutPage.module.css';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const AboutPage = () => {
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: impactRef, inView: impactInView } = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <div className={styles.aboutPage}>
            <Navigation isSolid={true} />

            {/* Geometric Hero */}
            <header className={styles.hero} ref={heroRef}>
                <div className={`container ${styles.heroContent} ${heroInView ? styles.visible : ''}`}>
                    <h1 className={styles.heroTitle}>
                        The Future of <br/> AI Education.
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Shaping the future of learning through seamless AI <br/> integration and educational empowerment.
                    </p>
                </div>
            </header>

            {/* Mission & Vision Section */}
            <section className={styles.missionSection} ref={missionRef}>
                <div className="container">
                    <div className={`${styles.missionContent} ${missionInView ? styles.visible : ''}`}>
                        <h2 className={styles.sectionTitle}>Mission & Vision</h2>
                        <p className={styles.missionText}>
                            Our mission is to democratize AI in education, making advanced tools accessible to all. Our vision is a world where every institution is future-ready, fostering a generation of innovative leaders.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact in Numbers Section */}
            <section className={styles.impactSection} ref={impactRef}>
                <div className={`container ${styles.impactContainer}`}>
                    <h2 className={styles.sectionTitle} style={{ color: 'var(--white)' }}>Impact in Numbers</h2>
                    
                    <div className={`${styles.impactGrid} ${impactInView ? styles.visible : ''}`}>
                        <div className={styles.impactItem}>
                            <h2><CountUp end={10} suffix="+" /></h2>
                            <p>Schools Transformed</p>
                        </div>
                        <div className={styles.impactItem}>
                            <h2><CountUp end={1000} suffix="+" /></h2>
                            <p>Students Reached</p>
                        </div>
                        <div className={styles.impactItem}>
                            <h2><CountUp end={95} suffix="%" /></h2>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
