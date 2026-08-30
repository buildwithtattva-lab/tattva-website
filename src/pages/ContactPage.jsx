import { Link } from 'react-router-dom';
import {
  Mail,
  School,
  MapPin,
  Clock,
  HelpCircle
} from 'lucide-react';
import styles from './ContactPage.module.css';

const whatsappUrl = 'https://wa.me/918886945890';
const emailUrl = 'mailto:team@tattva-ai.in';

const Icon = ({ type, size = 24, strokeWidth = 2, style }) => {
  const icons = {
    mail: Mail,
    school: School,
    location: MapPin,
    clock: Clock
  };

  if (type === 'whatsapp') {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" width={size} height={size} style={style}>
        <path d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6-1.6A12 12 0 1 0 16 4ZM11 10c.4 0 1 .1 1.2.8l.8 2c.2.5 0 .8-.3 1.1l-.6.7c.9 1.7 2.2 3 4 3.9l.8-.9c.3-.4.7-.5 1.2-.3l2 .9c.6.3.8.8.7 1.3-.2 1.2-1.2 2-2.5 2-4.2 0-9.7-5.3-9.7-9.8 0-1 .9-1.7 1.7-1.7H11Z" fill="currentColor" />
      </svg>
    );
  }

  const IconComponent = icons[type] || HelpCircle;
  return <IconComponent size={size} strokeWidth={strokeWidth} style={style} />;
};

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
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
            <Link to="/faculty-training">Faculty Training</Link>
            <Link to="/projects">Gallery</Link>
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

        <section className={styles.heroStage}>
          <div className={styles.heroCopy}>
            <div className={styles.breadcrumb}>Home&nbsp;&nbsp;/&nbsp;&nbsp;Contact Us</div>
            <p className={styles.kicker}>Contact Us</p>
            <h1>
              Let us bring AI learning to your school.
            </h1>
            <p>
              Talk to us about school AI programs, student workshops, faculty
              training, or customized sessions for your campus.
            </p>
            <div className={styles.heroActions}>
              <a href={whatsappUrl} className={styles.primaryCta} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
              <a href={emailUrl} className={styles.secondaryCta}>
                Send an Email
              </a>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="Contact quick details">
            <div className={styles.panelBadge}>
              <Icon type="school" />
            </div>
            <h2>For schools, parents, and educators</h2>
            <p>
              Share your requirement and our team will help you choose the right
              AI program.
            </p>
            <div className={styles.quickInfo}>
              <span>
                <Icon type="clock" />
                Mon to Sat
              </span>
              <span>
                <Icon type="location" />
                Hyderabad, India
              </span>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className={styles.contactSection}>
          <article className={styles.contactCard}>
            <span className={styles.cardIcon}>
              <Icon type="whatsapp" />
            </span>
            <p className={styles.kicker}>Fastest Reply</p>
            <h2>WhatsApp</h2>
            <p>
              Best for demo bookings, quick questions, and program enquiries.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              +91 8886945890
            </a>
          </article>

          <article className={styles.contactCard}>
            <span className={styles.cardIcon}>
              <Icon type="mail" />
            </span>
            <p className={styles.kicker}>Formal Enquiry</p>
            <h2>Email</h2>
            <p>
              Send proposals, school details, or collaboration requirements.
            </p>
            <a href={emailUrl}>
              team@tattva-ai.in
            </a>
          </article>

          <article className={styles.contactCard}>
            <span className={styles.cardIcon}>
              <Icon type="location" />
            </span>
            <p className={styles.kicker}>Location</p>
            <h2>Hyderabad HQ</h2>
            <p>
              We conduct school-campus sessions and customized training programs.
            </p>
            <span className={styles.cardText}>Telangana, India</span>
          </article>
        </section>

        <section className={styles.demoSection}>
          <div>
            <p className={styles.kicker}>Next Step</p>
            <h2>Ready to discuss a program?</h2>
            <p>
              Message us with your school name, class range, expected number of
              students, and the program type you are interested in.
            </p>
          </div>
          <a href={whatsappUrl} className={styles.primaryCta} target="_blank" rel="noopener noreferrer">
            Start on WhatsApp
          </a>
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
            <a href={emailUrl}>team@tattva-ai.in</a>
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

export default ContactPage;
