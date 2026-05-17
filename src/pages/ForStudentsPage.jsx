import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/bento/m6.png';
import explorersImage from '../assets/bento/m5.png';
import creatorsImage from '../assets/bento/m4.png';
import innovatorsImage from '../assets/bento/m3.png';
import researchImage from '../assets/bento/m2.png';
import styles from './ForStudentsPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const Icon = ({ type }) => {
  const icons = {
    school: <path d="M5 27h22M8 27V11l8-5 8 5v16M13 27v-7h6v7M11 15h3M18 15h3" />,
    students: <path d="M11 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM21 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 27c1-5 4-8 8-8s7 3 8 8M17 26c1-4 3-6 6-6 2.5 0 4.5 1.7 6 5" />,
    trophy: <path d="M9 6h14v7a7 7 0 0 1-14 0V6ZM7 6h18M13 25h6M16 20v5M5 9h4v3a4 4 0 0 1-4-3ZM27 9h-4v3a4 4 0 0 0 4-3Z" />,
    mentor: <path d="M6 20v-9h20v13H10l-4 4v-4M11 15h6M11 19h10M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />,
    medal: <path d="M10 4h12l-3 7h-6L10 4ZM12 19a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM16 15v4l2 1M12 25l-2 4 6-2 6 2-2-4" />,
    aiBasics: <path d="M8 8h16v12H8zM12 24h8M16 20v4M12 13h8M14 16h4M6 10H3M29 10h-3M6 18H3M29 18h-3" />,
    creators: <path d="M6 10h20v12H6zM10 25h12M16 22v3M11 15h5M20 14l3 2-3 2M12 6l2 2-2 2M19 6l-2 2 2 2" />,
    innovators: <path d="M16 5a7 7 0 0 0-4 12v3h8v-3a7 7 0 0 0-4-12ZM13 24h6M14 28h4M11 13h10M16 9v8M7 9 4 6M25 9l3-3" />,
    rocket: <path d="M12 20 6 26l6-2 2 4 4-6M13 17l-4-4 5-5c3-3 7-4 11-3 1 4 0 8-3 11l-5 5-4-4ZM20 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />,
    skill: <path d="M5 27h22M8 27V11l8-5 8 5v16M13 27v-7h6v7M11 15h10" />,
    lab: <path d="M7 26h18M11 4v8l-5 10a4 4 0 0 0 3.6 6h12.8a4 4 0 0 0 3.6-6l-5-10V4M10 4h12M11 20h10" />,
    guide: <path d="M16 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM5 28c1.5-6 5-9 11-9s9.5 3 11 9M11 23l5 3 5-3" />,
    future: <path d="M6 25h20M9 22v-6M16 22V10M23 22V6M8 10l3 3 5-5 4 4 6-7" />,
    certificate: <path d="M8 4h12l4 4v13H8V4ZM20 4v5h4M12 13h7M12 17h6M18 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM20 27l-1 3 3-1.4 3 1.4-1-3" />,
    safe: <path d="M16 5 26 9v7c0 6-4 10-10 12C10 26 6 22 6 16V9l10-4ZM12 16l3 3 6-7" />
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {icons[type]}
    </svg>
  );
};

const stats = [
  { value: '500+', label: 'Students Enrolled', icon: 'school' },
  { value: '10+', label: 'Partner Schools', icon: 'students' },
  { value: '98%', label: 'Student Satisfaction', icon: 'trophy' },
  { value: '10+', label: 'Programs Offered', icon: 'mentor' },
  { value: '2+', label: 'Years of Impact', icon: 'medal' }
];

const programs = [
  {
    title: 'AI Explorers',
    age: 'Ages 8-12',
    image: explorersImage,
    icon: 'aiBasics',
    desc: 'An engaging introduction to AI concepts through fun, interactive activities.',
    points: ['AI Basics & Real-world Examples', 'No Coding Required', 'Hands-on Projects']
  },
  {
    title: 'AI Creators',
    age: 'Ages 12-15',
    image: creatorsImage,
    icon: 'creators',
    desc: 'Learn by building AI models and solving real-world problems.',
    points: ['Block & Python Programming', 'Machine Learning Basics', 'Capstone Projects']
  },
  {
    title: 'AI Innovators',
    age: 'Ages 15-18',
    image: innovatorsImage,
    icon: 'innovators',
    desc: 'Dive deeper into AI, data science, and advanced applications.',
    points: ['Advanced ML & Data Science', 'Deep Learning Foundations', 'Industry-Grade Projects']
  },
  {
    title: 'AI Research Track',
    age: 'Ages 16+',
    image: researchImage,
    icon: 'rocket',
    desc: 'For aspiring researchers and innovators who want to go deeper.',
    points: ['Research & Innovation', 'Mentorship by Experts', 'Build & Publish Projects']
  }
];

