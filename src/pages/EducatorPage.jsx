import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../lib/supabaseClient';
import styles from './EducatorPage.module.css';

const APPLICATION_STATUS = {
    SUBMITTED: 'application_submitted',
    SLOT_BOOKED: 'slot_booked',
    PENDING_VERIFICATION: 'pending_verification',
};

const SLOT_STATUS = {
    NOT_SCHEDULED: 'not_scheduled',
    SCHEDULED: 'scheduled',
};

const PAYMENT_STATUS = {
    NOT_SUBMITTED: 'not_submitted',
    PENDING_VERIFICATION: 'pending_verification',
};

const EducatorPage = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        subject: '',
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Step state
    const STEPS = {
        APPLICATION: 'application',
        SLOT: 'slot',
        PAYMENT: 'payment',
        SUCCESS: 'success'
    };
    const [currentStep, setCurrentStep] = useState(STEPS.APPLICATION);
    const [applicantId, setApplicantId] = useState(null);
    const [submissionToken, setSubmissionToken] = useState('');
    const [uploadingPayment, setUploadingPayment] = useState(false);
    const [updatingSlot, setUpdatingSlot] = useState(false);
    const [paymentData, setPaymentData] = useState({ utr: '', screenshot: null });
    const [selectedSlot, setSelectedSlot] = useState({ date: '', time: '' });

    // Animation hooks
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: infoRef, inView: infoInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    const roles = ['Teacher', 'Subject Teacher', 'Principal', 'Admin', 'Coordinator'];

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
            if (!resume) throw new Error('Please upload your resume.');

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

            const { data, error } = await supabase.functions.invoke('educator-submissions', {
                body: {
                    action: 'submit_application',
                    applicant: {
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        role: formData.role,
                        subject: formData.subject,
                        resumeUrl: publicUrl,
                    },
                },
            });

            if (error) throw error;

            setApplicantId(data.applicantId);
            setSubmissionToken(data.submissionToken);
            setCurrentStep(STEPS.SLOT);
        } catch (error) {
            console.error('Error:', error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSlotSubmit = async (e) => {
        e.preventDefault();
        setUpdatingSlot(true);
        setStatus({ type: '', message: '' });

        try {
            if (!selectedSlot.date || !selectedSlot.time) throw new Error('Please select both date and time.');

            const interviewDate = new Date(`${selectedSlot.date}T${selectedSlot.time}`).toISOString();

            const { error: slotError } = await supabase.functions.invoke('educator-submissions', {
                body: {
                    action: 'update_slot',
                    applicantId,
                    submissionToken,
                    interviewDate,
                },
            });

            if (slotError) throw slotError;

            setCurrentStep(STEPS.PAYMENT);
        } catch (error) {
            console.error('Slot Error:', error);
            setStatus({ type: 'error', message: error.message });
        } finally {
            setUpdatingSlot(false);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setUploadingPayment(true);
        setStatus({ type: '', message: '' });

        try {
            if (!paymentData.screenshot) throw new Error('Please upload payment screenshot.');
            if (!paymentData.utr) throw new Error('Please enter UTR number.');

            const fileExt = paymentData.screenshot.name.split('.').pop();
            const fileName = `${applicantId}_payment.${fileExt}`;
            const filePath = `payments/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, paymentData.screenshot);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            const { error: paymentError } = await supabase.functions.invoke('educator-submissions', {
                body: {
                    action: 'submit_payment',
                    applicantId,
                    submissionToken,
                    utrNumber: paymentData.utr,
                    paymentScreenshotUrl: publicUrl,
                },
            });

            if (paymentError) throw paymentError;

            setCurrentStep(STEPS.SUCCESS);
        } catch (error) {
            console.error('Payment Error:', error);
            setStatus({ type: 'error', message: error.message });
        } finally {
            setUploadingPayment(false);
        }
    };

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            {/* Step Progress */}
            {(currentStep === STEPS.SLOT || currentStep === STEPS.PAYMENT) && (
                <div className={styles.progressContainer}>
                    <div className="container">
                        <div className={styles.progressBar}>
                            <div className={`${styles.step} ${styles.completed}`}>
                                <span className={styles.stepNum}>1</span>
                                <span className={styles.stepName}>Details</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={`${styles.step} ${currentStep === STEPS.SLOT ? styles.active : styles.completed}`}>
                                <span className={styles.stepNum}>2</span>
                                <span className={styles.stepName}>Schedule</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={`${styles.step} ${currentStep === STEPS.PAYMENT ? styles.active : ''}`}>
                                <span className={styles.stepNum}>3</span>
                                <span className={styles.stepName}>Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === STEPS.APPLICATION && (
                <>
                    <section className={styles.hero}>
                        <div className={styles.verticalBeams}>
                            {[...Array(12)].map((_, i) => <div key={i} className={styles.beam}></div>)}
                        </div>
                        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                            <div className={`${styles.heroContent} ${heroInView ? styles.visible : ''}`} ref={heroRef}>
                                <h1 className={styles.heroTitle}>Join the Top 1% Global <br /> Experts Shaping <br /> Tomorrow's Education</h1>
                                <p className={styles.heroSubtitle}>A global network of visionary faculty, principals, and leaders training the next generation with Tattva.</p>
                                <button onClick={handleScrollToForm} className={styles.applyBtnHero}>
                                    Apply Now
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className={`${styles.mainSection} ${mainInView ? styles.visible : ''}`} ref={mainRef}>
                        <div className="container" ref={infoRef}>
                            <div className={styles.splitLayout}>
                                <div className={`${styles.infoSide} ${infoInView ? styles.visible : ''}`}>
                                    <h2 className={styles.sectionTitle}>Built on Top Talent<br />That Delivers</h2>
                                    <p className={styles.sectionDesc}>Our network includes experts from the top schools, ambitious leaders, and dedicated educators everywhere.</p>
                                    <div className={styles.pillarsGraphic}>
                                        {[80, 120, 100, 140].map((height, i) => (
                                            <div key={i} className={styles.pillarWrapper} style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                                                <div className={styles.pillarIcon}>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <div className={styles.pillar} style={{ height: infoInView ? `${height}px` : '0px' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.formSide} ref={formRef}>
                                    <div className={styles.formGlass}>
                                        <h3 className={styles.formTitle}>Educator Application Form</h3>
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
                                                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                                    </select>
                                                </div>
                                                {formData.role === 'Subject Teacher' && (
                                                    <div className={styles.inputGroup}>
                                                        <label>Specific Subject</label>
                                                        <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g. Mathematics" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Upload Resume (PDF)</label>
                                                <div className={styles.fileUpload}>
                                                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                                                    <span className={styles.fileLabel}>{resume ? resume.name : 'Click to select or drag and drop'}</span>
                                                </div>
                                            </div>
                                            <button type="submit" disabled={loading} className={styles.submitBtn}>
                                                {loading ? 'Submitting...' : 'Apply Now'}
                                            </button>
                                            {status.message && <div className={`${styles.status} ${styles[status.type]}`}>{status.message}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentStep === STEPS.SLOT && (
                <div className={styles.slotSection}>
                    <div className="container">
                        <div className={styles.slotCard}>
                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--primary-teal)', marginBottom: '12px' }}>Select Interview Slot</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Choose your preferred date and time for the interview.</p>
                            </div>
                            <form onSubmit={handleSlotSubmit} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Preferred Date</label>
                                    <input type="date" required min={new Date().toISOString().split('T')[0]} value={selectedSlot.date} onChange={(e) => setSelectedSlot({ ...selectedSlot, date: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Preferred Time</label>
                                    <input type="time" required value={selectedSlot.time} onChange={(e) => setSelectedSlot({ ...selectedSlot, time: e.target.value })} />
                                </div>
                                <button type="submit" disabled={updatingSlot} className={styles.submitBtn}>
                                    {updatingSlot ? 'Saving Slot...' : 'Continue to Payment'}
                                </button>
                                {status.message && <div className={`${styles.status} ${styles[status.type]}`}>{status.message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === STEPS.PAYMENT && (
                <div className={styles.paymentSection}>
                    <div className="container">
                        <div className={styles.paymentHeader}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary-teal)' }}>Submit Payment Proof</h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '16px auto 0' }}>
                                Your selected interview slot: <strong>{new Date(`${selectedSlot.date}T${selectedSlot.time}`).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</strong>
                            </p>
                        </div>
                        <div className={styles.paymentGrid}>
                            <div style={{ textAlign: 'center' }}>
                                <div className={styles.qrCard}>
                                    <img src="/assets/images/tattva-upi-qr.png" alt="Payment QR" className={styles.qrImage} />
                                    <p style={{ fontWeight: 700, color: 'var(--primary-teal)', marginTop: '15px' }}>Tattva Recruiting</p>
                                </div>
                                <div className={styles.instructions}>
                                    <h4 style={{ marginBottom: '10px' }}>Instructions:</h4>
                                    <ol style={{ paddingLeft: '20px' }}>
                                        <li>Scan the QR code to pay</li>
                                        <li>Alternatively, pay via Phone Number: <strong>9652796537</strong></li>
                                        <li>Pay the one-time processing fee of ₹250</li>
                                        <li>Copy the UTR / Transaction ID</li>
                                        <li>Upload the screenshot below for verification</li>
                                    </ol>
                                </div>
                            </div>
                            <div className={styles.paymentFormCard}>
                                <form onSubmit={handlePaymentSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label>UTR Number</label>
                                        <input type="text" required value={paymentData.utr} onChange={(e) => setPaymentData({ ...paymentData, utr: e.target.value })} placeholder="12-digit transaction ID" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Payment Screenshot</label>
                                        <div className={styles.fileUpload}>
                                            <input type="file" accept="image/*" required onChange={(e) => setPaymentData({ ...paymentData, screenshot: e.target.files[0] })} />
                                            <span className={styles.fileLabel}>{paymentData.screenshot ? paymentData.screenshot.name : 'Upload receipt'}</span>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={uploadingPayment} className={styles.submitBtn}>
                                        {uploadingPayment ? 'Submitting...' : 'Submit Payment Proof'}
                                    </button>
                                    {status.message && <div className={`${styles.status} ${styles[status.type]}`}>{status.message}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === STEPS.SUCCESS && (
                <div className={styles.successSection}>
                    <div className="container">
                        <div style={{ width: '80px', height: '80px', background: '#48bb78', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--primary-teal)', marginBottom: '20px' }}>Payment Proof Submitted</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Our team will verify your payment details. Once verified, we will confirm your selected interview slot (<strong>{new Date(`${selectedSlot.date}T${selectedSlot.time}`).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</strong>).
                        </p>
                        <Link to="/" style={{ display: 'inline-block', marginTop: '40px', padding: '12px 30px', background: 'var(--primary-teal)', color: '#fff', borderRadius: '999px', textDecoration: 'none' }}>Return Home</Link>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default EducatorPage;
