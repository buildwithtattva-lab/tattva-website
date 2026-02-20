import React from 'react';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: whatWeDoRef, inView: whatWeDoInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: founderRef, inView: founderInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: visionRef, inView: visionInView } = useInView({ threshold: 0.2, triggerOnce: true });

  const services = [
    {
      icon: '🎓',
      title: 'For Students',
      description: 'Showcase projects, find inspiration, and collaborate across colleges.',
      benefits: [
        'Ready-to-submit projects with complete documentation',
        'Custom project development tailored to your syllabus',
        'Support till viva and project presentation',
        'Access to trending project ideas across domains'
      ]
    },
    {
      icon: '🏫',
      title: 'For Colleges',
      description: 'Partner with us to bring industry-backed projects and boost student innovation.',
      benefits: [
        'Bulk project solutions for multiple students',
        'Workshop and training programs',
        'Industry collaboration opportunities',
        'Research and development support'
      ]
    }
  ];

  return (
    <div className={styles.aboutPage}>
      <Navigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Strategic Institutional Enablement through AI & Innovation
          </h1>
          <p className={styles.heroSubtitle}>
            ProjectMinds is dedicated to bridging the gap between traditional education and the evolving AI-driven industry. We empower schools and colleges with the tools, training, and technology needed to thrive in a digital-first world.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className={styles.missionSection} ref={missionRef}>
        <div className="container">
          <div className={`${styles.missionContent} ${missionInView ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              To democratize advanced technology in academia by providing seamless AI integration, automated operational tools, and industry-standard innovation frameworks.
            </p>
            <p className={styles.missionText}>
              We believe that every educational institution deserves access to high-impact automation and specialized technical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className={styles.founderSection} ref={founderRef}>
        <div className="container">
          <div className={`${styles.founderContent} ${founderInView ? styles.visible : ''}`}>
            <div className={styles.founderImage}>
              <div className={styles.founderAvatar}>👨‍💻</div>
            </div>
            <div className={styles.founderText}>
              <h2 className={styles.sectionTitle}>Founder's Note</h2>
              <p className={styles.founderQuote}>
                "I'm <strong>Prasad</strong>, founder of ProjectMinds."
              </p>
              <p className={styles.founderMessage}>
                Education is the foundation of innovation, yet the gap between what is taught and what industry demands is wider than ever. I founded ProjectMinds to serve as a bridge.
              </p>
              <p className={styles.founderMessage}>
                Our focus is on Institutional Enablement — providing schools and colleges with the strategic technical support they need to deliver future-ready outcomes for their students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className={styles.visionSection} ref={visionRef}>
        <div className="container">
          <div className={`${styles.visionContent} ${visionInView ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.visionText}>
              To bridge the gap between traditional education systems and emerging AI-driven industries, creating a world where every institution is a hub of technological excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Start Your Institutional Transformation</h2>
            <p className={styles.ctaText}>
              Partner with us to bring AI-driven innovation to your campus.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="http://wa.me/+918886945890"
                className={styles.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;


