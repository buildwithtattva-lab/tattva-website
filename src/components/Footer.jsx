import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* CTA Banner */}
            <div className={styles.ctaBanner}>
                <div className={`container ${styles.bannerContainer}`}>
                    <div className={styles.bannerText}>
                        <h2 className={styles.bannerTitle}>AI is the Future Be Part of It!</h2>
                        <p className={styles.bannerSub}>Join the AI revolution and help shape tomorrow today through intelligence.</p>
                    </div>
                    
                    <div className={styles.robotVisual}>
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
                                <div className={styles.bookStack}>
                                    <div className={styles.book} style={{backgroundColor: '#cbd5e1'}}></div>
                                    <div className={styles.book} style={{backgroundColor: '#25a294'}}></div>
                                    <div className={styles.book} style={{backgroundColor: '#f4a261'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bannerAction}>
                        <a href="http://wa.me/+918886945890" target="_blank" rel="noopener noreferrer" className={styles.btnLime}>
                            Join Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className={`container ${styles.footerMain}`}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerColumn}>
                        <h4>Contact</h4>
                        <a href="mailto:buildwithtattva@gmail.com">buildwithtattva@gmail.com</a>
                        <p>+91 96527 96537</p>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Address</h4>
                        <p>Hyderabad HQ,<br/>Telangana, India</p>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Main Pages</h4>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Solutions</h4>
                        <Link to="/schools">For Schools</Link>
                        <Link to="/colleges">For Colleges</Link>
                        <Link to="/students">For Students</Link>
                        <Link to="/hiring">Hiring</Link>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Connect</h4>
                        <a href="https://instagram.com/tattvahq" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="http://wa.me/+918886945890" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="https://linkedin.com/company/tattva-ai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>

                {/* Massive Brand Text */}
                <div className={styles.massiveBrand}>
                    tattva ai
                </div>

                {/* Legal Bar */}
                <div className={styles.legalBar}>
                    <p className={styles.copyright}>Copyright © {currentYear} Tattva | All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
