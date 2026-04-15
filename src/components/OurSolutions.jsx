
import { useInView } from 'react-intersection-observer';
import styles from './OurSolutions.module.css';

// Importing assets
import missionImg from '../assets/bento/mission.png';
import landscapeImg from '../assets/bento/landscape.png';
import robot1Img from '../assets/bento/robot1.png';
import robot2Img from '../assets/bento/robot2.png';

const OurSolutions = () => {
    const { ref, inView } = useInView({ 
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <section className={styles.solutions} ref={ref}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.tag}>OUR STORY</span>
                    <h2 className={styles.title}>Empowering Learning and <br/> Transforming Futures</h2>
                </div>

                <div className={`${styles.bentoGrid} ${inView ? styles.visible : ''}`}>
                    
                    {/* Mission Card */}
                    <div className={`${styles.card} ${styles.missionCard}`}>
                        <div className={styles.cardInfo}>
                            <h3>Mission</h3>
                            <p>To make AI learning simple and practical so everyone can gain real skills.</p>
                        </div>
                        <div className={styles.missionVisual}>
                            <img src={missionImg} alt="Mission" />
                            <div className={styles.pillOverlay}>
                                <span>LEARNING</span>
                                <span>DIGITAL MINDS</span>
                                <span>TECH EDUCATION</span>
                            </div>
                        </div>
                    </div>

                    {/* Teamwork Card */}
                    <div className={`${styles.card} ${styles.teamworkCard}`}>
                        <div className={styles.cardInfo}>
                            <h3>Teamwork</h3>
                            <p>Collaborating to design AI courses that help learners succeed fast.</p>
                        </div>
                        <div className={styles.teamworkVisual}>
                            <div className={styles.centerNode}>
                                <div className={styles.tattvaIcon}>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                                {/* Branching lines */}
                                <svg className={styles.branches} viewBox="0 0 200 200">
                                    <line x1="100" y1="100" x2="40" y2="40" className={styles.branchLine} />
                                    <line x1="100" y1="100" x2="160" y2="40" className={styles.branchLine} />
                                    <line x1="100" y1="100" x2="30" y2="120" className={styles.branchLine} />
                                    <line x1="100" y1="100" x2="100" y2="170" className={styles.branchLine} />
                                    <line x1="100" y1="100" x2="170" y2="130" className={styles.branchLine} />
                                </svg>
                                {/* Avatars */}
                                <div className={`${styles.avatar} ${styles.a1}`}>A</div>
                                <div className={`${styles.avatar} ${styles.a2}`}>K</div>
                                <div className={`${styles.avatar} ${styles.a3}`}>S</div>
                                <div className={`${styles.avatar} ${styles.a4}`}>P</div>
                                <div className={`${styles.avatar} ${styles.a5}`}>M</div>
                            </div>
                        </div>
                    </div>

                    {/* Study Route Card (Tall) */}
                    <div className={`${styles.card} ${styles.routeCard}`}>
                        <div className={styles.cardInfo}>
                            <h3>Study Route</h3>
                            <p>A clear study path guides learners step by step to master AI skills quickly.</p>
                        </div>
                        <div className={styles.searchVisual}>
                            <div className={styles.searchBar}>
                                <span>Discover what to learn...</span>
                                <div className={styles.searchIcon}>🔍</div>
                            </div>
                        </div>
                        <img src={landscapeImg} alt="Route Landscape" className={styles.bgLandscape} />
                    </div>

                    {/* Smarter Education Banner (Wide) */}
                    <div className={`${styles.card} ${styles.bannerCard}`}>
                        <div className={styles.bannerContent}>
                            <h3>Smarter Education With AI Made Simple</h3>
                            <p>Providing easy AI learning that helps to build real skills fast and smart.</p>

                        </div>
                        <div className={styles.bannerVisual}>
                            <img src={robot1Img} alt="AI 1" className={styles.robot1} />
                            <img src={robot2Img} alt="AI 2" className={styles.robot2} />
                            <div className={styles.floatingTag}>
                                <div className={styles.tattvaIconSmall}>★</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OurSolutions;
