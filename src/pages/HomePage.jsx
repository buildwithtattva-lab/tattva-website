import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  School,
  Users,
  Award,
  GraduationCap,
  Cpu,
  Sparkles,
  ClipboardList,
  TrendingUp,
  Brain,
  Terminal,
  Database,
  Layers,
  Code2,
  Trophy,
  BookOpen,
  Laptop,
  Workflow,
  Scale,
  Smile,
  Presentation,
  Target,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
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
import { fetchGalleryResources } from '../lib/cloudinaryGallery';
import styles from './HomePage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';
const homeGalleryFolder = import.meta.env.VITE_CLOUDINARY_HOME_GALLERY_FOLDER || 'Main Gallery';
const aiWorkshopsFolder = import.meta.env.VITE_CLOUDINARY_AI_WORKSHOPS_FOLDER || 'AI Workshops';
const aiWorkshopsFolderAliases = [aiWorkshopsFolder, 'workshops'];
const heroImagesFolder = import.meta.env.VITE_CLOUDINARY_HERO_IMAGES_FOLDER || 'hero section images';

const normalizeGallerySegment = (value = '') => String(value)
  .toLowerCase()
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const matchesGalleryFolder = (image, folderName) => {
  const expectedFolder = normalizeGallerySegment(folderName);
  if (!expectedFolder) return true;

  return [image.folder, image.public_id]
    .filter(Boolean)
    .flatMap((value) => String(value).split('/'))
    .some((segment) => normalizeGallerySegment(segment) === expectedFolder);
};

const matchesAnyGalleryFolder = (image, folderNames) => folderNames
  .some((folderName) => matchesGalleryFolder(image, folderName));

const isPopupFriendlyImage = (image) => {
  const searchableText = [
    image.public_id,
    image.display_name,
    image.title,
    image.alt
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return !searchableText.includes('screenshot');
};

const getNumberedImagePriority = (image, maxPriority) => {
  const candidates = [
    image.display_name,
    image.title,
    image.alt,
    image.public_id
  ].filter(Boolean);

  for (const candidate of candidates) {
    const fileName = String(candidate).split('/').pop().replace(/\.[^/.]+$/, '').trim();
    const priorityMatch = fileName.match(/^(\d+)(?:[_-][a-z0-9]+)?$/i);
    if (priorityMatch) {
      const priority = Number(priorityMatch[1]);
      if (priority >= 1 && priority <= maxPriority) {
        return priority;
      }
    }
  }

  return Number.POSITIVE_INFINITY;
};

const sortNumberedImagesFirst = (images, maxPriority) => [...images].sort((a, b) => {
  const priorityA = getNumberedImagePriority(a, maxPriority);
  const priorityB = getNumberedImagePriority(b, maxPriority);

  if (priorityA !== priorityB) return priorityA - priorityB;

  return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
});

const sortRecentWorkshops = (images) => sortNumberedImagesFirst(images, 7);
const sortAiWorkshops = (images) => sortNumberedImagesFirst(images, 5);

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'For Schools', to: '/for-schools' },
  { label: 'Student Programs', to: '/for-students' },
  { label: 'International Students', to: '/international-students' },
  { label: 'Faculty Training', to: '/faculty-training' },
  { label: 'Gallery', to: '/projects' },
  { label: 'About', to: '/about' }
];

const stats = [
  {
    value: 10,
    suffix: '+',
    label: 'Partner Schools',
    icon: <School size={28} strokeWidth={1.8} />
  },
  {
    value: 1000,
    suffix: '+',
    label: 'Students Impacted',
    icon: <Users size={28} strokeWidth={1.8} />
  },
  {
    value: 98,
    suffix: '%',
    label: 'Program Satisfaction',
    icon: <Smile size={28} strokeWidth={1.8} />
  },
  {
    value: 50,
    suffix: '+',
    label: 'Faculty Trained',
    icon: <GraduationCap size={28} strokeWidth={1.8} />
  },
  {
    value: 10,
    suffix: '+',
    label: 'AI Programs',
    icon: <Cpu size={28} strokeWidth={1.8} />
  }
];

