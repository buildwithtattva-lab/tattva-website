import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/bento/herosection.png';
import summerCampImg from '../assets/bento/v2.png';
import facultyTrainingImg from '../assets/bento/v3.png';
import certificatesImg from '../assets/bento/v4.png';
import consultingImg from '../assets/bento/v5.png';
import projectLabImg from '../assets/bento/v6.png';
import studentProgramImg from '../assets/bento/v7.png';
import roboticsImg from '../assets/bento/v8.png';
import slokaLogo from '../assets/bento/sloka-the-school-manikonda-logo.png';
import fbhisLogo from '../assets/bento/FBHIS-logo.png';
import stMartinsLogo from '../assets/bento/st martins no bg.png';
import stepsLogo from '../assets/bento/steps-the-school-miyapur-hyderabad-playgroups-11x0h1k7f1.avif';
import sudhaPortraitImg from '../assets/team/sudha mam.png';
import styles from './HomePage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const stats = [
  {
    value: 10,
    suffix: '+',
    label: 'Partner Schools',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 27h22M8 27V11l8-5 8 5v16M13 27v-7h6v7M11 15h3M18 15h3M11 20h3M18 20h3" />
      </svg>
    )
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Students Impacted',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M11 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM21 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 27c1-5 4-8 8-8s7 3 8 8M17 26c1-4 3-6 6-6 2.5 0 4.5 1.7 6 5" />
      </svg>
    )
  },
  {
    value: 98,
    suffix: '%',
    label: 'Program Satisfaction',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 10h16v12H8zM13 22l-2 5M19 22l2 5M11 27h10M16 13v6M13 16h6M25 14h3v5h-3M4 14h4v5H4" />
      </svg>
    )
  },
  {
    value: 50,
    suffix: '+',
    label: 'Faculty Trained',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 25v-3a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v3M10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 8h10v12H18zM21 12h4M21 16h3" />
      </svg>
    )
  },
  {
    value: 10,
    suffix: '+',
    label: 'AI Programs',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 27h22M7 27l9-19 9 19M11 19h10M13 27v-5h6v5M16 8v-4M16 4h6" />
      </svg>
    )
  }
];

const needs = [
  {
    label: 'Students are curious about AI and using it every day.',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M11 25V12a5 5 0 0 1 10 0v13M11 17H8a4 4 0 0 1 0-8h3M21 17h3a4 4 0 0 0 0-8h-3M13 25h6M16 9v16M8 21a3 3 0 0 0 3 3M24 21a3 3 0 0 1-3 3" />
      </svg>
    )
  },
  {
    label: 'Teachers need practical training and classroom support.',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 27a9 9 0 0 1 18 0M11 24l3-4 2 3 2-3 3 4M6 12l-3 3M26 12l3 3" />
      </svg>
    )
  },
  {
    label: 'Schools need a clear plan to implement AI education.',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 27h22M8 27V11l8-5 8 5v16M12 27v-7h8v7M12 15h8" />
      </svg>
    )
  },
  {
    label: 'Parents want skills that prepare children for the future.',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 27a7 7 0 0 1 14 0M15 27a7 7 0 0 1 14 0" />
      </svg>
    )
  }
];

const offers = [
  {
    title: 'AI Programs for Students',
    description: 'Hands-on learning, real projects, and future-ready AI skills.',
    image: studentProgramImg,
    imagePosition: 'center 48%'
  },
  {
    title: 'Faculty AI Training',
    description: 'Practical AI tools and strategies for modern classrooms.',
    image: facultyTrainingImg,
    imagePosition: 'center 48%'
  },
  {
    title: 'School AI Readiness Consulting',
    description: 'End-to-end support for curriculum, infrastructure, and implementation.',
    image: consultingImg,
    imagePosition: 'center 50%'
  },
  {
    title: 'AI Programs & Workshops',
    description: 'Immersive and fun AI camps for creativity and exploration.',
    image: summerCampImg,
    imagePosition: 'center 32%'
  }
];

const learningSteps = [
  { step: '01', title: 'AI Awareness', desc: 'Understand AI, its applications, and real-world impact.', icon: 'iconHead' },
  { step: '02', title: 'Prompting & Responsible Use', desc: 'Learn effective prompting and ethical AI usage.', icon: 'iconPrompt' },
  { step: '03', title: 'Data & Automation', desc: 'Work with data and automate everyday tasks with AI tools.', icon: 'iconData' },
  { step: '04', title: 'No-code AI Projects', desc: 'Build AI apps and solutions using no-code platforms.', icon: 'iconLayers' },
  { step: '05', title: 'Coding with AI', desc: 'Use Python and AI libraries to build intelligent applications.', icon: 'iconCode' },
  { step: '06', title: 'Capstone Projects', desc: 'Solve real-world problems and build portfolio-worthy projects.', icon: 'iconTrophy' }
];

