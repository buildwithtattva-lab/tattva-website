import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/bento/m6.png';
import missionImage from '../assets/bento/m1.png';
import storyImage from '../assets/bento/t4.png';
import nagaprasadImage from '../assets/team/nagaprasad.png';
import sudhaImage from '../assets/team/sudha mam.png';
import styles from './AboutPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const stats = [
  { value: '10+', label: 'Partner Schools', icon: 'school' },
  { value: '1,000+', label: 'Students Impacted', icon: 'students' },
  { value: '50+', label: 'Faculty Trained', icon: 'cap' },
  { value: '10+', label: 'Programs Offered', icon: 'badge' },
  { value: '2+', label: 'Years of Impact', icon: 'medal' }
];

const values = [
  {
    title: 'Innovation',
    body: 'We embrace creativity and new ideas to solve real-world challenges.',
    icon: 'bulb'
  },
  {
    title: 'Empowerment',
    body: 'We equip students and educators with skills and confidence to lead the future.',
    icon: 'students'
  },
  {
    title: 'Collaboration',
    body: 'We work with schools, educators, and communities to create lasting impact.',
    icon: 'hands'
  },
  {
    title: 'Integrity',
    body: 'We stay committed to transparency, trust, and ethical practices in everything we do.',
    icon: 'shield'
  },
  {
    title: 'Future-Ready',
    body: 'We prepare learners today for the opportunities of tomorrow.',
    icon: 'rocket'
  }
];

const team = [
  { name: 'Nagaprasad', image: nagaprasadImage },
  { name: 'Akanksha' },
  { name: 'Jessica' },
  { name: 'Tejaswini' },
  { name: 'Manoj' },
  { name: 'Sudha Harikishan', image: sudhaImage },
  { name: 'Navtej' },
  { name: 'Hari' }
];

const Icon = ({ type }) => {
  const icons = {
    school: <path d="M6 25h20M8 25V12l8-5 8 5v13M13 25v-7h6v7M11 15h3M18 15h3M15 11h2" />,
    students: <path d="M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 15a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM4 26c1-5 4-8 7-8s6 3 7 8M16 25c.8-4 3-6 5-6 2.5 0 5 2.5 6 7" />,
    cap: <path d="m4 12 12-6 12 6-12 6-12-6ZM9 15v6c2 2 4.5 3 7 3s5-1 7-3v-6M27 13v7" />,
    badge: <path d="M16 4a8 8 0 0 1 8 8c0 5-8 16-8 16S8 17 8 12a8 8 0 0 1 8-8ZM13 12l2 2 4-5" />,
    medal: <path d="M11 5h10l-3 7h-4L11 5ZM16 13a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM16 16l1.2 2.4 2.6.4-1.9 1.9.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.9 2.6-.4L16 16Z" />,
    target: <path d="M16 27a11 11 0 1 1 11-11M16 22a6 6 0 1 1 6-6M16 17a1 1 0 1 1 1-1M20 12l6-6M22 6h4v4" />,
    bulb: <path d="M11 20c-2-1.6-3-3.8-3-6a8 8 0 1 1 16 0c0 2.2-1 4.4-3 6M12 24h8M13 28h6M14 20h4M14 11l2-3 2 3" />,
    hands: <path d="M8 17l5 5c1.2 1.2 3 1.2 4.2 0l6.8-6.8a3 3 0 0 0-4.2-4.2l-4.7 4.7M14 16l-2-2a3 3 0 0 0-4.2 0L5 16.8M20 22l2 2M15 23l2 2M10 22l2 2" />,
    shield: <path d="M16 4 26 8v7c0 6-4 10-10 13C10 25 6 21 6 15V8l10-4ZM12 16l3 3 6-7" />,
    rocket: <path d="M12 20 6 26l2-7M20 12l7-7c-7 0-13 3-16 9l-4 1 5 5 5 5 1-4c6-3 9-9 9-16M18 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />,
    whatsapp: <path d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6-1.6A12 12 0 1 0 16 4ZM11 10c.4 0 1 .1 1.2.8l.8 2c.2.5 0 .8-.3 1.1l-.6.7c.9 1.7 2.2 3 4 3.9l.8-.9c.3-.4.7-.5 1.2-.3l2 .9c.6.3.8.8.7 1.3-.2 1.2-1.2 2-2.5 2-4.2 0-9.7-5.3-9.7-9.8 0-1 .9-1.7 1.7-1.7H11Z" />
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {icons[type]}
    </svg>
  );
};

