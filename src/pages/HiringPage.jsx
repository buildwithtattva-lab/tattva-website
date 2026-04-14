import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import styles from './HiringPage.module.css';

const HiringPage = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        subject: '',
        interviewDateTime: '',
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const roles = [
        'Teacher',
        'Subject Teacher',
        'Principal',
        'Management',
        'Coordinator'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setResume(e.target.files[0]);
        }
    };

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            if (!resume) {
                throw new Error('Please upload your resume.');
            }

            const fileExt = resume.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, resume);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            const { error: insertError } = await supabase
                .from('applicants')
                .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role,
                    subject: formData.role === 'Subject Teacher' ? formData.subject : null,
                    interview_date: formData.interviewDateTime,
                    resume_url: publicUrl
                }]);

            if (insertError) throw insertError;

            setStatus({
                type: 'success',
                message: 'Application submitted successfully! We will confirm your interview slot via email shortly.'
            });
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                role: '',
                subject: '',
                interviewDateTime: '',
            });
            setResume(null);
            e.target.reset();

        } catch (error) {
            console.error('Error:', error);
            setStatus({
                type: 'error',
                message: error.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />
            
            {/* Dark Hero Section matching the screenshot */}
            <section className={styles.hero}>
                <div className={styles.verticalBeams}>
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={styles.beam}></div>
                    ))}
                </div>
                
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Join the Top 1% Global <br/> Experts Shaping <br/> Tomorrow's Education</h1>
                        <p className={styles.heroSubtitle}>
                            A global network of visionary faculty, principals, and leaders training the next generation with Tattva.
                        </p>
                        
                        <button onClick={handleScrollToForm} className={styles.applyBtnHero}>
                            Apply Now 
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>

                    <div className={styles.trustedBySection}>
                        <div className={styles.trustedGroup}>
                            <span className={styles.trustedLabel}>OUR CLIENTS</span>
                            <div className={styles.logoRow}>
                                <div className={styles.logoBox}>St Martins High School</div>
                                <div className={styles.logoBox}>Sloka The School</div>
                                <div className={styles.logoBox}>Cal Public School</div>
                            </div>
                            <span style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '5px'}}>and many more</span>
                        </div>
                        <div className={styles.trustedGroup}>
                            <span className={styles.trustedLabel}>BACKED BY</span>
                            <div className={styles.logoRow}>
                                <div className={styles.logoBox}>Tattva AI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Light Information & Form Section */}
            <section className={styles.mainSection} ref={formRef}>
                <div className="container">
                    <div className={styles.splitLayout}>
                        
                        {/* Left Side: Text and Graphics */}
                        <div className={styles.infoSide}>
                            <h2 className={styles.sectionTitle}>Built on Top Talent<br/>That Delivers</h2>
                            <p className={styles.sectionDesc}>
                                Our network includes experts from the top schools, ambitious leaders, and dedicated educators everywhere.
                            </p>
                            
                            <div className={styles.pillarsGraphic}>
                                {/* Abstract representation of the pillars from the screenshot */}
                                {[80, 120, 100, 140].map((height, i) => (
                                    <div key={i} className={styles.pillarWrapper}>
                                        <div className={styles.pillarIcon}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <div className={styles.pillar} style={{ height: `${height}px` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className={styles.formSide}>
                            <div className={styles.formGlass}>
                                <h3 className={styles.formTitle}>Application Form</h3>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                                    </div>

                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Email Address</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="yourname@gmail.com" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Phone Number</label>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>

                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Role Interested In</label>
                                            <select name="role" required value={formData.role} onChange={handleChange}>
                                                <option value="">Select a role</option>
                                                {roles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {formData.role === 'Subject Teacher' && (
                                            <div className={styles.inputGroup}>
                                                <label>Specific Subject</label>
                                                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g. Mathematics, AI" />
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Prefered Interview Date & Time</label>
                                        <input type="datetime-local" name="interviewDateTime" required value={formData.interviewDateTime} onChange={handleChange} />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Upload Resume (PDF)</label>
                                        <div className={styles.fileUpload}>
                                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required id="resume-upload" />
                                            <label htmlFor="resume-upload" className={styles.fileLabel}>
                                                {resume ? resume.name : 'Choose file or drag here'}
                                            </label>
                                        </div>
                                    </div>

                                    {status.message && (
                                        <div className={`${styles.status} ${styles[status.type]}`}>
                                            {status.message}
                                        </div>
                                    )}

                                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HiringPage;
