import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteUrl = 'https://tattva-ai.in';

const pageMetadata = {
  '/': {
    title: 'Tattva AI | Future-Ready AI Programs for Institutions',
    description: 'Bring practical, future-ready AI learning to your school or institution with hands-on student programs, faculty training, and real-world projects in Hyderabad.'
  },
  '/for-schools': {
    title: 'AI Programs for Schools in Hyderabad | Tattva AI',
    description: 'Bring practical, future-ready AI programs to your school in Hyderabad with Tattva AI. We support students, teachers, and school leaders.'
  },
  '/for-students': {
    title: 'AI Programs for Students in Hyderabad | Tattva AI',
    description: 'Hands-on AI programs in Hyderabad that help students build real projects, explore responsible AI, and develop future-ready skills.'
  },
  '/faculty-training': {
    title: 'AI Faculty Training for Schools in Hyderabad | Tattva AI',
    description: 'Help your educators use AI with confidence through practical faculty training for schools in Hyderabad.'
  },
  '/projects': {
    title: 'AI Workshops and Student Projects | Tattva AI Hyderabad',
    description: 'Explore Tattva AI workshops, student projects, school collaborations, and practical AI learning experiences in Hyderabad.'
  },
  '/about': {
    title: 'About Tattva AI | AI Education in Hyderabad',
    description: 'Meet the educators behind Tattva AI and learn how we make practical, responsible AI education accessible to schools in Hyderabad.'
  },
  '/contact': {
    title: 'Contact Tattva AI | AI Programs for Schools in Hyderabad',
    description: 'Contact Tattva AI to discuss AI training, student programs, and faculty training for your school in Hyderabad.'
  }
};

const setMeta = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] || pageMetadata['/'];
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

    document.title = metadata.title;
    setMeta('meta[name="description"]', 'content', metadata.description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[property="og:title"]', 'content', metadata.title);
    setMeta('meta[property="og:description"]', 'content', metadata.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', metadata.title);
    setMeta('meta[name="twitter:description"]', 'content', metadata.description);
  }, [pathname]);

  return null;
}
