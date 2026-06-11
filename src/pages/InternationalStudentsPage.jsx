import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Video,
  Users,
  Clock,
  BookOpen,
  Globe,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import heroImage from '../assets/bento/in4.png';
import explorersImage from '../assets/bento/in3.png';
import creatorsImage from '../assets/bento/in1.png';
import innovatorsImage from '../assets/bento/in2.png';
import mentorshipImage from '../assets/bento/in.png';
import styles from './InternationalStudentsPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const Icon = ({ type, size = 24, strokeWidth = 2, style }) => {
  const icons = {
    check: CheckCircle,
    live: Video,
    mentor: Users,
    clock: Clock,
    book: BookOpen,
    globe: Globe,
    student: GraduationCap,
    calendar: Calendar,
    mail: Mail,
    phone: Phone,
    chat: MessageSquare,
    arrow: ArrowRight
  };

  const IconComponent = icons[type] || HelpCircle;
  return <IconComponent size={size} strokeWidth={strokeWidth} style={style} />;
};

const highlightItems = [
  { title: 'Live Interactive', subtitle: 'Online Classes', icon: 'live' },
  { title: 'Expert', subtitle: 'AI Educators', icon: 'mentor' },
  { title: 'Flexible', subtitle: 'Timings', icon: 'clock' },
  { title: 'Personalized', subtitle: 'Learning', icon: 'book' },
  { title: 'Global', subtitle: 'Community', icon: 'globe' }
];

const programs = [
  {
    title: 'AI Explorers',
    age: 'Ages 8-12',
    image: explorersImage,
    icon: 'live',
    description: 'Fun and interactive classes that introduce kids to the world of AI through games and projects.',
    points: ['Intro to AI Concepts', 'Creative AI Projects', 'Build & Play']
  },
  {
    title: 'AI Creators',
    age: 'Ages 13-16',
    image: creatorsImage,
    icon: 'student',
    description: 'Dive deeper into AI and learn to build smart apps, models, and real-world solutions.',
    points: ['Machine Learning Basics', 'Python for AI', 'Hands-on Projects']
  },
  {
    title: 'AI Innovators',
    age: 'Ages 17+',
    image: innovatorsImage,
    icon: 'clock',
    description: 'Advanced AI concepts, real-world projects, and career-focused learning for young innovators.',
    points: ['Deep Learning', 'AI in Real World', 'Capstone Project']
  },
  {
    title: '1:1 AI Mentorship',
    age: 'All Ages',
    image: mentorshipImage,
    icon: 'globe',
    description: 'Personalized one-on-one sessions with expert mentors for focused learning and project support.',
    points: ['Custom Learning Path', 'Doubt Solving', 'Project Guidance']
  }
];

const benefits = [
  {
    title: 'Live Online Classes',
    description: 'Attend live, interactive sessions from anywhere.',
    icon: 'live'
  },
  {
    title: 'Flexible Schedule',
    description: 'Choose timings that fit your local time.',
    icon: 'clock'
  },
  {
    title: 'Expert Guidance',
    description: 'Learn from experienced AI educators and mentors.',
    icon: 'mentor'
  },
  {
    title: 'Hands-on Learning',
    description: 'Work on real projects and build your portfolio.',
    icon: 'book'
  },
  {
    title: 'Global Community',
    description: 'Connect with peers from around the world.',
    icon: 'globe'
  }
];

const steps = [
  {
    number: '1',
    title: 'Choose Your Program',
    description: 'Select the program that matches your age and goals.'
  },
  {
    number: '2',
    title: 'Pick a Convenient Time',
    description: 'Choose a batch timing that suits your schedule.'
  },
  {
    number: '3',
    title: 'Start Learning & Building',
    description: 'Join live classes and start your AI journey.'
  }
];

const useInternationalReveal = () => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-international-reveal]'));

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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
};