const needs = [
  {
    label: 'Students are curious about AI and using it every day.',
    icon: <Sparkles size={28} strokeWidth={1.8} />
  },
  {
    label: 'Teachers need practical training and classroom support.',
    icon: <GraduationCap size={28} strokeWidth={1.8} />
  },
  {
    label: 'Schools need a clear plan to implement AI education.',
    icon: <ClipboardList size={28} strokeWidth={1.8} />
  },
  {
    label: 'Parents want skills that prepare children for the future.',
    icon: <TrendingUp size={28} strokeWidth={1.8} />
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
  { step: '01', title: 'AI Awareness', desc: 'Understand AI, its applications, and real-world impact.', icon: Brain },
  { step: '02', title: 'Prompting & Responsible Use', desc: 'Learn effective prompting and ethical AI usage.', icon: Terminal },
  { step: '03', title: 'Data & Automation', desc: 'Work with data and automate everyday tasks with AI tools.', icon: Database },
  { step: '04', title: 'No-code AI Projects', desc: 'Build AI apps and solutions using no-code platforms.', icon: Layers },
  { step: '05', title: 'Coding with AI', desc: 'Use Python and AI libraries to build intelligent applications.', icon: Code2 },
  { step: '06', title: 'Capstone Projects', desc: 'Solve real-world problems and build portfolio-worthy projects.', icon: Trophy }
];

const campFeatures = [
  { label: 'Live Workshops', icon: Presentation },
  { label: 'AI Projects', icon: Cpu },
  { label: 'Team Challenges', icon: Users },
  { label: 'Certificates', icon: Award },
  { label: 'Fun & Exploration', icon: Sparkles }
];

const fallbackCampGallery = [
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
  { label: 'AI for Lesson Planning', icon: BookOpen },
  { label: 'Assessment Support', icon: GraduationCap },
  { label: 'Classroom Activities', icon: Laptop },
  { label: 'Productivity Workflows', icon: Workflow },
  { label: 'Responsible & Ethical AI', icon: Scale }
];

const outcomes = [
  { label: 'Students build real AI projects', icon: Cpu },
  { label: 'Teachers save time with AI workflows', icon: Workflow },
  { label: 'Schools get structured AI adoption', icon: School },
  { label: 'Parents see visible future-readiness', icon: TrendingUp },
  { label: 'Leadership gets clear implementation plan', icon: ClipboardList },
  { label: 'Confident classrooms ready for tomorrow', icon: Sparkles }
];

const testimonials = [
  ['The AI program by Tattva AI has transformed the way our students learn. The hands-on projects and workshops are exceptional!', 'Principal Tanusree', 'Sloka The School'],
  ['The faculty training was practical, easy to apply, and extremely useful for our daily classroom teaching.', 'Dean', 'Steps The School'],
  ['My son loved the AI workshop. He built his own app and came home excited every day.', 'Parent', 'Hyderabad']
];

const institutions = [
  { name: 'Sloka The School', logo: slokaLogo },
  { name: 'FBHIS', logo: fbhisLogo },
  { name: 'St. Martins', logo: stMartinsLogo },
  { name: 'Steps The School', logo: stepsLogo }
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeGalleryImages, setHomeGalleryImages] = useState([]);
  const [aiWorkshopImages, setAiWorkshopImages] = useState([]);
  const [heroGalleryImages, setHeroGalleryImages] = useState([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [previousHeroIndex, setPreviousHeroIndex] = useState(0);
  const [homeGalleryStatus, setHomeGalleryStatus] = useState('loading');
  const [homeGalleryError, setHomeGalleryError] = useState('');
  const recentWorkshopsRef = useRef(null);

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

  useEffect(() => {
    let isMounted = true;

    const loadHomeGallery = async () => {
      try {
        const images = await fetchGalleryResources();
        if (!isMounted) return;

        const folderImages = images.filter((image) => matchesGalleryFolder(image, homeGalleryFolder));
        const curatedImages = folderImages.filter(isPopupFriendlyImage);
        const mainGalleryImages = (curatedImages.length ? curatedImages : folderImages)
          .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        const workshopImages = sortAiWorkshops(
          images.filter((image) => matchesAnyGalleryFolder(image, aiWorkshopsFolderAliases))
        );
        const heroImages = images
          .filter((image) => !image.isVideo && matchesGalleryFolder(image, heroImagesFolder))
          .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

        setHomeGalleryImages(mainGalleryImages);
        setAiWorkshopImages(workshopImages);
        setHeroGalleryImages(heroImages);
        setHomeGalleryStatus(mainGalleryImages.length ? 'ready' : 'empty');
      } catch (galleryError) {
        if (!isMounted) return;
        setHomeGalleryError(galleryError.message);
        setHomeGalleryStatus('error');
      }
    };

    loadHomeGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (heroGalleryImages.length < 2) {
      setActiveHeroIndex(0);
      setPreviousHeroIndex(0);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => {
        setPreviousHeroIndex(currentIndex);
        return (currentIndex + 1) % heroGalleryImages.length;
      });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroGalleryImages.length]);

  const heroSlides = heroGalleryImages.length
    ? heroGalleryImages.map((image) => ({
      src: image.hero || image.thumb,
      alt: image.alt || 'Students learning AI'
    }))
    : [{
      src: heroImage,
      alt: 'Students learning AI with a laptop and robotics kit'
    }];
  const nextHeroIndex = heroSlides.length > 1 ? (activeHeroIndex + 1) % heroSlides.length : activeHeroIndex;
  const visibleHeroSlides = heroSlides
    .map((image, index) => ({ ...image, index }))
    .filter((image) => (
      image.index === activeHeroIndex
      || image.index === previousHeroIndex
      || image.index === nextHeroIndex
    ));

  const orderedRecentWorkshopImages = sortRecentWorkshops(homeGalleryImages);

  const recentWorkshopGallery = orderedRecentWorkshopImages.slice(0, 8).map((image, index) => ({
    title: image.title || `Workshop Moment ${index + 1}`,
    image: image.thumb,
    alt: image.alt
  }));

  const cloudinaryWorkshopGallery = aiWorkshopImages.slice(0, 5).map((image, index) => ({
    title: image.title || `Workshop Moment ${index + 1}`,
    subtitle: image.category || 'Recent Workshop',
    image: image.thumb,
    alt: image.alt,
    className: index === 0 ? 'campLarge' : ''
  }));

  const campGallery = cloudinaryWorkshopGallery.length ? cloudinaryWorkshopGallery : fallbackCampGallery;
  const recentWorkshops = recentWorkshopGallery.length
    ? recentWorkshopGallery
    : fallbackCampGallery.map((item) => ({
      title: item.title,
      image: item.image,
      alt: item.title
    }));

  const scrollRecentWorkshops = (direction) => {
    const rail = recentWorkshopsRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.85, 760),
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        {visibleHeroSlides.map((image) => (
          <img
            src={image.src}
            alt={image.index === activeHeroIndex ? image.alt : ''}
            className={`${styles.heroImage} ${image.index === activeHeroIndex ? styles.heroImageActive : ''}`}
            aria-hidden={image.index === activeHeroIndex ? undefined : 'true'}
            fetchPriority={image.index === activeHeroIndex ? 'high' : 'low'}
            loading={image.index === activeHeroIndex || image.index === nextHeroIndex ? 'eager' : 'lazy'}
            key={`${image.src}-${image.index}`}
          />
        ))}
        <div className={styles.heroShade} />

        <nav className={styles.nav} aria-label="Primary navigation">
          <Link to="/" className={styles.logoLink}>
            <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
            <span>tattva-ai</span>
          </Link>

          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link to={item.to} className={item.to === '/' ? styles.activeNav : ''} key={item.to}>
                {item.label}
              </Link>
            ))}
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
            <button
              type="button"
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="home-mobile-navigation"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={2.4} /> : <Menu size={22} strokeWidth={2.4} />}
            </button>
          </div>

          <div
            className={`${styles.mobileNavPanel} ${mobileMenuOpen ? styles.mobileNavPanelOpen : ''}`}
            id="home-mobile-navigation"
          >
            {navItems.map((item) => (
              <Link
                to={item.to}
                className={item.to === '/' ? styles.activeMobileNav : ''}
                onClick={() => setMobileMenuOpen(false)}
                key={item.to}
              >
                {item.label}
              </Link>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
              Book a Demo
            </a>
          </div>
        </nav>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>AI EDUCATION FOR THE NEXT GENERATION</p>
          <h1>
            Make Your Institution
            <span>AI-Ready</span>
          </h1>
          <p className={styles.heroLead}>Practical AI programs for students, teachers, and institutions.</p>
          <p className={styles.heroCopy}>
            We help Institutions introduce responsible and hands-on AI learning through student programs,
            faculty training, and implementation support.
          </p>
          <div className={styles.heroActions}>
            <a href={whatsappUrl} className={styles.primaryCta} target="_blank" rel="noopener noreferrer">
              Book a Demo
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

        <section className={`${styles.recentWorkshopsSection} ${styles.reveal}`} data-reveal aria-label="Recent workshops and success stories">
          <div className={styles.recentWorkshopsHeader}>
            <p className={styles.sectionKicker}>RECENT WORKSHOPS & SUCCESS STORIES</p>
            <h2>Real Experiences. Real Impact.</h2>
            <p>A glimpse of our workshops, camps, and school collaborations.</p>
          </div>

          <div className={styles.recentWorkshopsFrame}>
            <button
              type="button"
              className={`${styles.workshopRailButton} ${styles.workshopRailButtonLeft}`}
              onClick={() => scrollRecentWorkshops(-1)}
              aria-label="Show previous workshop photos"
            >
              <ChevronLeft size={24} strokeWidth={2.4} />
            </button>

            <div className={styles.recentWorkshopsRail} ref={recentWorkshopsRef}>
              {recentWorkshops.map((image, index) => (
                <article
                  className={styles.recentWorkshopCard}
                  key={`${image.title}-${index}`}
                >
                  <img src={image.image} alt={image.alt || image.title} loading={index < 3 ? 'eager' : 'lazy'} />
                </article>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.workshopRailButton} ${styles.workshopRailButtonRight}`}
              onClick={() => scrollRecentWorkshops(1)}
              aria-label="Show next workshop photos"
            >
              <ChevronRight size={24} strokeWidth={2.4} />
            </button>
          </div>

          {homeGalleryStatus === 'error' && (
            <p className={styles.recentWorkshopsNote}>{homeGalleryError}</p>
          )}
          {homeGalleryStatus === 'empty' && (
            <p className={styles.recentWorkshopsNote}>
              Add images to the Cloudinary folder `{homeGalleryFolder}` and resync the gallery manifest.
            </p>
          )}
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
            {learningSteps.map(({ step, title, desc, icon: IconComponent }, index) => (
              <article
                className={`${styles.pathStep} ${styles.reveal}`}
                style={{ '--reveal-delay': `${index * 110}ms` }}
                data-reveal
                key={step}
              >
                <div className={styles.pathIcon}>
                  <IconComponent size={28} strokeWidth={1.8} />
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
              {campFeatures.map(({ label, icon: IconComponent }) => (
                <li key={label}>
                  <IconComponent size={18} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0 }} />
                  {label}
                </li>
              ))}
            </ul>
            <Link to="/projects" className={styles.outlineButton}>
              View All Photos
              <span aria-hidden="true">→</span>
            </Link>
            {homeGalleryStatus === 'error' && (
              <p className={styles.galleryInlineNote}>{homeGalleryError}</p>
            )}
            {homeGalleryStatus === 'empty' && (
              <p className={styles.galleryInlineNote}>
                Add images to the Cloudinary folder `{homeGalleryFolder}` and resync the gallery manifest.
              </p>
            )}
          </aside>

          <div className={styles.campGrid}>
            {campGallery.map((item, index) => (
              <article
                className={`${styles.campCard} ${item.className ? styles[item.className] : ''}`}
                key={`${item.title}-${index}`}
              >
                <img src={item.image} alt={item.alt || ''} loading={index === 0 ? 'eager' : 'lazy'} />
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
              {teacherFeatures.map(({ label, icon: IconComponent }, index) => (
                <span
                  className={styles.reveal}
                  style={{ '--reveal-delay': `${index * 75}ms` }}
                  data-reveal
                  key={label}
                >
                  <span className={styles.teacherFeatureIcon} aria-hidden="true">
                    <IconComponent size={24} strokeWidth={2} style={{ color: '#073a25' }} />
                  </span>
                  <span className={styles.teacherFeatureLabel}>{label}</span>
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
              {outcomes.map(({ label, icon: IconComponent }, index) => (
                <div
                  className={`${styles.outcomeItem} ${styles.reveal}`}
                  style={{ '--reveal-delay': `${index * 65}ms` }}
                  data-reveal
                  key={label}
                >
                  <IconComponent size={22} strokeWidth={2} style={{ color: '#075a31', flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.testimonialsPanel} ${styles.reveal}`} data-reveal>
            <p className={styles.sectionKicker}>SUCCESS STORIES</p>
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
            <p className={styles.darkKicker}>Guided by Experienced Education Leaders</p>
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
              <Target size={28} strokeWidth={1.8} />
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
          <span>© 2026 Tattva AI. All rights reserved.</span>
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
