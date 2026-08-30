import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ForSchoolsPage from './pages/ForSchoolsPage';
import ForStudentsPage from './pages/ForStudentsPage';
import FacultyTrainingPage from './pages/FacultyTrainingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import Footer from './components/Footer';
import SiteHeader from './components/SiteHeader';
import Seo from './components/Seo';
import './styles/globals.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="route-shell" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/for-schools" element={<ForSchoolsPage />} />
        <Route path="/for-students" element={<ForStudentsPage />} />
        <Route path="/faculty-training" element={<FacultyTrainingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Seo />
      <ScrollToTop />
      <SiteHeader />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