const InternationalStudentsPage = () => {
  useInternationalReveal();

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link to="/" className={styles.logoLink}>
            <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
            <span>tattva-ai</span>
          </Link>

          <div className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/for-schools">For Schools</Link>
            <Link to="/for-students">Student Programs</Link>
            <Link to="/international-students" className={styles.activeNav}>International Students</Link>
            <Link to="/faculty-training">Faculty Training</Link>
            <Link to="/projects">Gallery</Link>
            <Link to="/about">About</Link>
          </div>

          <div className={styles.navActions}>
            <a href={whatsappUrl} className={styles.demoButton} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
            <a href={whatsappUrl} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 0.156 7.125 0.156 15.875C0.156 18.656 0.906 21.375 2.281 23.75L0 32L8.5 29.75C10.781 31 13.375 31.656 16.031 31.656C24.781 31.656 32 24.531 32 15.781C32 11.531 30.281 7.65 27.281 4.65ZM16.031 29C13.656 29 11.344 28.375 9.344 27.219L8.875 26.938L3.844 28.219L5.156 23.344L4.844 22.844C3.563 20.75 2.875 18.344 2.875 15.875C2.875 8.625 8.781 2.719 16.031 2.719C19.531 2.719 22.813 4.094 25.281 6.594C27.75 9.094 29.156 12.375 29.156 15.875C29.281 23.125 23.281 29 16.031 29ZM23.25 19.125C22.844 18.938 20.844 17.969 20.469 17.813C20.094 17.688 19.813 17.625 19.531 18C19.25 18.406 18.5 19.313 18.25 19.563C18 19.844 17.719 19.875 17.313 19.656C16.906 19.469 15.563 19.031 13.969 17.594C12.719 16.469 11.906 15.094 11.625 14.688C11.375 14.281 11.594 14.063 11.781 13.875C11.938 13.719 12.156 13.438 12.344 13.188C12.531 13 12.594 12.844 12.719 12.563C12.844 12.281 12.781 12.031 12.688 11.844C12.594 11.656 11.906 9.656 11.531 8.844C11.188 8.063 10.813 8.156 10.563 8.156H9.781C9.5 8.156 9.063 8.25 8.688 8.656C8.313 9.063 7.25 10.031 7.25 12.031C7.25 14.031 8.719 15.969 8.906 16.219C9.094 16.5 11.906 20.813 16.156 22.531C17.219 22.969 18.063 23.219 18.719 23.406C19.781 23.75 20.75 23.688 21.5 23.594C22.344 23.469 24 22.625 24.375 21.688C24.781 20.75 24.781 19.938 24.656 19.75C24.531 19.563 24.25 19.469 23.844 19.281L23.25 19.125Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={`${styles.heroCopy} ${styles.revealUp}`} data-international-reveal>
            <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;International Students</div>
            <h1>
              AI Education for
              <span>International Students</span>
            </h1>
            <p>Live, interactive online AI classes for students anywhere in the world.</p>

            <ul className={styles.heroChecklist}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <Icon type="check" size={18} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0, marginRight: '8px' }} />
                Learn from expert educators
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <Icon type="check" size={18} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0, marginRight: '8px' }} />
                Flexible timings that suit your schedule
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <Icon type="check" size={18} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0, marginRight: '8px' }} />
                Personalized learning experience
              </li>
            </ul>

            <div className={styles.heroActions}>
              <a href="#programs" className={styles.primaryCta}>
                Explore Programs
                <span aria-hidden="true"><Icon type="arrow" /></span>
              </a>
              <Link to="/contact" className={styles.secondaryCta}>Contact Us</Link>
            </div>
          </div>

          <div className={`${styles.heroVisual} ${styles.revealUp}`} data-international-reveal>
            <img src={heroImage} alt="International student learning AI online" className={styles.heroImage} />
            <aside className={styles.heroInfoCard}>
              <span className={styles.infoIcon}><Icon type="globe" /></span>
              <div>
                <strong>Learn AI From Anywhere</strong>
                <span>At Your Convenient Time</span>
              </div>
            </aside>
          </div>
        </section>

        <section className={`${styles.featureStrip} ${styles.revealUp}`} data-international-reveal aria-label="Program highlights">
          {highlightItems.map((item) => (
            <article className={styles.featureItem} key={item.title}>
              <span className={styles.featureIcon}><Icon type={item.icon} /></span>
              <div className={styles.featureText}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </div>
            </article>
          ))}
        </section>

        <section className={`${styles.programsSection} ${styles.revealUp}`} data-international-reveal id="programs">
          <p className={styles.sectionKicker}>OUR STUDENT PROGRAMS</p>
          <h2>Learn AI the Smart Way</h2>
          <p className={styles.sectionLead}>
            Our online programs are designed to build real-world AI skills through
            hands-on projects, engaging lessons, and personalized guidance.
          </p>

          <div className={styles.programGrid}>
            {programs.map((program) => (
              <article className={`${styles.programCard} ${styles.revealUp}`} data-international-reveal key={program.title}>
                <div className={styles.programImageWrap}>
                  <img src={program.image} alt={program.title} />
                </div>
                <span className={styles.programIcon}><Icon type={program.icon} /></span>
                <div className={styles.programBody}>
                  <h3>{program.title}</h3>
                  <span className={styles.programAge}>{program.age}</span>
                  <p>{program.description}</p>
                  <ul>
                    {program.points.map((point) => (
                      <li key={point}>
                        <Icon type="check" size={16} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0, marginRight: '8px' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.learnMore}>
                    Learn More
                    <span aria-hidden="true"><Icon type="arrow" /></span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.benefitsSection} ${styles.revealUp}`} data-international-reveal>
          <p className={styles.sectionKicker}>WHY LEARN WITH TATTVA-AI?</p>
          <h2>Designed for International Students</h2>

          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article className={`${styles.benefitItem} ${styles.revealUp}`} data-international-reveal key={benefit.title}>
                <span className={styles.benefitIcon}><Icon type={benefit.icon} /></span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.stepsSection}>
          <div className={`${styles.stepsColumn} ${styles.revealUp}`} data-international-reveal>
            <p className={styles.sectionKicker}>HOW IT WORKS</p>
            <h2>Simple Steps to Get Started</h2>

            <div className={styles.stepList}>
              {steps.map((step, index) => (
                <article className={`${styles.stepItem} ${styles.revealUp}`} data-international-reveal key={step.number}>
                  <div className={styles.stepBadge}>{step.number}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < steps.length - 1 ? <span className={styles.stepLine} aria-hidden="true" /> : null}
                </article>
              ))}
            </div>
          </div>

          <article className={`${styles.scheduleCard} ${styles.revealUp}`} data-international-reveal>
            <span className={styles.scheduleIcon}><Icon type="calendar" /></span>
            <h3>We Teach at Your Convenient Time</h3>
            <p>
              No matter where you are, we&apos;ll find a time that works best for you.
              Morning, evening, or weekend, you choose.
            </p>
          </article>

          <article className={`${styles.contactCard} ${styles.revealUp}`} data-international-reveal>
            <p className={styles.contactKicker}>Want to Know More?</p>
            <h3>Contact Us</h3>
            <p className={styles.contactText}>
              Have questions or need help choosing the right program? We&apos;re here to help!
            </p>

            <div className={styles.contactList}>
              <a href="mailto:buildwithtattva@gmail.com">
                <span><Icon type="mail" /></span>
                buildwithtattva@gmail.com
              </a>
              <a href="tel:+919652796537">
                <span><Icon type="phone" /></span>
                +91 9652796537
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <span><Icon type="chat" /></span>
                WhatsApp Us
              </a>
            </div>

            <Link to="/contact" className={styles.contactCta}>
              Get in Touch
              <span aria-hidden="true"><Icon type="arrow" /></span>
            </Link>
          </article>
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
            learning and technology adoption.
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
            <Link to="/international-students">International Students</Link>
            <Link to="/faculty-training">Faculty Training</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <span>Our Leadership</span>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div>
            <h3>Resources</h3>
            <span>Blogs</span>
            <span>Guides</span>
            <span>FAQs</span>
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

export default InternationalStudentsPage;
