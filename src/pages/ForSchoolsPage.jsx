import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Presentation,
  Cpu,
  Award,
  Laptop,
  Handshake,
  Users,
  School,
  MapPin,
  ShieldCheck,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import heroBg from '../assets/bento/school.png';
import slokaLogo from '../assets/bento/sloka-the-school-manikonda-logo.png';
import fbhisLogo from '../assets/bento/FBHIS-logo.png';
import stMartinsLogo from '../assets/bento/st martins no bg.png';
import stepsLogo from '../assets/bento/steps-the-school-miyapur-hyderabad-playgroups-11x0h1k7f1.avif';
import styles from './ForSchoolsPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const ecosystemCards = [
  {
    number: '01',
    title: 'AI Curriculum Integration',
    desc: 'Seamlessly integrate AI concepts into your existing curriculum across grades and subjects.',
    action: 'Explore Curriculum',
    featured: true,
    icon: <BookOpen size={24} strokeWidth={2} />
  },
  {
    number: '02',
    title: 'Teacher Enablement',
    desc: 'Equip educators with practical AI tools, resources, and teaching strategies.',
    action: 'Empower Teachers',
    icon: <Presentation size={24} strokeWidth={2} />
  },
  {
    number: '03',
    title: 'Student Innovation Programs',
    desc: 'Hands-on programs that build real-world skills, creativity, and AI confidence.',
    action: 'Explore Programs',
    icon: <Cpu size={24} strokeWidth={2} />
  },
  {
    number: '04',
    title: 'Assessments & Certification',
    desc: 'Evaluate learning outcomes with AI-driven assessments and recognized certifications.',
    action: 'View Certifications',
    icon: <Award size={24} strokeWidth={2} />
  },
  {
    number: '05',
    title: 'AI Labs & Infrastructure',
    desc: 'Set up future-ready AI labs with the right hardware, software, and learning environment.',
    action: 'Design AI Labs',
    icon: <Laptop size={24} strokeWidth={2} />
  },
  {
    number: '06',
    title: 'Long-Term Partnership',
    desc: 'Ongoing support, training, and strategic guidance for successful implementation and growth.',
    action: 'Partner With Us',
    icon: <Handshake size={24} strokeWidth={2} />
  }
];

const approachSteps = [
  {
    label: 'Learn',
    desc: 'Build AI foundations',
    icon: <BookOpen size={28} strokeWidth={2} />
  },
  {
    label: 'Enable',
    desc: 'Empower educators',
    icon: <GraduationCap size={28} strokeWidth={2} />
  },
  {
    label: 'Build',
    desc: 'Hands-on learning',
    icon: <Laptop size={28} strokeWidth={2} />
  },
  {
    label: 'Scale',
    desc: 'Sustained impact',
    icon: <TrendingUp size={28} strokeWidth={2} />
  }
];

const ecosystemImpact = [
  {
    value: '10+',
    label: 'Schools',
    icon: <School size={28} strokeWidth={2} />
  },
  {
    value: '1,000+',
    label: 'Students Impacted',
    icon: <Users size={28} strokeWidth={2} />
  },
  {
    value: '50+',
    label: 'Faculty Trained',
    icon: <GraduationCap size={28} strokeWidth={2} />
  },
  {
    value: '10',
    label: 'Cities',
    icon: <MapPin size={28} strokeWidth={2} />
  }
];

const trustedSchools = [
  { name: 'Sloka School', logo: slokaLogo },
  { name: 'FBHIS', logo: fbhisLogo },
  { name: 'St. Martins', logo: stMartinsLogo },
  { name: 'Steps School', logo: stepsLogo },
  { name: 'Tattva Partner School', initials: 'TP' },
  { name: 'AI Ready Campus', initials: 'AI' }
];

