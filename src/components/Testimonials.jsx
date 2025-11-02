import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    {
      name: 'Riya Sharma',
      course: 'B.Tech CSE',
      college: 'GITAM University',
      rating: 5,
      text: 'ProjectMinds helped me complete my AI project in 5 days — got 94%! The documentation was perfect and they supported me till my viva.',
      avatar: '👩‍🎓'
    },
    {
      name: 'Sandeep Kumar',
      course: 'B.Tech ECE',
      college: 'CBIT',
      rating: 5,
      text: 'Loved the quality of report and PPT. The code was well-commented and easy to understand. Highly recommend!',
      avatar: '👨‍🎓'
    },
    {
      name: 'Priya Reddy',
      course: 'MCA',
      college: 'Osmania University',
      rating: 5,
      text: 'Amazing experience! They customized the project exactly as per my college syllabus. Worth every rupee!',
      avatar: '👩‍💻'
    }
  ];

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={`container ${styles.testimonialsContainer}`}>
        <h2 className={styles.sectionTitle}>Our Students Say It Best ⭐</h2>
        
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`${styles.testimonialCard} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>⭐</span>
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorDetails}>
                  <p className={styles.authorName}>{testimonial.name}</p>
                  <p className={styles.authorCourse}>{testimonial.course}, {testimonial.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