const campFeatures = [
  { label: 'Live Workshops', icon: 'iconWorkshop' },
  { label: 'AI Projects', icon: 'iconProject' },
  { label: 'Team Challenges', icon: 'iconTeam' },
  { label: 'Certificates', icon: 'iconCertificate' },
  { label: 'Fun & Exploration', icon: 'iconSpark' }
];

const campGallery = [
  {
    title: 'Building AI Robots',
    subtitle: 'Robotics Workshop',
    image: roboticsImg,
    className: 'campLarge'
  },
  {
    title: 'AI App Building',
    subtitle: 'No-code Projects',
    image: studentProgramImg
  },
  {
    title: 'Certificates & Celebration',
    subtitle: 'Proud Moments',
    image: certificatesImg,
    className: 'campTall'
  },
  {
    title: 'Creative with AI',
    subtitle: 'Design & Generative AI',
    image: projectLabImg
  }
];

const teacherFeatures = [
  { label: 'AI for Lesson Planning', icon: 'iconLesson' },
  { label: 'Assessment Support', icon: 'iconAssessment' },
  { label: 'Classroom Activities', icon: 'iconClassroom' },
  { label: 'Productivity Workflows', icon: 'iconWorkflow' },
  { label: 'Responsible & Ethical AI', icon: 'iconEthics' }
];

const outcomes = [
  { label: 'Students build real AI projects', icon: 'iconProject' },
  { label: 'Teachers save time with AI workflows', icon: 'iconWorkflow' },
  { label: 'Schools get structured AI adoption', icon: 'iconSchool' },
  { label: 'Parents see visible future-readiness', icon: 'iconTeam' },
  { label: 'Leadership gets clear implementation plan', icon: 'iconPlan' },
  { label: 'Confident classrooms ready for tomorrow', icon: 'iconClassroom' }
];

const testimonials = [
  ['The AI program by Tattva AI has transformed the way our students learn. The hands-on projects and workshops are exceptional!', 'Principal Tanusree', 'Sloka The School'],
  ['The faculty training was practical, easy to apply, and extremely useful for our daily classroom teaching.', 'Teacher', 'Ryan International School'],
  ['My son loved the AI workshop. He built his own app and came home excited every day.', 'Parent', 'Bangalore']
];

const institutions = [
  { name: 'Sloka School', logo: slokaLogo },
  { name: 'FBHIS', logo: fbhisLogo },
  { name: 'St. Martins', logo: stMartinsLogo },
  { name: 'Steps School', logo: stepsLogo }
];

const faqsLeft = [
  {
    question: 'Is this suitable for CBSE, ICSE, and state government schools?',
    answer: 'Yes. These AI programs are suitable for CBSE, ICSE, SSC, and state government schools. CBSE has made AI education mandatory, and SSC and ICSE schools can also adopt these programs based on their academic requirements.'
  },
  {
    question: 'Which classes can join the programs?',
    answer: 'Students from Class 3 to Class 10 can join the programs.'
  },
  {
    question: 'Do students need coding experience?',
    answer: 'No. Students do not need coding experience to begin. If they already know coding, it will be helpful for advanced activities and projects.'
  },
  {
    question: 'Do teachers need technical knowledge?',
    answer: 'No. Teachers do not need technical knowledge to attend the training. If they already have technical knowledge, that is an added advantage.'
  }
];

const faqsRight = [
  {
    question: 'Can you conduct programs on a school campus?',
    answer: 'Definitely. We can conduct programs on your school campus, and we also offer on-campus classes based on the school schedule.'
  },
  {
    question: 'Do you provide certificates?',
    answer: 'Yes. We provide participation certificates. Students who perform especially well can also receive separate achievement recognition and medals.'
  },
  {
    question: 'Can programs be customized for our school?',
    answer: 'Yes. We can customize the program according to your school requirements, grade levels, schedule, and learning goals.'
  },
  {
    question: 'How do we get started?',
    answer: 'You can contact us through WhatsApp or mail us, and our team will guide you through the next steps.'
  }
];

