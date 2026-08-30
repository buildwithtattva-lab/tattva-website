import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Presentation,
  School,
  ClipboardList,
  Trophy,
  Award,
  BookOpen,
  Wrench,
  Cpu,
  Rocket,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
  Quote,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import heroImage from '../assets/images/t8.png';
import foundationsImage from '../assets/images/t4.png';
import toolsImage from '../assets/images/t7.png';
import designImage from '../assets/images/t6.png';
import leadershipImage from '../assets/images/t5.png';
import benefitsImage from '../assets/images/t1.png';
import styles from './FacultyTrainingPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const Icon = ({ type, size = 24, strokeWidth = 2, style }) => {
  const icons = {
    board: Presentation,
    school: School,
    program: ClipboardList,
    trophy: Trophy,
    medal: Award,
    book: BookOpen,
    tools: Wrench,
    learning: Cpu,
    rocket: Rocket,
    time: Clock,
    teach: MessageSquare,
    grow: TrendingUp,
    community: Users,
    quote: Quote,
    check: ShieldCheck
  };

  const IconComponent = icons[type] || HelpCircle;
  return <IconComponent size={size} strokeWidth={strokeWidth} style={style} />;
};

const stats = [
  { value: '50+', label: 'Faculty Trained', icon: 'board' },
  { value: '10+', label: 'Partner Schools', icon: 'school' },
  { value: '10+', label: 'Training Programs', icon: 'program' },
  { value: '98%', label: 'Participant Satisfaction', icon: 'trophy' },
  { value: '2+', label: 'Years of Impact', icon: 'medal' }
];

const programs = [
  {
    title: 'AI Foundations for Educators',
    image: foundationsImage,
    icon: 'book',
    desc: 'Build a strong foundation in AI concepts and their applications in education.',
    points: ['Introduction to AI', 'Real-world Use Cases', 'Ethics & Responsible AI']
  },
  {
    title: 'AI Tools for the Classroom',
    image: toolsImage,
    icon: 'tools',
    desc: 'Explore practical AI tools to create engaging and effective learning experiences.',
    points: ['AI Tools & Platforms', 'Lesson Planning with AI', 'Productivity & Automation']
  },
  {
    title: 'Designing AI-Powered Learning',
    image: designImage,
    icon: 'learning',
    desc: 'Learn strategies to integrate AI into curriculum and assessments.',
    points: ['Personalized Learning', 'Intelligent Assessments', 'Project-Based Learning']
  },
  {
    title: 'AI Leadership for Educators',
    image: leadershipImage,
    icon: 'rocket',
    desc: 'Empower educators to lead innovation and drive AI adoption in schools.',
    points: ['Change Leadership', 'Policy & Implementation', 'Building Future-Ready Schools']
  }
];

const benefits = [
  { title: 'Save Time', desc: 'Use AI tools to automate tasks and enhance productivity.', icon: 'time' },
  { title: 'Enhance Teaching', desc: 'Create engaging, personalized, and effective learning experiences.', icon: 'teach' },
  { title: 'Grow Professionally', desc: 'Strengthen your skills and boost your career.', icon: 'grow' },
  { title: 'Stay Future-Ready', desc: 'Stay ahead with the latest AI trends and best practices.', icon: 'community' },
  { title: 'Join a Community', desc: 'Connect with a network of future-ready educators.', icon: 'school' }
];

const testimonials = [
  ['The training was practical, engaging, and opened my eyes to the real potential of AI in education.', 'Priya Sharma', 'Computer Science Teacher'],
  ['I now feel confident using AI tools in my classroom. It has transformed the way I teach and engage with students.', 'Rajesh Verma', 'Physics Teacher'],
  ['Excellent program. The sessions were well-structured and filled with hands-on activities I can use right away.', 'Anjali Mehta', 'Academic Coordinator']
];

const useFacultyReveal = () => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-faculty-reveal]'));

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
      { threshold: 0.05, rootMargin: '0px 0px 12% 0px' }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
};

