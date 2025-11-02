import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Computer Science',
    'AI / Machine Learning',
    'Web & Android',
    'IoT & Electronics',
    'Data Science',
    'Mechanical / Civil'
  ];

  const projects = [
    {
      id: 1,
      title: 'Agentic AI Document Processor',
      category: 'AI / Machine Learning',
      description: 'Smart AI that reads, understands, and processes your documents automatically.',
      tags: ['Python', 'ollama', 'Machine Learning','Qwen 2.5'],
      icon: '🤖'
    },
    {
      id: 2,
      title: 'IoT Smart Parking',
      category: 'IoT & Electronics',
      description: 'Real-time slot tracking with NodeMCU & sensors for smart parking management.',
      tags: ['IoT', 'Arduino', 'ESP8266'],
      icon: '🅿️'
    },
    {
      id: 3,
      title: 'Fake News Detection',
      category: 'AI / Machine Learning',
      description: 'Python + NLP-based ML project for detecting fake news articles.',
      tags: ['Python', 'NLP', 'Machine Learning'],
      icon: '📰'
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      category: 'Web & Android',
      description: 'Full-stack web app with payment integration and admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB'],
      icon: '🛒'
    },
    {
      id: 5,
      title: 'Crop Disease Predictor',
      category: 'AI / Machine Learning',
      description: 'CNN-based image classification system for detecting crop diseases.',
      tags: ['TensorFlow', 'Python', 'Deep Learning'],
      icon: '🌾'
    },
    {
      id: 6,
      title: 'Smart Home Automation',
      category: 'IoT & Electronics',
      description: 'Voice-controlled IoT system with Alexa integration.',
      tags: ['IoT', 'Raspberry Pi', 'Voice AI'],
      icon: '🏠'
    },
    {
      id: 7,
      title: 'Sentiment Analysis Tool',
      category: 'Data Science',
      description: 'Real-time social media sentiment analysis using Twitter API.',
      tags: ['Python', 'NLP', 'Data Visualization'],
      icon: '📊'
    },
    {
      id: 8,
      title: 'Vehicle Detection System',
      category: 'Computer Science',
      description: 'Real-time vehicle detection and counting using YOLO algorithm.',
      tags: ['Python', 'YOLO', 'Computer Vision'],
      icon: '🚗'
    },
    {
      id: 9,
      title: 'Food Delivery App',
      category: 'Web & Android',
      description: 'Android app with real-time order tracking and payment gateway.',
      tags: ['Android', 'Firebase', 'Google Maps'],
      icon: '🍔'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.projectsPage}>
      <Navigation />
      
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Explore Our Projects 🚀</h1>
          <p className={styles.heroSubtitle}>
            Choose from 100+ ready-to-submit final year projects with complete documentation
          </p>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectIcon}>{project.icon}</div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.projectFooter}>
                  <span className={styles.price}>{project.price}</span>
                  <a 
                    href="http://wa.me/+918886945890" 
                    className={styles.buyBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
