
import { useInView } from 'react-intersection-observer';
import styles from './WhyChoose.module.css';

const WhyChoose = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const leftFeatures = [
        {
            title: 'Professional Titles',
            desc: 'Gain practical AI skills to excel and grow in professional careers fast.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="#f4a261" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <line x1="7" y1="8" x2="13" y2="8" />
                    <line x1="7" y1="12" x2="11" y2="12" />
                    <circle cx="17" cy="15" r="4" />
                    <path d="M17 19v2l-2-1-2 1v-2" />
                </svg>
            )
        },
        {
            title: 'Career Guidance',
            desc: 'Get practical guidance to choose the right AI career path and succeed fast.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="#f4a261" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 12-4-4-4 4" />
                    <path d="M12 16V8" />
                </svg>
            )
        }
    ];

    const rightFeatures = [
        {
            title: 'Master Tutors',
            desc: 'Expert tutors guide learners step by step to master AI skills quickly and easily.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="#f4a261" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                    <path d="m4.93 4.93 14.14 14.14" />
                    <path d="m19.07 4.93-14.14 14.14" />
                </svg>
            )
        },
        {
            title: 'Skilled Mentors',
            desc: 'Hands-on support ensures learners gain real AI knowledge step by step.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="#f4a261" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M7 21v-2a5 5 0 0 1 10 0v2" />
                </svg>
            )
        }
    ];

    return (
        <section className={styles.whyChoose} ref={ref}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.badge}>WHY US</span>
                    <h2 className={styles.title}>Achieve AI Mastery <br/> Through Simple Lessons</h2>
                </div>

                <div className={`${styles.mainContent} ${inView ? styles.visible : ''}`}>
                    
                    {/* Left Column */}
                    <div className={styles.featuresColumn}>
                        {leftFeatures.map((f, i) => (
                            <div key={i} className={`${styles.featureItem} ${styles.left}`}>
                                <div className={styles.iconCircle}>{f.icon}</div>
                                <div className={styles.featureText}>
                                    <h3>{f.title}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center: Full-Body Robot */}
                    <div className={styles.robotContainer}>
                        <div className={styles.fullRobot}>
                            <div className={styles.antenna}>
                                <div className={styles.antennaStem}></div>
                                <div className={styles.antennaBulb}></div>
                            </div>
                            
                            <div className={styles.robotHead}>
                                <div className={styles.visor}>
                                    <div className={styles.eyeContainer}>
                                        <div className={styles.eye}></div>
                                        <div className={styles.eye}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.robotNeck}></div>
                            
                            <div className={styles.robotBody}>
                                <div className={styles.armLeft}>
                                    <div className={styles.hand}>
                                        <div className={styles.book} style={{backgroundColor: '#f4a261'}}></div>
                                    </div>
                                </div>
                                <div className={styles.armRight}>
                                    <div className={styles.hand}>
                                        <div className={styles.book} style={{backgroundColor: '#2a9d8f'}}></div>
                                    </div>
                                </div>
                                <div className={styles.torsoDetail}></div>
                            </div>

                            <div className={styles.robotLegs}>
                                <div className={styles.leg}></div>
                                <div className={styles.leg}></div>
                            </div>
                        </div>
                        <div className={styles.robotShadow}></div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.featuresColumn}>
                        {rightFeatures.map((f, i) => (
                            <div key={i} className={`${styles.featureItem} ${styles.right}`}>
                                <div className={styles.iconCircle}>{f.icon}</div>
                                <div className={styles.featureText}>
                                    <h3>{f.title}</h3>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
