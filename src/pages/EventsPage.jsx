import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './EventsPage.module.css';

const EventsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const googleFormLink = 'https://forms.gle/NDM8hLvVk2pdnTiw7';

    const handleBannerClick = () => {
        window.open(googleFormLink, '_blank');
    };

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Upcoming Events</h1>
                    <div className={styles.breadcrumb}>
                        <Link to="/">Home</Link>
                        <span>&gt;</span>
                        <span className={styles.active}>Events</span>
                    </div>
                </div>
            </header>

            {/* Featured Events Section */}
            <section className={styles.eventsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.label}>Featured Event</span>
                        <h2 className={styles.mainTitle}>AI Summer Camp 2026</h2>
                    </div>

                    <div className={styles.featuredEvent} onClick={handleBannerClick}>
                        <div className={styles.eventBadge}>Enrollment Open</div>
                        <img 
                            src="/assets/images/summer-camp-2026.jpg" 
                            alt="AI Summer Camp 2026 Banner" 
                            className={styles.bannerImage}
                        />
                    </div>

                    <div className={styles.eventDetails}>
                        <p className={styles.eventDesc}>
                            Join us for an immersive journey into the world of Artificial Intelligence. 
                            From prompt engineering to building your own AI mini-projects, 
                            this summer camp is designed for students from classes 3 to 10.
                        </p>
                        <a 
                            href={googleFormLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.enrollBtn}
                        >
                            Enroll Now for AI Summer Camp
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EventsPage;
