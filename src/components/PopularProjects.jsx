import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './PopularProjects.module.css';

const PopularProjects = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const projects = [
    {
      title: 'Agentic AI Document Processor',
      description: 'Smart AI that reads, understands, and processes your documents automatically.',
      tags: ['Python', 'ollama', 'Machine Learning','Qwen 2.5'],
      icon: '🤖'
    },
    {
      title: 'IoT Smart Parking',
      description: 'Real-time slot tracking with NodeMCU & sensors.',
      tags: ['IoT', 'Arduino', 'ESP8266'],
      icon: '🅿️'
    },
    {
      title: 'Fake News Detection',
      description: 'Python + NLP-based ML project.',
      tags: ['Python', 'NLP', 'Machine Learning'],
      icon: '📰'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web app with payment integration.',
      tags: ['React', 'Node.js', 'MongoDB'],
      icon: '🛒'
    },
    {
      title: 'Crop Disease Predictor',
      description: 'CNN-based image classification system.',
      tags: ['TensorFlow', 'Python', 'Deep Learning'],
      icon: '🌾'
    },
    {
      title: 'Smart Home Automation',
      description: 'Voice-controlled IoT system with Alexa.',
      tags: ['IoT', 'Raspberry Pi', 'Voice AI'],
      icon: '🏠'
    }
  ];

  return (
    <section className={styles.popularProjects} ref={ref}>
      <div className={`container ${styles.popularProjectsContainer}`}>
        <h2 className={styles.sectionTitle}>Our Trending Projects 🔥</h2>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`${styles.projectCard} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.projectIcon}>{project.icon}</div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAllWrapper}>
          <a href="/projects" className={styles.viewAllBtn}>View All Projects →</a>
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;