const benefits = [
  { title: 'Build Real Skills', desc: 'Gain practical AI and problem-solving skills.', icon: 'skill' },
  { title: 'Hands-on Learning', desc: 'Work on exciting projects and real-world challenges.', icon: 'lab' },
  { title: 'Expert Guidance', desc: 'Learn from experienced mentors and educators.', icon: 'guide' },
  { title: 'Future-Ready', desc: 'Prepare for future careers in AI and technology.', icon: 'students' },
  { title: 'Certificate & Recognition', desc: 'Earn certificates and showcase your achievements.', icon: 'certificate' },
  { title: 'Safe & Supportive', desc: 'A friendly environment that encourages curiosity.', icon: 'safe' }
];

const useStudentReveal = () => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-student-reveal]'));

    if (!targets.length) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => target.classList.add(styles.isVisible));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 12% 0px' }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
};

const ForStudentsPage = () => {
  useStudentReveal();

  return (
  <div className={styles.page}>
    <header className={styles.hero}>
      <img src={heroImage} alt="Students building AI projects" className={styles.heroImage} />
      <div className={styles.heroOverlay} />

      <nav className={styles.nav} aria-label="Primary navigation">
        <Link to="/" className={styles.logoLink}>
          <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
          <span>tattva-ai</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/for-schools">For Schools</Link>
          <Link to="/for-students" className={styles.activeNav}>Student Programs</Link>
          <Link to="/faculty-training">Faculty Training</Link>
          <Link to="/projects">Gallery</Link>
          <Link to="/about">About</Link>
        </div>

        <div className={styles.navActions}>
          <a href={whatsappUrl} className={styles.demoButton} target="_blank" rel="noopener noreferrer">
            Book a Demo
          </a>
          <a href={whatsappUrl} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 0.156 7.125 0.156 15.875C0.156 18.656 0.906 21.375 2.281 23.75L0 32L8.5 29.75C10.781 31 13.375 31.656 16.031 31.656C24.781 31.656 32 24.531 32 15.781C32 11.531 30.281 7.65 27.281 4.65ZM16.031 29C13.656 29 11.344 28.375 9.344 27.219L8.875 26.938L3.844 28.219L5.156 23.344L4.844 22.844C3.563 20.75 2.875 18.344 2.875 15.875C2.875 8.625 8.781 2.719 16.031 2.719C19.531 2.719 22.813 4.094 25.281 6.594C27.75 9.094 29.156 12.375 29.156 15.875C29.281 23.125 23.281 29 16.031 29ZM23.25 19.125C22.844 18.938 20.844 17.969 20.469 17.813C20.094 17.688 19.813 17.625 19.531 18C19.25 18.406 18.5 19.313 18.25 19.563C18 19.844 17.719 19.875 17.313 19.656C16.906 19.469 15.563 19.031 13.969 17.594C12.719 16.469 11.906 15.094 11.625 14.688C11.375 14.281 11.594 14.063 11.781 13.875C11.938 13.719 12.156 13.438 12.344 13.188C12.531 13 12.594 12.844 12.719 12.563C12.844 12.281 12.781 12.031 12.688 11.844C12.594 11.656 11.906 9.656 11.531 8.844C11.188 8.063 10.813 8.156 10.563 8.156H9.781C9.5 8.156 9.063 8.25 8.688 8.656C8.313 9.063 7.25 10.031 7.25 12.031C7.25 14.031 8.719 15.969 8.906 16.219C9.094 16.5 11.906 20.813 16.156 22.531C17.219 22.969 18.063 23.219 18.719 23.406C19.781 23.75 20.75 23.688 21.5 23.594C22.344 23.469 24 22.625 24.375 21.688C24.781 20.75 24.781 19.938 24.656 19.75C24.531 19.563 24.25 19.469 23.844 19.281L23.25 19.125Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </nav>

      <section className={styles.heroContent}>
        <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;Student Programs</div>
        <h1>
          AI Programs for
          <span>Future-Ready Students</span>
        </h1>
        <p>
          Hands-on learning experiences to help students build real AI skills,
          confidence, and curiosity.
        </p>
        <div className={styles.heroActions}>
          <a href="#programs" className={styles.primaryCta}>
            Explore Programs
            <span aria-hidden="true">→</span>
          </a>
          <Link to="/for-schools" className={styles.secondaryCta}>For Schools</Link>
        </div>
      </section>
    </header>

    <main className={styles.mainContent}>
      <section className={`${styles.statsPanel} ${styles.revealUp}`} data-student-reveal aria-label="Student program impact metrics">
        {stats.map((stat) => (
          <article className={styles.statItem} key={stat.label}>
            <span className={styles.statIcon}><Icon type={stat.icon} /></span>
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </article>
        ))}
      </section>

      <section className={`${styles.programsSection} ${styles.revealUp}`} data-student-reveal id="programs">
        <p className={styles.sectionKicker}>PROGRAMS DESIGNED FOR EVERY LEARNER</p>
        <h2>Explore Our Student Programs</h2>
        <p className={styles.sectionLead}>
          From beginners to advanced learners, our programs make AI learning engaging,
          practical, and future-focused.
        </p>

        <div className={styles.programGrid}>
          {programs.map((program) => (
            <article className={`${styles.programCard} ${styles.revealUp}`} data-student-reveal key={program.title}>
              <div className={styles.programImage}>
                <img src={program.image} alt="" />
              </div>
              <div className={styles.programBody}>
                <span className={styles.programIcon}><Icon type={program.icon} /></span>
                <div className={styles.programTitleRow}>
                  <h3>{program.title}</h3>
                  <span>{program.age}</span>
                </div>
                <p>{program.desc}</p>
                <ul>
                  {program.points.map((point) => (
                    <li key={point}>
                      <span><Icon type="safe" /></span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Learn More
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.benefitsSection} ${styles.revealUp}`} data-student-reveal>
        <div className={styles.benefitsIntro}>
          <p className={styles.sectionKicker}>WHY JOIN TATTVA-AI PROGRAMS?</p>
          <h2>Benefits That Go Beyond The Classroom</h2>
          <p>
            Our programs help students build the skills and mindset they need to thrive
            in an AI-powered world.
          </p>
          <Link to="/for-schools" className={styles.outlineCta}>
            For Schools
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <article className={`${styles.benefitItem} ${styles.revealUp}`} data-student-reveal key={benefit.title}>
              <span className={styles.benefitIcon}><Icon type={benefit.icon} /></span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.ctaBand} ${styles.revealUp}`} data-student-reveal>
        <img src={heroImage} alt="" />
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2>Ready to start your AI journey?</h2>
          <p>Join thousands of students who are building the future with AI skills today.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Explore Programs
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>

    <footer className={styles.siteFooter}>
      <div className={styles.footerBrand}>
        <Link to="/" className={styles.footerLogo}>
          <img src="/assets/icons/updated logoo (1).png" alt="" />
          <span>tattva-ai</span>
        </Link>
        <p>
          Empowering schools, teachers, and students to become AI-ready with practical
          learning and responsible technology adoption.
        </p>
        <div className={styles.socials}>
          <a href="https://instagram.com/tattvahq" className="footer-social-icon instagram-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span className="sr-only">Instagram</span>
          </a>
          <a href={whatsappUrl} className="footer-social-icon whatsapp-icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <span className="sr-only">WhatsApp</span>
          </a>
        </div>
      </div>

      <div className={styles.footerLinks}>
        <div>
          <h3>Programs</h3>
          <Link to="/for-schools">For Schools</Link>
          <Link to="/for-students">Student Programs</Link>
          <Link to="/faculty-training">Faculty Training</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/about">Our Leadership</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          <h3>Gallery</h3>
          <Link to="/projects">Events</Link>
        </div>
        <div>
          <h3>Get in Touch</h3>
          <a href="mailto:buildwithtattva@gmail.com">buildwithtattva@gmail.com</a>
          <a href="tel:+919652796537">+91 9652796537</a>
          <span>Hyderabad, India</span>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 Tattva AI. All rights reserved.</span>
        <span>Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Terms of Use</span>
      </div>
    </footer>
  </div>
  );
};

export default ForStudentsPage;
