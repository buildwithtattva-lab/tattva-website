import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import galleryHeroImage from '../assets/bento/m6.png';
import { fetchGalleryResources } from '../lib/cloudinaryGallery';
import styles from './ProjectsPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';

const categories = [
  { label: 'All', value: 'All', icon: 'all' },
  { label: 'Classroom', value: 'Classroom', icon: 'classroom' },
  { label: 'Workshops', value: 'Workshops', icon: 'workshops' },
  { label: 'Student Projects', value: 'Student Projects', icon: 'projects' },
  { label: 'Achievements', value: 'Achievements', icon: 'achievements' }
];

const Icon = ({ type }) => {
  const icons = {
    all: <path d="M7 7h7v7H7zM18 7h7v7h-7zM7 18h7v7H7zM18 18h7v7h-7z" />,
    classroom: <path d="M6 7h20v13H6zM10 25h12M16 20v5M10 12h5M19 11l4 3-4 3" />,
    workshops: <path d="M16 5v4M16 23v4M5 16h4M23 16h4M8 8l3 3M21 21l3 3M24 8l-3 3M11 21l-3 3M12 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />,
    events: <path d="M8 6h16v20H8zM12 4v5M20 4v5M8 12h16M12 17h3M18 17h3M12 21h3" />,
    projects: <path d="M8 11h16v14H8zM12 11V7h8v4M12 18h8M16 15v6" />,
    achievements: <path d="M16 5l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />,
    cloud: <path d="M10 23h14a5 5 0 0 0 0-10h-1A8 8 0 0 0 7.5 15 4 4 0 0 0 10 23Z" />,
    chevron: <path d="m10 13 6 6 6-6" />,
    whatsapp: <path d="M27.281 4.65C24.281 1.65 20.281 0 16.031 0C7.281 0 0.156 7.125 0.156 15.875C0.156 18.656 0.906 21.375 2.281 23.75L0 32L8.5 29.75C10.781 31 13.375 31.656 16.031 31.656C24.781 31.656 32 24.531 32 15.781C32 11.531 30.281 7.65 27.281 4.65ZM16.031 29C13.656 29 11.344 28.375 9.344 27.219L8.875 26.938L3.844 28.219L5.156 23.344L4.844 22.844C3.563 20.75 2.875 18.344 2.875 15.875C2.875 8.625 8.781 2.719 16.031 2.719C19.531 2.719 22.813 4.094 25.281 6.594C27.75 9.094 29.156 12.375 29.156 15.875C29.281 23.125 23.281 29 16.031 29ZM23.25 19.125C22.844 18.938 20.844 17.969 20.469 17.813C20.094 17.688 19.813 17.625 19.531 18C19.25 18.406 18.5 19.313 18.25 19.563C18 19.844 17.719 19.875 17.313 19.656C16.906 19.469 15.563 19.031 13.969 17.594C12.719 16.469 11.906 15.094 11.625 14.688C11.375 14.281 11.594 14.063 11.781 13.875C11.938 13.719 12.156 13.438 12.344 13.188C12.531 13 12.594 12.844 12.719 12.563C12.844 12.281 12.781 12.031 12.688 11.844C12.594 11.656 11.906 9.656 11.531 8.844C11.188 8.063 10.813 8.156 10.563 8.156H9.781C9.5 8.156 9.063 8.25 8.688 8.656C8.313 9.063 7.25 10.031 7.25 12.031C7.25 14.031 8.719 15.969 8.906 16.219C9.094 16.5 11.906 20.813 16.156 22.531C17.219 22.969 18.063 23.219 18.719 23.406C19.781 23.75 20.75 23.688 21.5 23.594C22.344 23.469 24 22.625 24.375 21.688C24.781 20.75 24.781 19.938 24.656 19.75C24.531 19.563 24.25 19.469 23.844 19.281L23.25 19.125Z" />
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {icons[type]}
    </svg>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(16);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        setStatus('loading');
        const galleryImages = await fetchGalleryResources();
        if (!isMounted) return;
        setImages(galleryImages);
        setStatus('ready');
      } catch (galleryError) {
        if (!isMounted) return;
        setError(galleryError.message);
        setStatus('error');
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(16);
  }, [selectedCategory, sortOrder]);

  const filteredImages = useMemo(() => {
    const byCategory = selectedCategory === 'All'
      ? images
      : images.filter((image) => image.category === selectedCategory);

    return [...byCategory].sort((a, b) => {
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return sortOrder === 'newest' ? bTime - aTime : aTime - bTime;
    });
  }, [images, selectedCategory, sortOrder]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredImages.length;

  return (
    <div className={styles.galleryPage}>
      <header className={styles.hero}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link to="/" className={styles.logoLink}>
            <img src="/assets/icons/updated logoo (1).png" alt="" className={styles.logoSymbol} />
            <span>tattva-ai</span>
          </Link>

          <div className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/for-schools">For Schools</Link>
            <Link to="/for-students">Student Programs</Link>
            <Link to="/faculty-training">Faculty Training</Link>
            <Link to="/projects" className={styles.activeNav}>Gallery</Link>
            <Link to="/about">About</Link>
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

        <section className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;Gallery</div>
            <h1>
              Moments That
              <span>Inspire</span>
            </h1>
            <p>
              Snapshots from classrooms, workshops, and events that reflect the
              Tattva-AI journey.
            </p>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <img src={galleryHeroImage} alt="" />
          </div>
        </section>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.filterPanel} aria-label="Gallery filters">
          <div className={styles.categoryRow}>
            {categories.map((category) => (
              <button
                className={`${styles.filterButton} ${selectedCategory === category.value ? styles.activeFilter : ''}`}
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
              >
                <Icon type={category.icon} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <label className={styles.sortControl}>
            <span className={styles.srOnly}>Sort gallery</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </label>
        </section>

        {status === 'loading' && (
          <section className={styles.galleryGrid} aria-label="Loading gallery">
            {Array.from({ length: 12 }).map((_, index) => (
              <div className={styles.skeletonCard} key={index} />
            ))}
          </section>
        )}

        {status === 'error' && (
          <section className={styles.emptyState}>
            <Icon type="cloud" />
            <h2>Connect Cloudinary to load the gallery</h2>
            <p>{error}</p>
            <p>
              Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_GALLERY_TAG`
              in `.env`, or use `VITE_CLOUDINARY_GALLERY_MANIFEST_URL`.
            </p>
          </section>
        )}

        {status === 'ready' && (
          <>
            <section className={styles.galleryGrid} aria-label="Tattva-AI gallery">
              {visibleImages.map((image) => (
                <a className={styles.galleryItem} href={image.full} target="_blank" rel="noopener noreferrer" key={image.id}>
                  <img src={image.thumb} alt={image.alt} loading="lazy" />
                </a>
              ))}
            </section>

            {!filteredImages.length && (
              <section className={styles.emptyState}>
                <Icon type="cloud" />
                <h2>No images in this category yet</h2>
                <p>Try another category or add images to the matching Cloudinary folder.</p>
              </section>
            )}

            {canLoadMore && (
              <button className={styles.loadMoreButton} type="button" onClick={() => setVisibleCount((count) => count + 8)}>
                Load More
                <Icon type="chevron" />
              </button>
            )}
          </>
        )}

        <p className={styles.cloudNote}>
          <Icon type="cloud" />
          All images are securely delivered by Cloudinary.
        </p>
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

export default ProjectsPage;