const formatStatValue = (value, suffix = '') => `${new Intl.NumberFormat('en-IN').format(value)}${suffix}`;

const AnimatedStatValue = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef(null);

  useEffect(() => {
    const node = valueRef.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setDisplayValue(value);
      return undefined;
    }

    let frameId;
    const duration = 1100;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };

        frameId = requestAnimationFrame(animate);
        observer.unobserve(entry.target);
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <strong ref={valueRef}>{formatStatValue(displayValue, suffix)}</strong>;
};

const HomePage = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowWhatsApp((isVisible) => (isVisible === shouldShow ? isVisible : shouldShow));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!revealElements.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add(styles.revealVisible));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.revealVisible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        <img
          src={heroImage}
          alt="Students learning AI with a laptop and robotics kit"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <nav className={styles.nav} aria-label="Primary navigation">
          <Link to="/" className={styles.logoLink}>
            <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
            <span>tattva-ai</span>
          </Link>

          <div className={styles.navLinks}>
            <Link to="/" className={styles.activeNav}>Home</Link>
            <Link to="/for-schools">For Schools</Link>
            <Link to="/for-students">Student Programs</Link>
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

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>AI EDUCATION FOR THE NEXT GENERATION</p>
          <h1>
            Make Your School
            <span>AI-Ready</span>
          </h1>
          <p className={styles.heroLead}>Practical AI programs for students, teachers, and institutions.</p>
          <p className={styles.heroCopy}>
            We help schools introduce responsible and hands-on AI learning through student programs,
            faculty training, and implementation support.
          </p>
          <div className={styles.heroActions}>
            <a href={whatsappUrl} className={styles.primaryCta} target="_blank" rel="noopener noreferrer">
              Book a School Demo
              <span aria-hidden="true">→</span>
            </a>
            <Link to="/for-students" className={styles.secondaryCta}>Explore Programs</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={`${styles.statsStrip} ${styles.reveal}`} data-reveal aria-label="Tattva AI impact metrics">
          <div className={styles.statsGrid}>
            {stats.map((item, index) => (
              <div
                className={`${styles.statItem} ${styles.reveal}`}
                style={{ '--reveal-delay': `${index * 70}ms` }}
                data-reveal
                key={item.label}
              >
                <span className={styles.statIcon}>{item.icon}</span>
                <span className={styles.statText}>
                  <AnimatedStatValue value={item.value} suffix={item.suffix} />
                  <span>{item.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.overviewSection} ${styles.reveal}`} data-reveal>
          <div className={`${styles.needPanel} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>THE NEED</p>
            <h2>AI Is Entering Classrooms Faster Than Schools Can Adapt</h2>
            <p className={styles.sectionIntro}>
              Students are already using AI tools. Teachers need confidence and clarity.
              Schools need a structured approach. Parents expect future-ready learning.
            </p>

            <div className={styles.needGrid}>
              {needs.map((item, index) => (
                <div
                  className={`${styles.needItem} ${styles.reveal}`}
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                  data-reveal
                  key={item.label}
                >
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.offersPanel} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>OUR SOLUTIONS</p>
            <h2>What Tattva AI Offers</h2>

            <div className={styles.offerGrid}>
              {offers.map((item, index) => (
                <article
                  className={`${styles.offerCard} ${styles.reveal}`}
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                  data-reveal
                  key={item.title}
                >
                  <img src={item.image} alt="" style={{ objectPosition: item.imagePosition }} />
                  <div className={styles.offerBody}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link to="/for-schools">
                      Learn More
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.learningPath} ${styles.reveal}`} data-reveal>
          <div className={`${styles.pathIntro} ${styles.reveal}`} data-reveal>
            <p className={styles.darkKicker}>LEARNING PATH</p>
            <h2>A Structured Journey From Curiosity to Creation</h2>
            <p>
              Our progressive learning path ensures students gain conceptual understanding,
              hands-on experience, and the confidence to build real-world AI solutions.
            </p>
            <Link to="/for-students" className={styles.limeSmallButton}>
              Explore Student Programs
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.pathSteps}>
            {learningSteps.map(({ step, title, desc, icon }, index) => (
              <article
                className={`${styles.pathStep} ${styles.reveal}`}
                style={{ '--reveal-delay': `${index * 110}ms` }}
                data-reveal
                key={step}
              >
                <div className={styles.pathIcon}>
                  <span className={`${styles.cssIcon} ${styles[icon]}`} aria-hidden="true" />
                </div>
                <span className={styles.pathStepNumber}>{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.campSection} ${styles.reveal}`} data-reveal>
          <aside className={`${styles.campIntro} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>INSIDE OUR</p>
            <h2>AI WORKSHOPS</h2>
            <p>
              Hands-on learning, creativity, teamwork, and real AI projects that students love.
            </p>
            <ul>
              {campFeatures.map((feature) => (
                <li key={feature.label}>
                  <span className={`${styles.cssIcon} ${styles.smallListIcon} ${styles[feature.icon]}`} aria-hidden="true" />
                  {feature.label}
                </li>
              ))}
            </ul>
            <Link to="/projects" className={styles.outlineButton}>
              View All Photos
              <span aria-hidden="true">→</span>
            </Link>
          </aside>

          <div className={styles.campGrid}>
            {campGallery.map((item, index) => (
              <article
                className={`${styles.campCard} ${styles.reveal} ${item.className ? styles[item.className] : ''}`}
                style={{ '--reveal-delay': `${index * 95}ms` }}
                data-reveal
                key={item.title}
              >
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.teacherSection} ${styles.reveal}`} data-reveal>
          <div className={`${styles.teacherImage} ${styles.reveal}`} data-reveal>
            <img src={facultyTrainingImg} alt="" />
          </div>
          <div className={`${styles.teacherCopy} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>FOR TEACHERS</p>
            <h2>Helping Teachers Use AI With Confidence</h2>
            <p>
              We empower educators with practical AI tools and strategies to enhance teaching,
              save time, and create better learning experiences for students.
            </p>
            <div className={styles.teacherFeatureGrid}>
              {teacherFeatures.map((feature, index) => (
                <span
                  className={styles.reveal}
                  style={{ '--reveal-delay': `${index * 75}ms` }}
                  data-reveal
                  key={feature.label}
                >
                  <i className={`${styles.cssIcon} ${styles.teacherCssIcon} ${styles[feature.icon]}`} aria-hidden="true" />
                  {feature.label}
                </span>
              ))}
            </div>
            <Link to="/faculty-training" className={styles.outlineButton}>
              Explore Faculty Training
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className={`${styles.impactSection} ${styles.reveal}`} data-reveal>
          <div className={`${styles.outcomesPanel} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>IMPACT THAT MATTERS</p>
            <h2>Real Outcomes for Students, Teachers & Schools</h2>
            <div className={styles.outcomeGrid}>
              {outcomes.map((outcome, index) => (
                <div
                  className={`${styles.outcomeItem} ${styles.reveal}`}
                  style={{ '--reveal-delay': `${index * 65}ms` }}
                  data-reveal
                  key={outcome.label}
                >
                  <span className={`${styles.cssIcon} ${styles.outcomeCssIcon} ${styles[outcome.icon]}`} aria-hidden="true" />
                  {outcome.label}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.testimonialsPanel} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>WHAT THEY SAY</p>
            <div className={styles.testimonialGrid}>
              {testimonials.map(([quote, role, school], index) => (
                <article
                  className={`${styles.testimonialCard} ${styles.reveal}`}
                  style={{ '--reveal-delay': `${index * 100}ms` }}
                  data-reveal
                  key={quote}
                >
                  <span className={styles.quoteMark}>“</span>
                  <p>{quote}</p>
                  <div>
                    <span className={styles.avatarDot} />
                    <strong>{role}</strong>
                    <small>{school}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.institutionsStrip} ${styles.reveal}`} data-reveal>
          <p>TRUSTED BY LEADING INSTITUTIONS</p>
          <div>
            {institutions.map((institution, index) => (
              <span
                className={styles.reveal}
                style={{ '--reveal-delay': `${index * 80}ms` }}
                data-reveal
                key={institution.name}
              >
                <img src={institution.logo} alt="" />
                {institution.name}
              </span>
            ))}
          </div>
        </section>

        <section className={`${styles.leadershipBand} ${styles.reveal}`} data-reveal>
          <div className={`${styles.leaderPortrait} ${styles.reveal}`} data-reveal>
            <img src={sudhaPortraitImg} alt="Vamgipuram Sudha Harikishan" />
          </div>
          <div className={`${styles.leaderCopy} ${styles.reveal}`} data-reveal>
            <p className={styles.darkKicker}>LED BY EXPERIENCED EDUCATORS & AI PROGRAM DESIGNERS</p>
            <h2>Vamgipuram Sudha Harikishan</h2>
            <ul>
              <li>33+ years of experience in educational leadership</li>
              <li>Expertise in hiring, evaluation & academic quality</li>
              <li>Passionate about empowering schools and educators</li>
              <li>Ensuring every program is effective, practical & future-ready</li>
            </ul>
            <Link to="/about" className={styles.darkOutlineButton}>
              Know More About Our Leadership
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={`${styles.missionCard} ${styles.reveal}`} data-reveal>
            <span>
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 27a9 9 0 0 1 18 0M16 20v5M12 23h8" />
              </svg>
            </span>
            <p>
              <strong>Our mission is simple:</strong>
              Bring practical, responsible, and future-ready AI learning to every school.
            </p>
          </div>
        </section>

        <section className={`${styles.faqSection} ${styles.reveal}`} data-reveal>
          <div className={`${styles.faqLists} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>FREQUENTLY ASKED QUESTIONS</p>
            <div className={styles.faqColumns}>
              {[faqsLeft, faqsRight].map((items, index) => (
                <div className={styles.faqColumn} key={index}>
                  {items.map((item) => (
                    <details key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <aside className={`${styles.finalCta} ${styles.reveal}`} data-reveal>
            <p className={styles.darkKicker}>READY TO GET STARTED?</p>
            <h2>Bring Practical AI Learning to Your Institution</h2>
            <div>
              <a href={whatsappUrl} className={styles.limeSmallButton} target="_blank" rel="noopener noreferrer">
                Book a Demo
                <span aria-hidden="true">→</span>
              </a>
              <a href={whatsappUrl} className={styles.whatsappCta} target="_blank" rel="noopener noreferrer">
                Talk on WhatsApp
              </a>
            </div>
          </aside>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.footerBrand}>
          <Link to="/" className={styles.footerLogo}>
            <img src="/assets/icons/updated logoo (1).png" alt="" />
            <span>tattva-ai</span>
          </Link>
          <p>
            Empowering schools, teachers, and students to become AI-ready with practical learning and responsible technology adoption.
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
          <span>© 2024 Tattva AI. All rights reserved.</span>
          <span>Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Terms of Use</span>
        </div>
      </footer>

      {showWhatsApp && (
        <a
          href={whatsappUrl}
          className={styles.floatingWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 0.156 7.125 0.156 15.875C0.156 18.656 0.906 21.375 2.281 23.75L0 32L8.5 29.75C10.781 31 13.375 31.656 16.031 31.656C24.781 31.656 32 24.531 32 15.781C32 11.531 30.281 7.65 27.281 4.65ZM16.031 29C13.656 29 11.344 28.375 9.344 27.219L8.875 26.938L3.844 28.219L5.156 23.344L4.844 22.844C3.563 20.75 2.875 18.344 2.875 15.875C2.875 8.625 8.781 2.719 16.031 2.719C19.531 2.719 22.813 4.094 25.281 6.594C27.75 9.094 29.156 12.375 29.156 15.875C29.281 23.125 23.281 29 16.031 29ZM23.25 19.125C22.844 18.938 20.844 17.969 20.469 17.813C20.094 17.688 19.813 17.625 19.531 18C19.25 18.406 18.5 19.313 18.25 19.563C18 19.844 17.719 19.875 17.313 19.656C16.906 19.469 15.563 19.031 13.969 17.594C12.719 16.469 11.906 15.094 11.625 14.688C11.375 14.281 11.594 14.063 11.781 13.875C11.938 13.719 12.156 13.438 12.344 13.188C12.531 13 12.594 12.844 12.719 12.563C12.844 12.281 12.781 12.031 12.688 11.844C12.594 11.656 11.906 9.656 11.531 8.844C11.188 8.063 10.813 8.156 10.563 8.156H9.781C9.5 8.156 9.063 8.25 8.688 8.656C8.313 9.063 7.25 10.031 7.25 12.031C7.25 14.031 8.719 15.969 8.906 16.219C9.094 16.5 11.906 20.813 16.156 22.531C17.219 22.969 18.063 23.219 18.719 23.406C19.781 23.75 20.75 23.688 21.5 23.594C22.344 23.469 24 22.625 24.375 21.688C24.781 20.75 24.781 19.938 24.656 19.75C24.531 19.563 24.25 19.469 23.844 19.281L23.25 19.125Z" fill="white" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default HomePage;
