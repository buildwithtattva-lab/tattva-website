import React, { useState, useEffect } from 'react';
import styles from './PromoPopup.module.css';

const PromoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already dismissed the popup in the current session
        const isDismissed = sessionStorage.getItem('promo_dismissed');
        
        if (!isDismissed) {
            // Show popup after a 1.5 second delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = (e) => {
        e.stopPropagation(); // Prevent trigger click onto the banner
        setIsVisible(false);
        // Save dismissal to session storage
        sessionStorage.setItem('promo_dismissed', 'true');
    };

    const handleBannerClick = () => {
        window.open('https://forms.gle/NDM8hLvVk2pdnTiw7', '_blank');
        handleClose({ stopPropagation: () => {} }); // Optional: close popup after clicking
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    className={styles.closeButton} 
                    onClick={handleClose}
                    aria-label="Close promotion"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div className={styles.bannerLink} onClick={handleBannerClick}>
                    <img 
                        src="/assets/images/summer-camp-2026.jpg" 
                        alt="AI Summer Camp 2026 - Enroll Now!" 
                        className={styles.bannerImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default PromoPopup;
