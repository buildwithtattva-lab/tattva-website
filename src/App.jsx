import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ForCollegesPage from './pages/ForCollegesPage';
import ForSchoolsPage from './pages/ForSchoolsPage';
import ForStudentsPage from './pages/ForStudentsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import HiringPage from './pages/HiringPage';
import EventsPage from './pages/EventsPage';
import PromoPopup from './components/PromoPopup';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <PromoPopup />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/for-colleges" element={<ForCollegesPage />} />
        <Route path="/for-schools" element={<ForSchoolsPage />} />
        <Route path="/for-students" element={<ForStudentsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