const FacultyTrainingPage = () => {
  useFacultyReveal();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <img src={heroImage} alt="Faculty training session on AI in education" className={styles.heroImage} />
        <div className={styles.heroOverlay} />

        <nav className={styles.nav} aria-label="Primary navigation">
          <Link to="/" className={styles.logoLink}>
            <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
            <span>tattva-ai</span>
          </Link>

          <div className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/for-schools">For Schools</Link>
            <Link to="/for-students">Student Programs</Link>
            <Link to="/faculty-training" className={styles.activeNav}>Faculty Training</Link>
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
          <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;Faculty Training</div>
          <h1>
            Empowering Educators
            <span>to Lead the AI Future</span>
          </h1>
          <p>
            Practical training programs designed to help teachers build AI knowledge,
            confidence, and classroom-ready skills.
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
        <section className={`${styles.statsPanel} ${styles.revealUp}`} data-faculty-reveal aria-label="Faculty training impact metrics">
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

        <section className={`${styles.programsSection} ${styles.revealUp}`} data-faculty-reveal id="programs">
          <p className={styles.sectionKicker}>PRACTICAL. RELEVANT. IMPACTFUL.</p>
          <h2>Our Faculty Training Programs</h2>
          <p className={styles.sectionLead}>
            Hands-on programs that equip educators with the skills and tools to integrate
            AI meaningfully in teaching and learning.
          </p>

          <div className={styles.programGrid}>
            {programs.map((program) => (
              <article className={`${styles.programCard} ${styles.revealUp}`} data-faculty-reveal key={program.title}>
                <div className={styles.programImage}>
                  <img src={program.image} alt="" />
                </div>
                <div className={styles.programBody}>
                  <span className={styles.programIcon}><Icon type={program.icon} /></span>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                  <ul>
                    {program.points.map((point) => (
                      <li key={point}>
                        <Icon type="check" size={18} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0, marginRight: '8px' }} />
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

        <section className={`${styles.benefitsPanel} ${styles.revealUp}`} data-faculty-reveal>
          <div className={styles.benefitsIntro}>
            <p className={styles.sectionKicker}>WHY TRAIN WITH TATTVA-AI?</p>
            <h2>Benefits for Educators</h2>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article className={styles.benefitItem} key={benefit.title}>
                <span className={styles.benefitIcon}><Icon type={benefit.icon} /></span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <img src={benefitsImage} alt="" className={styles.benefitImage} />
        </section>

        <section className={`${styles.testimonialsSection} ${styles.revealUp}`} data-faculty-reveal>
          <div>
            <p className={styles.sectionKicker}>VOICES OF EDUCATORS</p>
            <h2>What Our Faculty Say</h2>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map(([quote, name, role], index) => (
              <article className={styles.testimonialCard} key={name}>
                <span className={styles.quoteIcon}><Icon type="quote" /></span>
                <p>{quote}</p>
                <div className={styles.authorRow}>
                  <span>{name.split(' ').map((part) => part[0]).join('')}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{role}</small>
                  </div>
                </div>
              </article>
            ))}

            <aside className={styles.schoolCta}>
              <span className={styles.benefitIcon}><Icon type="school" /></span>
              <h3>Bring AI Training to Your School</h3>
              <p>Empower your faculty with customized training programs designed for your school's needs.</p>
              <Link to="/for-schools">
                For Schools
                <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </section>

        <section className={`${styles.ctaBand} ${styles.revealUp}`} data-faculty-reveal>
          <img src={heroImage} alt="" />
          <div className={styles.ctaOverlay} />
          <div className={styles.ctaContent}>
            <h2>Empower Your Faculty Today</h2>
            <p>Invest in your educators and build a future-ready learning environment for every student.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Book a Demo
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
            <a href="mailto:team@tattva-ai.in">team@tattva-ai.in</a>
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

export default FacultyTrainingPage;
