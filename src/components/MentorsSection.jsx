import React from 'react';
import styles from './MentorsSection.module.css';
import mentorImg from '../assets/mentors/Screenshot 2026-04-11 at 9.55.32 PM.png';

const MentorsSection = () => {
    return (
        <section className={styles.mentorSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Our Mentor & <span className={styles.highlight}>Evaluator</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Meet the mind behind our hiring — an industry expert dedicated to identifying top talent.
                    </p>
                </div>

                <div className={styles.cardContainer}>
                    <div className={styles.mentorCard}>
                        {/* Decorative Background Patterns */}
                        <div className={styles.patternDots}></div>
                        <div className={styles.patternLines}></div>

                        <div className={styles.imageWrapper}>
                            <img src={mentorImg} alt="Lead Mentor" className={styles.mentorImage} />

                            <div className={styles.mentorInfo}>
                                <h3 className={styles.mentorName}>Vamgipuram Sudha Harikishan</h3>
                                <p className={styles.mentorExperience}>
                                    Senior Educational Leader & Hiring Specialist <br />
                                    33+ Years of Institutional Excellence
                                </p>
                            </div>
                        </div>

                        <div className={styles.footerInfo}>
                            <span className={styles.roleTag}>Lead Evaluator</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorsSection;
