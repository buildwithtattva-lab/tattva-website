import React from 'react';
import styles from './CollegeScroller.module.css';

const CollegeScroller = () => {
  const colleges = [
    { name: "GITAM University", logo: "/assets/icons/gitam.png" },
    { name: "CMR College", logo: "/assets/icons/cmr.png" },
    { name: "VBIT", logo: "/assets/icons/vbit.png" },
    { name: "CBIT", logo: "/assets/icons/cbit.png" },
    { name: "Malla Reddy University", logo: "/assets/icons/malla reddy.png" },
    { name: "VJIT", logo: "/assets/icons/vjit.png" },
    { name: "MVSR Engineering", logo: "/assets/icons/mvsr.png" }
  ];

  return (
    <section className={styles.collegeSection}>
      <div className="container">
        <h2 className={styles.sectionHeading}>
          Students from Various Colleges Trust Us 🎓
        </h2>
        <p className={styles.sectionSubheading}>
          Trusted by students across India's top engineering colleges
        </p>
      </div>
      
      <div className={styles.scrollerWrapper}>
        <div className={styles.scrollerContainer}>
          <div className={styles.scrollerContent}>
            {colleges.concat(colleges).map((college, index) => (
              <div key={index} className={styles.collegeBadge}>
                <img 
                  src={college.logo} 
                  alt={`${college.name} logo`}
                  className={styles.collegeLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeScroller;