const ForSchoolsPage = () => {
  useEffect(() => {
    const animatedItems = document.querySelectorAll('[data-school-animate]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      animatedItems.forEach((item) => item.classList.add(styles.revealActive));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealActive);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 }
    );

    animatedItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
  <div className={styles.page}>
    <header className={styles.hero}>
      <img src={heroBg} alt="Future-ready school campus" className={styles.heroImage} />
      <div className={styles.heroOverlay} />

      <nav className={styles.nav} aria-label="Primary navigation">
        <Link to="/" className={styles.logoLink}>
          <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
          <span>tattva-ai</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/for-schools" className={styles.activeNav}>For Schools</Link>
          <Link to="/for-students">Student Programs</Link>
          <Link to="/international-students">International Students</Link>
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
        <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;For Schools</div>
        <h1>
          AI Education for
          <span>Future-Ready Schools</span>
        </h1>
        <p>
          Empower your school with AI-powered programs, training, and resources designed
          to build future-ready students and confident educators.
        </p>
        <div className={styles.heroActions}>
          <a href={whatsappUrl} className={styles.primaryCta} target="_blank" rel="noopener noreferrer">
            Book a School Demo
            <span aria-hidden="true">→</span>
          </a>
          <Link to="/for-students" className={styles.secondaryCta}>Explore Programs</Link>
        </div>
      </section>
    </header>

    <main className={styles.mainContent}>
      <section className={styles.ecosystemSection}>
        <p className={styles.sectionKicker}>WHY LEADING SCHOOLS PARTNER WITH TATTVA-AI</p>

        <div className={styles.ecosystemIntro} data-school-animate>
          <div>
            <h2>A Complete AI Learning Ecosystem for Schools</h2>
            <p>
              From curriculum integration to AI labs, we help schools create practical,
              scalable AI learning environments for students and educators.
            </p>
          </div>

          <div className={styles.approachPanel} aria-label="Tattva AI school partnership approach">
            <strong>Our Approach</strong>
            <div className={styles.approachSteps}>
              {approachSteps.map((step, index) => (
                <div
                  className={styles.approachStep}
                  key={step.label}
                  data-school-animate
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >
                  <span className={styles.approachIcon}>{step.icon}</span>
                  {index < approachSteps.length - 1 && <span className={styles.approachConnector} aria-hidden="true" />}
                  <b>{step.label}</b>
                  <small>{step.desc}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.ecosystemGrid}>
          {ecosystemCards.map((card, index) => (
            <article
              className={`${styles.ecosystemCard} ${card.featured ? styles.featuredCard : ''}`}
              key={card.title}
              data-school-animate
              style={{ '--reveal-delay': `${index * 85}ms` }}
            >
              <span className={styles.cardNumber}>{card.number}</span>
              <div className={styles.cardContent}>
                <span className={styles.cardIcon}>{card.icon}</span>
                <h3>{card.title}</h3>
                <span className={styles.cardRule} />
                <p>{card.desc}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {card.action}
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              {card.featured && (
                <div className={styles.featureArt} aria-hidden="true">
                  <span className={styles.orbitOne} />
                  <span className={styles.orbitTwo} />
                  <span className={styles.aiChip}>AI</span>
                  <span className={styles.graphPanel}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className={styles.ecosystemImpact} data-school-animate>
          <span className={styles.impactBadge}>
            <ShieldCheck size={28} strokeWidth={2} />
          </span>
          <p>Trusted by forward-thinking schools to drive AI adoption and prepare students for the future.</p>
          <div className={styles.impactMetrics}>
            {ecosystemImpact.map((item) => (
              <span className={styles.impactMetric} key={item.label}>
                {item.icon}
                <strong>{item.value}</strong>
                <small>{item.label}</small>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.testimonialBand} data-school-animate>
        <span className={styles.quoteMark}>“</span>
        <p>
          Tattva AI has been a game-changer for our school. Our students are more engaged,
          teachers are empowered, and we are preparing our community for the future.
        </p>
        <div className={styles.principal}>
          <span>T</span>
          <div>
            <strong>Principal Tanusree</strong>
            <small>Sloka The School</small>
          </div>
        </div>
      </section>

      <section className={styles.trustedSection} data-school-animate>
        <p className={styles.sectionKicker}>TRUSTED BY LEADING SCHOOLS</p>
        <div className={styles.logoGrid}>
          {trustedSchools.map((school, index) => (
            <span
              className={styles.schoolLogo}
              key={school.name}
              data-school-animate
              style={{ '--reveal-delay': `${index * 70}ms` }}
            >
              {school.logo ? <img src={school.logo} alt="" /> : <i>{school.initials}</i>}
              <strong>{school.name}</strong>
            </span>
          ))}
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
          Empowering schools, teachers, and students to become AI-ready with practical learning
          and responsible technology adoption.
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

export default ForSchoolsPage;