const AboutPage = () => {
  useEffect(() => {
    const animatedItems = document.querySelectorAll('[data-about-animate]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      animatedItems.forEach((item) => item.classList.add(styles.revealActive));
      return undefined;
    }

    let observer;
    let ticking = false;

    const revealItem = (item) => {
      item.classList.add(styles.revealActive);
      observer?.unobserve(item);
    };

    const revealPassedItems = () => {
      animatedItems.forEach((item) => {
        if (item.classList.contains(styles.revealActive)) {
          return;
        }

        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
          revealItem(item);
        }
      });
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        revealPassedItems();
        ticking = false;
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealItem(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.14 }
    );

    animatedItems.forEach((item) => observer.observe(item));
    revealPassedItems();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.aboutPage}>
    <header className={styles.hero}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link to="/" className={styles.logoLink}>
          <img src="/assets/icons/updated logoo (1).png" alt="" />
          <span>tattva-ai</span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/for-schools">For Schools</Link>
          <Link to="/for-students">Student Programs</Link>
          <Link to="/international-students">International Students</Link>
          <Link to="/faculty-training">Faculty Training</Link>
          <Link to="/projects">Gallery</Link>
          <Link to="/about" className={styles.activeNav}>About</Link>
        </div>

        <div className={styles.navActions}>
          <a href={whatsappUrl} className={styles.demoButton} target="_blank" rel="noopener noreferrer">
            Book a Demo
          </a>
          <a href={whatsappUrl} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <Icon type="whatsapp" />
          </a>
        </div>
      </nav>

      <section className={styles.heroStage}>
        <div className={styles.heroCopy}>
          <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;About Us</div>
          <h1>
            About <span>Tattva-AI</span>
          </h1>
          <p>
            We are on a mission to empower schools, educators, and students with
            practical AI education that builds skills for the future.
          </p>
        </div>

        <div className={styles.heroImage} aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
      </section>
    </header>

    <main>
      <section className={styles.statsPanel} aria-label="Tattva-AI impact numbers" data-about-animate>
        {stats.map((item, index) => (
          <div className={styles.statItem} key={item.label} data-about-animate style={{ '--reveal-delay': `${index * 70}ms` }}>
            <span className={styles.iconBubble}>
              <Icon type={item.icon} />
            </span>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.missionSection} data-about-animate>
        <div className={styles.missionText} data-about-animate>
          <p className={styles.kicker}>Our Mission</p>
          <h2>Building an AI-Ready Generation</h2>
          <p>
            At Tattva-AI, we believe AI is not just a technology. It is a
            mindset. Our mission is to make AI education accessible, engaging,
            and impactful for every learner and educator.
          </p>

          <div className={styles.visionCard} data-about-animate>
            <span className={styles.largeIcon}>
              <Icon type="target" />
            </span>
            <div>
              <h3>Our Vision</h3>
              <p>
                A world where every student and educator is empowered to create,
                innovate, and lead with AI.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.missionImage} data-about-animate>
          <img src={missionImage} alt="Students learning with a Tattva-AI educator" />
        </div>
      </section>

      <section className={styles.valuesSection} data-about-animate>
        <p className={styles.kicker}>Our Values</p>
        <h2>What Drives Us</h2>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <article className={styles.valueItem} key={value.title} data-about-animate style={{ '--reveal-delay': `${index * 80}ms` }}>
              <span className={styles.iconBubble}>
                <Icon type={value.icon} />
              </span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storySection} data-about-animate>
        <div className={styles.storyCopy} data-about-animate>
          <p className={styles.kicker}>Our Story</p>
          <h2>The Journey So Far</h2>
          <p>
            Tattva-AI was founded by a team of educators, technologists, and
            industry experts who saw the urgent need for practical AI education
            in schools.
          </p>
          <p>
            Since then, we have partnered with schools across the country to
            deliver hands-on learning experiences that inspire curiosity and
            build future-ready skills.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.storyCta}>
            Join Our Mission
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
        <img src={storyImage} alt="Tattva-AI educator leading an AI classroom session" />
      </section>

      <section className={styles.teamSection} data-about-animate>
        <div className={styles.teamIntro} data-about-animate>
          <p className={styles.kicker}>Meet the Team</p>
          <h2>The People Behind Tattva-AI</h2>
          <p>
            A passionate team of educators, technologists, and innovators
            working together to make AI education meaningful and accessible.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, index) => (
            <article className={styles.teamCard} key={member.name} data-about-animate style={{ '--reveal-delay': `${index * 75}ms` }}>
              <div className={`${styles.avatar} ${member.image ? styles.photoAvatar : styles[`avatar${(index % 4) + 1}`]}`}>
                {member.image ? (
                  <img className={styles.avatarPhoto} src={member.image} alt={member.name} />
                ) : (
                  <>
                    <span className={styles.avatarHair} />
                    <span className={styles.avatarFace}>
                      <span className={styles.avatarEyes} />
                      <span className={styles.avatarSmile} />
                    </span>
                    <span className={styles.avatarLeaf} />
                  </>
                )}
              </div>
              <h3>{member.name}</h3>
            </article>
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
          Empowering schools, teachers, and students to become AI-ready with
          practical learning and responsible technology adoption.
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

export default AboutPage;
