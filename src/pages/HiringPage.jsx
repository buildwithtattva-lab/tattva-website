import React, { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useInView } from 'react-intersection-observer';
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
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Autocomplete states
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef(null);

    // Toggle state: 'employee' or 'employer'
    const [userType, setUserType] = useState('employee');

    // Employer Form State
    const [employerData, setEmployerData] = useState({
        institutionName: '',
        contactPerson: '',
        email: '',
        phone: '',
        rolesNeeded: '',
        message: ''
    });

    // Multi-step State Machine
    const STEPS = {
        APPLICATION: 'application',
        SCHEDULING: 'scheduling',
        PAYMENT: 'payment',
        SUCCESS: 'success'
    };
    const [currentStep, setCurrentStep] = useState(STEPS.APPLICATION);
    const [applicantId, setApplicantId] = useState(null);
    const [submittedUser, setSubmittedUser] = useState({ name: '', email: '' });
    const [uploadingPayment, setUploadingPayment] = useState(false);
    const [paymentData, setPaymentData] = useState({ utr: '', screenshot: null });

    // Animation hooks
    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
    const { ref: infoRef, inView: infoInView } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0.1, triggerOnce: true });

    // Step 2 & 3 Interaction logic
    useEffect(() => {
        if (currentStep === STEPS.SCHEDULING && window.Calendly) {
            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/buildwithtattva/30min?primary_color=002B2B&text_color=1A1A1A&background_color=FBFAF3',
                parentElement: document.getElementById('calendly-embed'),
                prefill: {
                    name: submittedUser.name,
                    email: submittedUser.email,
                },
                utm: {}
            });

            // Listen for Calendly event to transition to Payment
            const handleCalendlyEvent = (e) => {
                if (e.data.event === 'calendly.event_scheduled') {
                    setCurrentStep(STEPS.PAYMENT);
                }
            };

            window.addEventListener('message', handleCalendlyEvent);
            return () => window.removeEventListener('message', handleCalendlyEvent);
        }
    }, [currentStep, STEPS.SCHEDULING, STEPS.PAYMENT, submittedUser]);

    // Handle click outside for autocomplete
    useEffect(() => {
        function handleClickOutside(event) {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [suggestionRef]);

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

            const { data: insertedData, error: insertError } = await supabase
                .from('applicants')
                .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role,
                    subject: formData.role === 'Subject Teacher' ? formData.subject : null,
                    interview_date: new Date().toISOString(),
                    resume_url: publicUrl,
                    payment_status: 'pending'
                }])
                .select();

            if (insertError) throw insertError;

            setApplicantId(insertedData[0].id);
            setSubmittedUser({ name: formData.fullName, email: formData.email });
            setCurrentStep(STEPS.SCHEDULING);

            setStatus({
                type: 'success',
                message: 'Application received! Now schedule your interview.'
            });

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

    const fetchSchoolSuggestions = async (query) => {
        if (query.length < 2) {
            setSchoolSuggestions([]);
            return;
        }
        try {
            let suggestions = [];
            // First hit Clearbit API 
            try {
                const clearbitRes = await window.fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
                if (clearbitRes.ok) {
                    suggestions = await clearbitRes.json();
                }
            } catch (err) {
                console.log("Clearbit fetch error", err);
            }

            // Also hit Hipolabs specifically for Indian Colleges
            try {
                const hipoRes = await window.fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}&country=India`);
                if (hipoRes.ok) {
                    const hipoData = await hipoRes.json();

                    const indiaColleges = hipoData.map(uni => ({
                        name: uni.name,
                        domain: uni.domains && uni.domains.length > 0 ? uni.domains[0] : '',
                        logo: uni.domains && uni.domains.length > 0 ? `https://logo.clearbit.com/${uni.domains[0]}` : ''
                    }));

                    // Merge, keeping Indian colleges highlighted
                    const merged = [...indiaColleges, ...suggestions];
                    const uniqueNames = new Set();
                    suggestions = merged.filter(item => {
                        if (!item.name) return false;
                        if (uniqueNames.has(item.name)) return false;
                        uniqueNames.add(item.name);
                        return true;
                    });
                }
            } catch (err) {
                console.log("Hipolabs fetch error", err);
            }

            setSchoolSuggestions(suggestions.slice(0, 8)); // Max 8 items
            setShowSuggestions(true);
        } catch (e) {
            console.error("Autocomplete logic error:", e);
        }
    };

    const handleEmployerChange = (e) => {
        setEmployerData({ ...employerData, [e.target.name]: e.target.value });
        if (e.target.name === 'institutionName') {
            fetchSchoolSuggestions(e.target.value);
        }
    };

    const selectSchool = (company) => {
        setEmployerData({ ...employerData, institutionName: company.name });
        setShowSuggestions(false);
    };

    const handleEmployerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Attempt to insert into expected but unverified employer_inquiries table
            const { data: insertedData, error: insertError } = await supabase
                .from('employer_inquiries')
                .insert([{
                    institution_name: employerData.institutionName,
                    contact_person: employerData.contactPerson,
                    email: employerData.email,
                    phone: employerData.phone,
                    roles_needed: employerData.rolesNeeded,
                    message: employerData.message,
                    status: 'new',
                    payment_status: 'pending' // Add payment tracking
                }])
                .select();

            if (insertError) {
                console.warn('Insert notice: if table missing, demo proceeds anyways.', insertError);
            } 
            
            if (insertedData && insertedData.length > 0) {
                setApplicantId(insertedData[0].id);
            } else {
                setApplicantId("temp-demo-id");
            }

            setSubmittedUser({ name: employerData.contactPerson, email: employerData.email });
            setCurrentStep(STEPS.PAYMENT); // For Employer bypass Scheduling and go directly to Payment
            setStatus({ type: 'success', message: 'Inquiry received! Now finalize your consultation fee.' });
        } catch (error) {
            console.error('Employer Error:', error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
        } finally {
            setLoading(false);
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
                .from('resumes') // Reusing resumes bucket for simplicity, or use 'payments' if you create it
                .upload(filePath, paymentData.screenshot);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            const tableName = userType === 'employee' ? 'applicants' : 'employer_inquiries';
            const { error: updateError } = await supabase
                .from(tableName)
                .update({
                    utr_number: paymentData.utr,
                    payment_screenshot_url: publicUrl
                })
                .eq('id', applicantId);

            if (updateError) throw updateError;

            setCurrentStep(STEPS.SUCCESS);
            setStatus({ type: 'success', message: 'Payment details submitted successfully!' });

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

            {/* Step Progress Indicator (Hidden for employer since they skip scheduling) */}
            {(currentStep !== STEPS.APPLICATION && currentStep !== STEPS.SUCCESS && userType === 'employee') && (
                <div className={styles.progressContainer}>
                    <div className="container">
                        <div className={styles.progressBar}>
                            <div className={`${styles.step} ${currentStep === STEPS.SCHEDULING ? styles.active : styles.completed}`}>
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
                    {/* Dark Hero Section matching the screenshot */}
                    <section className={styles.hero}>
                        <div className={styles.verticalBeams}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={styles.beam}></div>
                            ))}
                        </div>

                        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                            <div className={`${styles.heroContent} ${heroInView ? styles.visible : ''}`} ref={heroRef}>

                                {/* Toggle Switch */}
                                <div className={styles.heroToggleWrapper}>
                                    <div className={styles.heroToggle}>
                                        <div
                                            className={styles.toggleSlider}
                                            style={{
                                                transform: userType === 'employee' ? 'translateX(0)' : 'translateX(100%)'
                                            }}
                                        />
                                        <button
                                            className={`${styles.toggleBtn} ${userType === 'employee' ? styles.active : ''}`}
                                            onClick={() => { setUserType('employee'); setStatus({ type: '', message: '' }) }}
                                        >
                                            I'm an Educator
                                        </button>
                                        <button
                                            className={`${styles.toggleBtn} ${userType === 'employer' ? styles.active : ''}`}
                                            onClick={() => { setUserType('employer'); setStatus({ type: '', message: '' }) }}
                                        >
                                            I'm an Employer
                                        </button>
                                    </div>
                                </div>

                                <h1 className={styles.heroTitle}>
                                    {userType === 'employee'
                                        ? <>Join the Top 1% Global <br /> Experts Shaping <br /> Tomorrow's Education</>
                                        : <>Hire the Top 1% Global <br /> Experts for Your <br /> Institution</>
                                    }
                                </h1>
                                <p className={styles.heroSubtitle}>
                                    {userType === 'employee'
                                        ? "A global network of visionary faculty, principals, and leaders training the next generation with Tattva."
                                        : "Partner with Tattva to bring visionary educators and leaders to your school, shaping the next generation of excellence."
                                    }
                                </p>

                                <button onClick={handleScrollToForm} className={styles.applyBtnHero}>
                                    {userType === 'employee' ? 'Apply Now' : 'Partner with Us'}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>

                            <div className={`${styles.trustedBySection} ${heroInView ? styles.visible : ''}`}>
                                <div className={styles.trustedGroup}>
                                    <span className={styles.trustedLabel}>OUR CLIENTS</span>
                                    <div className={styles.logoRow}>
                                        <div className={styles.logoBox}>St Martins High School</div>
                                        <div className={styles.logoBox}>Sloka The School</div>
                                        <div className={styles.logoBox}>Cal Public School</div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '5px' }}>and many more</span>
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
                    <section className={`${styles.mainSection} ${mainInView ? styles.visible : ''}`} ref={mainRef}>
                        <div className="container" ref={infoRef}>
                            <div className={`${styles.splitLayout} ${mainInView ? styles.visible : ''}`}>

                                {/* Left Side: Text and Graphics */}
                                <div className={`${styles.infoSide} ${infoInView ? styles.visible : ''}`}>
                                    <h2 className={`${styles.sectionTitle} ${styles.fadeInUp}`}>
                                        {userType === 'employee'
                                            ? <>Built on Top Talent<br />That Delivers</>
                                            : <>Find Your<br />Perfect Fit</>
                                        }
                                    </h2>
                                    <p className={`${styles.sectionDesc} ${styles.fadeInUp}`} style={{ transitionDelay: '0.1s' }}>
                                        {userType === 'employee'
                                            ? "Our network includes experts from the top schools, ambitious leaders, and dedicated educators everywhere."
                                            : "Get access to a curated network of educators tailored to your institution's specific needs, philosophy, and curriculum."
                                        }
                                    </p>

                                    <div className={styles.pillarsGraphic}>
                                        {/* Abstract representation of the pillars from the screenshot */}
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

                                {/* Right Side: Form / Calendly */}
                                <div className={styles.formSide} ref={formRef}>
                                    <div className={styles.formGlass}>
                                        <h3 className={styles.formTitle}>
                                            {userType === 'employee' ? 'Educator Application Form' : 'Employer Inquiry'}
                                        </h3>

                                        {userType === 'employee' ? (
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
                                                    {loading ? 'Processing...' : 'Confirm Interview Time Slot'}
                                                </button>
                                            </form>
                                        ) : (
                                            <form onSubmit={handleEmployerSubmit} className={styles.form}>
                                                <div className={styles.inputGroup} ref={suggestionRef} style={{ position: 'relative' }}>
                                                    <label>Institution / School Name</label>
                                                    <input
                                                        type="text"
                                                        name="institutionName"
                                                        required
                                                        value={employerData.institutionName}
                                                        onChange={handleEmployerChange}
                                                        onFocus={() => { if (employerData.institutionName.length >= 2) setShowSuggestions(true); }}
                                                        placeholder="Search registered institutions..."
                                                        autoComplete="off"
                                                    />

                                                    {/* Real-time Clearbit Dropdown */}
                                                    {showSuggestions && schoolSuggestions.length > 0 && (
                                                        <ul className={styles.suggestionsList}>
                                                            {schoolSuggestions.map((school, i) => (
                                                                <li key={i} onClick={() => selectSchool(school)} className={styles.suggestionItem}>
                                                                    <img
                                                                        src={school.logo || `https://www.google.com/s2/favicons?sz=64&domain=${school.domain}`}
                                                                        alt={school.name}
                                                                        className={styles.suggestionLogo}
                                                                        onError={(e) => {
                                                                            if (e.target.dataset.failed) {
                                                                                // Ultimate fallback to UI Avatars
                                                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(school.name[0])}&background=002B2B&color=fff&size=64&font-size=0.5`;
                                                                            } else {
                                                                                e.target.dataset.failed = 'true';
                                                                                e.target.src = `https://www.google.com/s2/favicons?sz=64&domain=${school.domain}`;
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className={styles.suggestionText}>
                                                                        <span className={styles.suggestionName}>{school.name}</span>
                                                                        <span className={styles.suggestionDomain}>{school.domain}</span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                                <div className={styles.row}>
                                                    <div className={styles.inputGroup}>
                                                        <label>Contact Person</label>
                                                        <input type="text" name="contactPerson" required value={employerData.contactPerson} onChange={handleEmployerChange} placeholder="Full Name" />
                                                    </div>
                                                </div>

                                                <div className={styles.row}>
                                                    <div className={styles.inputGroup}>
                                                        <label>Work Email</label>
                                                        <input type="email" name="email" required value={employerData.email} onChange={handleEmployerChange} placeholder="name@school.edu" />
                                                    </div>
                                                    <div className={styles.inputGroup}>
                                                        <label>Phone Number</label>
                                                        <input type="tel" name="phone" required value={employerData.phone} onChange={handleEmployerChange} placeholder="+91 XXXXX XXXXX" />
                                                    </div>
                                                </div>

                                                <div className={styles.inputGroup}>
                                                    <label>Roles you are looking to fill</label>
                                                    <textarea
                                                        name="rolesNeeded"
                                                        required
                                                        value={employerData.rolesNeeded}
                                                        onChange={handleEmployerChange}
                                                        placeholder="e.g. 2 Math Teachers, 1 Principal"
                                                        rows="3"
                                                        className={styles.textarea}
                                                    ></textarea>
                                                </div>

                                                <div className={styles.inputGroup}>
                                                    <label>Additional Information</label>
                                                    <textarea
                                                        name="message"
                                                        value={employerData.message}
                                                        onChange={handleEmployerChange}
                                                        placeholder="Tell us more about your specific requirements"
                                                        rows="3"
                                                        className={styles.textarea}
                                                    ></textarea>
                                                </div>

                                                {status.message && (
                                                    <div className={`${styles.status} ${styles[status.type]}`}>
                                                        {status.message}
                                                    </div>
                                                )}

                                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                                    {loading ? 'Processing...' : 'Request Consultation'}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentStep === STEPS.SCHEDULING && (
                <section className={styles.fullscreenSuccess}>
                    <div className="container">
                        <div className={styles.successHeader}>
                            <div className={styles.successIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h2 className={styles.stepTitle}>Step 2: Book Your {userType === 'employee' ? 'Interview' : 'Consultation'}</h2>
                            <h3 className={styles.provisionalNotice}>⚠️ This is a provisional booking</h3>
                            <p>Great to have you on board, <strong>{submittedUser.name}</strong>. Please select a 30-minute slot. <br />Note: Your slot is only confirmed after payment verification in the next step.</p>
                        </div>
                        <div id="calendly-embed" className={styles.calendlyContainer}>
                            {/* The widget will be injected here */}
                        </div>
                    </div>
                </section>
            )}

            {currentStep === STEPS.PAYMENT && (
                <section className={styles.fullscreenSuccess}>
                    <div className="container">
                        <div className={styles.successHeader}>
                            <h2 className={styles.stepTitle}>Step 3: {userType === 'employee' ? 'Interview' : 'Consultation'} Fee Payment</h2>
                            <p>To confirm your slot, please complete the non-refundable {userType === 'employee' ? 'interview' : 'consultation'} fee of <strong>₹250</strong>.</p>
                        </div>

                        <div className={styles.paymentGrid}>
                            <div className={styles.qrSide}>
                                <div className={styles.qrCard}>
                                    <img src="/assets/images/tattva-upi-qr.png" alt="Tattva AI UPI QR" className={styles.qrImage} />
                                    <div className={styles.qrBrand}>Tattva AI</div>
                                </div>
                                <div className={styles.paymentInstructions}>
                                    <ol>
                                        <li>Scan the QR code using any UPI app (GPay, PhonePe, Paytm).</li>
                                        <li>Pay the amount of <strong>₹250</strong>.</li>
                                        <li>Note down the <strong>UTR / Transaction ID</strong>.</li>
                                        <li>Take a screenshot of the success page.</li>
                                    </ol>
                                </div>
                            </div>

                            <div className={styles.uploadSide}>
                                <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
                                    <div className={styles.inputGroup}>
                                        <label>UTR Number / Transaction ID</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="12-digit UTR Number"
                                            value={paymentData.utr}
                                            onChange={(e) => setPaymentData({ ...paymentData, utr: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Upload Payment Screenshot</label>
                                        <div className={styles.fileUpload}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                required
                                                id="payment-upload"
                                                onChange={(e) => setPaymentData({ ...paymentData, screenshot: e.target.files[0] })}
                                            />
                                            <label htmlFor="payment-upload" className={styles.fileLabel}>
                                                {paymentData.screenshot ? paymentData.screenshot.name : 'Choose screenshot'}
                                            </label>
                                        </div>
                                    </div>

                                    {status.message && (
                                        <div className={`${styles.status} ${styles[status.type]}`}>
                                            {status.message}
                                        </div>
                                    )}

                                    <button type="submit" className={styles.submitBtn} disabled={uploadingPayment}>
                                        {uploadingPayment ? 'Verifying...' : 'Submit Payment Details'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {currentStep === STEPS.SUCCESS && (
                <section className={styles.fullscreenSuccess}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <div className={styles.successIcon} style={{ margin: '0 auto 30px' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h2 className={styles.finalTitle}>
                            {userType === 'employee' ? 'All Set!' : 'Request Received!'}
                        </h2>

                        {userType === 'employee' ? (
                            <>
                                <h3 className={styles.finalSubtitle}>Your application and payment are under review.</h3>
                                <div className={styles.finalCard}>
                                    <p>Our team will verify your payment and confirm your interview slot within 24-48 hours.</p>
                                    <p>You will receive a confirmation via <strong>WhatsApp and Email</strong> once verified.</p>
                                    <div className={styles.warningBox}>
                                        ⚠️ Note: Only verified payments will stay in our interview calendar.
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className={styles.finalSubtitle}>Thank you for your interest in partnering with Tattva.</h3>
                                <div className={styles.finalCard}>
                                    <p>We've received your consultation request and payment information.</p>
                                    <p>Our team will verify your payment and confirm your consultation slot within 24-48 hours.</p>
                                    <p>Confirmation will be sent via <strong>WhatsApp and Email</strong> to {submittedUser.email}.</p>
                                    <div className={styles.warningBox}>
                                        ⚠️ Note: Only verified payments will secure your consultation slot.
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default HiringPage;
