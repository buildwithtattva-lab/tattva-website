import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../lib/supabaseClient';
import styles from './EmployerPage.module.css';

const EmployerPage = () => {
    const formRef = useRef(null);
    const suggestionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [employerData, setEmployerData] = useState({
        institutionName: '',
        contactPerson: '',
        email: '',
        phone: '',
        rolesNeeded: '',
        message: ''
    });
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSchoolSuggestions = async (query) => {
        if (query.length < 2) {
            setSchoolSuggestions([]);
            return;
        }
        try {
            let suggestions = [];
            // Clearbit
            try {
                const clearbitRes = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
                if (clearbitRes.ok) suggestions = await clearbitRes.json();
            } catch (err) { console.log("Clearbit error", err); }

            // Hipolabs
            try {
                const hipoRes = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}&country=India`);
                if (hipoRes.ok) {
                    const hipoData = await hipoRes.json();
                    const indiaColleges = hipoData.map(uni => ({
                        name: uni.name,
                        domain: uni.domains?.[0] || '',
                        logo: uni.domains?.[0] ? `https://logo.clearbit.com/${uni.domains[0]}` : ''
                    }));
                    suggestions = [...indiaColleges, ...suggestions];
                }
            } catch (err) { console.log("Hipolabs error", err); }

            const uniqueNames = new Set();
            setSchoolSuggestions(suggestions.filter(item => {
                if (!item.name || uniqueNames.has(item.name)) return false;
                uniqueNames.add(item.name);
                return true;
            }).slice(0, 8));
            setShowSuggestions(true);
        } catch (e) { console.error("Autocomplete error:", e); }
    };

    const handleEmployerChange = (e) => {
        setEmployerData({ ...employerData, [e.target.name]: e.target.value });
        if (e.target.name === 'institutionName') fetchSchoolSuggestions(e.target.value);
    };

    const handleEmployerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const { error: insertError } = await supabase
                .from('employer_inquiries')
                .insert([{
                    institution_name: employerData.institutionName,
                    contact_person: employerData.contactPerson,
                    email: employerData.email,
                    phone: employerData.phone,
                    roles_needed: employerData.rolesNeeded,
                    message: employerData.message,
                    status: 'new'
                }]);

            if (insertError) throw insertError;
            setSubmitted(true);
            setStatus({ type: 'success', message: 'Inquiry received! Our team will contact you shortly.' });
        } catch (error) {
            console.error('Employer Error:', error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    };

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            <header className={styles.hero}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className={`${styles.heroContent} ${heroInView ? styles.visible : ''}`} ref={heroRef}>
                        <h1 className={styles.heroTitle}>Hire the Top 1% Global <br /> Experts for Your <br /> Institution</h1>
                        <p className={styles.heroSubtitle}>Partner with Tattva to bring visionary educators and leaders to your school, shaping the next generation of excellence.</p>
                        <button onClick={handleScrollToForm} className={styles.applyBtnHero}>Partner with Us</button>
                    </div>
                </div>
            </header>

            <section className={styles.mainSection} ref={formRef}>
                <div className="container">
                    <div className={styles.formGlass}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: '80px', height: '80px', background: '#48bb78', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary-teal)', marginBottom: '20px' }}>Inquiry Successful!</h2>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Thank you for reaching out. A Tattva partnerships manager will contact you within 24 hours.</p>
                                <Link to="/" style={{ display: 'inline-block', marginTop: '40px', padding: '12px 30px', background: 'var(--primary-teal)', color: '#fff', borderRadius: '999px', textDecoration: 'none' }}>Return Home</Link>
                            </div>
                        ) : (
                            <>
                                <h3 className={styles.formTitle}>Partner with Tattva</h3>
                                <form onSubmit={handleEmployerSubmit} className={styles.form}>
                                    <div className={styles.inputGroup} ref={suggestionRef}>
                                        <label>Institution Name</label>
                                        <input type="text" name="institutionName" required value={employerData.institutionName} onChange={handleEmployerChange} placeholder="e.g. Stanford University, DPS" />
                                        {showSuggestions && schoolSuggestions.length > 0 && (
                                            <div className={styles.suggestionsList}>
                                                {schoolSuggestions.map((school, i) => (
                                                    <div key={i} className={styles.suggestionItem} onClick={() => {
                                                        setEmployerData({ ...employerData, institutionName: school.name });
                                                        setShowSuggestions(false);
                                                    }}>
                                                        {school.logo && <img src={school.logo} className={styles.suggestionLogo} alt="" />}
                                                        <span>{school.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Contact Person</label>
                                            <input type="text" name="contactPerson" required value={employerData.contactPerson} onChange={handleEmployerChange} placeholder="Enter your full name" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Contact Phone</label>
                                            <input type="tel" name="phone" required value={employerData.phone} onChange={handleEmployerChange} placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Institutional Email</label>
                                        <input type="email" name="email" required value={employerData.email} onChange={handleEmployerChange} placeholder="admin@institution.edu" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Roles Needed</label>
                                        <input type="text" name="rolesNeeded" value={employerData.rolesNeeded} onChange={handleEmployerChange} placeholder="e.g. Principal, HOD Science" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Additional Message</label>
                                        <textarea name="message" className={styles.textarea} value={employerData.message} onChange={handleEmployerChange} placeholder="Tell us about your requirements..."></textarea>
                                    </div>
                                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                                        {loading ? 'Submitting...' : 'Send Inquiry'}
                                    </button>
                                    {status.message && <div style={{ textAlign: 'center', marginTop: '15px', color: status.type === 'error' ? '#e53e3e' : '#2F855A' }}>{status.message}</div>}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default EmployerPage;
