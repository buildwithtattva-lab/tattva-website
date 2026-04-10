import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import styles from './HiringPage.module.css';

const HiringPage = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            if (!resume) {
                throw new Error('Please upload your resume.');
            }

            // 1. Upload Resume to Storage
            const fileExt = resume.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('resumes')
                .upload(filePath, resume);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            // 2. Insert into Database
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
            <Navigation />
            
            <section className={styles.hero}>
                <div className={styles.heroGlow}></div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Join Our Network of Excellence</h1>
                        <p className={styles.subtitle}>
                            We are hiring visionary faculty and leaders for top-tier schools. 
                            Shape the future of education with Tattva.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formContainer}>
                        <div className={styles.formGlass}>
                            <h2 className={styles.formTitle}>Application Form</h2>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        required 
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="yourname@gmail.com"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            required 
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Role Interested In</label>
                                        <select 
                                            name="role" 
                                            required 
                                            value={formData.role}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {formData.role === 'Subject Teacher' && (
                                        <div className={styles.inputGroup}>
                                            <label>Specific Subject</label>
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                required 
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="e.g. Mathematics, AI"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Prefered Interview Date & Time</label>
                                    <input 
                                        type="datetime-local" 
                                        name="interviewDateTime" 
                                        required 
                                        value={formData.interviewDateTime}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Upload Resume (PDF)</label>
                                    <div className={styles.fileUpload}>
                                        <input 
                                            type="file" 
                                            accept=".pdf,.doc,.docx" 
                                            onChange={handleFileChange}
                                            required
                                            id="resume-upload"
                                        />
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

                                <button 
                                    type="submit" 
                                    className={styles.submitBtn} 
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Apply Now'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HiringPage;
