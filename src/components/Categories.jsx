import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Categories.module.css';

const Categories = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = [
    {
      icon: '💻',
      title: 'Computer Science (CSE)',
      description: 'Web apps, desktop software, and algorithms'
    },
    {
      icon: '🤖',
      title: 'AI / Machine Learning',
      description: 'Predictive models, NLP, computer vision'
    },
    {
      icon: '📱',
      title: 'Web & Android Development',
      description: 'Full-stack web apps and mobile solutions'
    },
    {
      icon: '🔌',
      title: 'IoT & Electronics',
      description: 'Smart devices, sensors, and automation'
    },
    {
      icon: '📊',
      title: 'Data Science',
      description: 'Analytics, visualization, and insights'
    },
    {
      icon: '⚙️',
      title: 'Mechanical / Civil',
      description: 'CAD modeling, simulations, and analysis'
    }
  ];

  return (
    <section className={styles.categories} ref={ref}>
      <div className={`container ${styles.categoriesContainer}`}>
        <h2 className={styles.sectionTitle}>Explore Projects by Domain 🔍</h2>
        
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${styles.categoryCard} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
              <p className={styles.categorySubtext}>Ready-to-demo projects — fully documented and affordable.</p>
              <a href="/projects" className={styles.categoryBtn}>View Projects →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
