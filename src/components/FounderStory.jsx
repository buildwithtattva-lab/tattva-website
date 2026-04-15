
import { useInView } from 'react-intersection-observer';
import styles from './FounderStory.module.css';

const FounderStory = () => {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className={styles.founderSection} ref={ref}>
            <div className={`container ${styles.founderContainer}`}>
                <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
                    <h2 className={styles.title}>Our Founder's Story</h2>
                    <div className={styles.storyCard}>
                        <div className={styles.imagePlaceholder}>
                            {/* You can replace this with an actual image later */}
                            <span>👨‍💻</span>
                        </div>
                        <div className={styles.textSide}>
                            <p>
                                Tattva was born out of a simple observation: the gap between academic learning and industry requirements.
                            </p>
                            <p>
                                As a developer who started with a passion for building real-world solutions, I realized that many students
                                lack the practical exposure needed to excel in today's fast-paced tech landscape.
                            </p>
                            <p>
                                What started as a small initiative to help fellow students has now evolved into a tech partner for colleges.
                                Our mission is to empower institutions with high-quality, AI-driven project repositories that make students
                                industry-ready from day one.
                            </p>
                            <footer className={styles.founderFoot}>
                                <strong>Prasad</strong>
                                <span>Founder, Tattva</span>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderStory;
