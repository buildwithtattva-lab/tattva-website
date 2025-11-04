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
            Connecting Students, Colleges, and Companies through Innovation 🚀
          </h1>
          <p className={styles.heroSubtitle}>
            ProjectMinds is a platform that empowers engineering students to share, discover, and collaborate on real-world projects — bridging the gap between academia and industry.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className={styles.missionSection} ref={missionRef}>
        <div className="container">
          <div className={`${styles.missionContent} ${missionInView ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Our Mission 🎯</h2>
            <p className={styles.missionText}>
              At ProjectMinds, our mission is to make student projects more than just academic requirements — we want them to become real solutions for real challenges.
            </p>
            <p className={styles.missionText}>
              We aim to connect students with meaningful projects, colleges with stronger industry ties, and companies with fresh ideas and emerging talent.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className={styles.whatWeDoSection} ref={whatWeDoRef}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What We Do 💡</h2>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${styles.serviceCard} ${whatWeDoInView ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.benefitsList}>
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
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
              <h2 className={styles.sectionTitle}>Founder's Note 📝</h2>
              <p className={styles.founderQuote}>
                "I'm <strong>Prasad</strong>, founder of ProjectMinds."
              </p>
              <p className={styles.founderMessage}>
                Having seen how students struggle to find industry-relevant project ideas, I wanted to create a space where academic knowledge meets practical innovation.
              </p>
              <p className={styles.founderMessage}>
                ProjectMinds is my way of giving students and colleges a platform to showcase their creativity and collaborate on impactful ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className={styles.visionSection} ref={visionRef}>
        <div className="container">
          <div className={`${styles.visionContent} ${visionInView ? styles.visible : ''}`}>
            <h2 className={styles.sectionTitle}>Our Vision 🌟</h2>
            <p className={styles.visionText}>
              We envision a future where every student project contributes to solving real problems — building a smarter, more connected academic ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Let's Collaborate 🤝</h2>
            <p className={styles.ctaText}>
              Are you a college or organization interested in partnering with us?
            </p>
            <div className={styles.ctaButtons}>
              <a 
                href="mailto:team.projectminds@gmail.com" 
                className={styles.emailBtn}
              >
                📧 team.projectminds@gmail.com
              </a>
              <a 
                href="http://wa.me/+918886945890" 
                className={styles.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Us
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
