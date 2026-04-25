import { useEffect, useMemo, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import styles from './AdminReviewPage.module.css';

const FILTERS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    REJECTED: 'rejected',
    ALL: 'all',
};

const TAB_TYPES = {
    EDUCATORS: 'educators',
    EMPLOYERS: 'employers',
};

const formatDate = (value) => {
    if (!value) {
        return 'Not available';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Not available';
    }

    return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
    }).format(date);
};

const isPending = (applicant) => applicant.payment_status === 'pending_verification';
const isCompleted = (applicant) => applicant.application_status === 'interview_confirmed';
const isRejected = (applicant) => applicant.payment_status === 'rejected';

const AdminReviewPage = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [authError, setAuthError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState(FILTERS.PENDING);
    const [activeTab, setActiveTab] = useState(TAB_TYPES.EDUCATORS);
    const [searchTerm, setSearchTerm] = useState('');
    const [applicants, setApplicants] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [notesById, setNotesById] = useState({});

    useEffect(() => {
        const adminEmail = localStorage.getItem('tattva_admin_session');
        if (adminEmail) {
            setCurrentUser({ email: adminEmail });
            setIsAuthorized(true);
            setAuthLoading(false);
        } else {
            setAuthLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authLoading || isCheckingAuth || !currentUser || !isAuthorized) {
            if (!authLoading && !isCheckingAuth) {
                setLoading(false);
            }
            return;
        }

        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            setErrorMessage('');

            if (activeTab === TAB_TYPES.EDUCATORS) {
                const { data, error } = await supabase
                    .from('applicant_review_queue')
                    .select('*')
                    .order('payment_submitted_at', { ascending: false });

                if (!isMounted) return;

                if (error) {
                    setErrorMessage(error.message || 'Could not load applicants.');
                    setApplicants([]);
                } else {
                    setApplicants(data || []);
                    setNotesById((currentNotes) => {
                        const nextNotes = { ...currentNotes };
                        (data || []).forEach((a) => {
                            if (nextNotes[a.applicant_id] === undefined) {
                                nextNotes[a.applicant_id] = a.admin_notes || '';
                            }
                        });
                        return nextNotes;
                    });
                }
            } else {
                const { data, error } = await supabase
                    .from('employer_review_queue')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!isMounted) return;

                if (error) {
                    setErrorMessage(error.message || 'Could not load employer inquiries.');
                    setEmployers([]);
                } else {
                    setEmployers(data || []);
                    setNotesById((currentNotes) => {
                        const nextNotes = { ...currentNotes };
                        (data || []).forEach((e) => {
                            if (nextNotes[e.inquiry_id] === undefined) {
                                nextNotes[e.inquiry_id] = e.admin_notes || '';
                            }
                        });
                        return nextNotes;
                    });
                }
            }
            setLoading(false);
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [authLoading, isCheckingAuth, currentUser, isAuthorized, activeTab]);

    const filteredData = useMemo(() => {
        let base = activeTab === TAB_TYPES.EDUCATORS ? applicants : employers;
        const term = searchTerm.toLowerCase().trim();

        // Apply status filter
        if (activeTab === TAB_TYPES.EDUCATORS) {
            switch (filter) {
                case FILTERS.PENDING: base = base.filter(isPending); break;
                case FILTERS.COMPLETED: base = base.filter(isCompleted); break;
                case FILTERS.REJECTED: base = base.filter(isRejected); break;
                default: break;
            }
        } else {
            switch (filter) {
                case FILTERS.PENDING: base = base.filter(e => e.status === 'new' || e.status === 'in_progress'); break;
                case FILTERS.COMPLETED: base = base.filter(e => e.status === 'completed'); break;
                case FILTERS.REJECTED: base = base.filter(e => e.status === 'rejected'); break;
                default: break;
            }
        }

        // Apply search
        if (term) {
            if (activeTab === TAB_TYPES.EDUCATORS) {
                base = base.filter(a => 
                    (a.full_name || '').toLowerCase().includes(term) ||
                    (a.email || '').toLowerCase().includes(term) ||
                    (a.utr_number || '').toLowerCase().includes(term)
                );
            } else {
                base = base.filter(e => 
                    (e.institution_name || '').toLowerCase().includes(term) ||
                    (e.contact_person || '').toLowerCase().includes(term) ||
                    (e.email || '').toLowerCase().includes(term)
                );
            }
        }

        return base;
    }, [applicants, employers, filter, searchTerm, activeTab]);

    const updateLocalItem = (id, updates) => {
        if (activeTab === TAB_TYPES.EDUCATORS) {
            setApplicants(prev => prev.map(a => a.applicant_id === id ? { ...a, ...updates } : a));
        } else {
            setEmployers(prev => prev.map(e => e.inquiry_id === id ? { ...e, ...updates } : e));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setAuthError('');

        const { data, error } = await supabase.rpc('verify_admin_login', {
            p_email: loginForm.email.trim(),
            p_password: password.trim(),
        });

        if (error) {
            setAuthError(error.message || 'Verification system error.');
            setLoginLoading(false);
            return;
        }

        if (!data) {
            setAuthError('Invalid email or password.');
            setLoginLoading(false);
            return;
        }

        localStorage.setItem('tattva_admin_session', loginForm.email.trim());
        setCurrentUser({ email: loginForm.email.trim() });
        setIsAuthorized(true);
        setLoginLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('tattva_admin_session');
        setCurrentUser(null);
        setIsAuthorized(false);
        setApplicants([]);
        setEmployers([]);
        setNotesById({});
        setStatusMessage('');
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setStatusMessage(`${label} copied to clipboard!`);
        setTimeout(() => setStatusMessage(''), 3000);
    };

    const handleStatusUpdate = async (item, nextState) => {
        const id = activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id;
        setSavingId(id);
        setStatusMessage('');
        setErrorMessage('');

        const sharedFields = {
            admin_notes: notesById[id] || null,
        };

        let updatePayload;

        if (activeTab === TAB_TYPES.EDUCATORS) {
            if (nextState === 'completed') {
                updatePayload = {
                    ...sharedFields,
                    payment_status: 'verified',
                    application_status: 'interview_confirmed',
                    slot_status: 'confirmed',
                    payment_verified_at: new Date().toISOString(),
                    confirmed_at: new Date().toISOString(),
                };
            } else {
                updatePayload = {
                    ...sharedFields,
                    payment_status: 'rejected',
                    application_status: 'payment_rejected',
                    confirmed_at: null,
                };
            }
        } else {
            // Employer update
            updatePayload = {
                ...sharedFields,
                status: nextState === 'completed' ? 'completed' : 'rejected',
                updated_at: new Date().toISOString(),
            };
        }

        const { error } = await supabase
            .from(activeTab === TAB_TYPES.EDUCATORS ? 'applicants' : 'employer_inquiries')
            .update(updatePayload)
            .eq('id', id);

        if (error) {
            setErrorMessage(error.message || 'Could not update status.');
            setSavingId('');
            return;
        }

        updateLocalItem(id, updatePayload);
        setSavingId('');
        setStatusMessage(
            nextState === 'completed'
                ? `Successfully confirmed ${activeTab === TAB_TYPES.EDUCATORS ? item.full_name : item.institution_name}.`
                : `Marked as rejected.`
        );
    };

    return (
        <div className={styles.page}>
            <Navigation isSolid={true} />

            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.eyebrow}>Admin Review</span>
                        <h1 className={styles.title}>Payment Verification Dashboard</h1>
                        <p className={styles.subtitle}>
                            Review educator applications, check payment proof, and mark the application as completed only after manual verification.
                        </p>
                    </div>
                </div>
            </section>

            {authLoading || isCheckingAuth ? (
                <section className={styles.unlockSection}>
                    <div className="container">
                        <div className={styles.unlockCard}>
                            <div className={styles.loader}></div>
                            <p>Verifying admin session...</p>
                        </div>
                    </div>
                </section>
            ) : !currentUser ? (
                <section className={styles.unlockSection}>
                    <div className="container">
                        <div className={styles.unlockCard}>
                            <h2>Admin Sign In</h2>
                            <p className={styles.unlockCopy}>
                                Sign in with your Supabase admin account to review payments and approve interview emails.
                            </p>
                            <form onSubmit={handleLogin} className={styles.unlockForm}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm((currentForm) => ({ ...currentForm, email: e.target.value }))}
                                        placeholder="Admin email"
                                        required
                                        disabled={loginLoading}
                                    />
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password"
                                        required
                                        disabled={loginLoading}
                                    />
                                </div>
                                <button type="submit" className={styles.primaryBtn} disabled={loginLoading}>
                                    {loginLoading ? 'Verifying...' : 'Sign In'}
                                </button>
                            </form>
                            {authError && <p className={styles.error}>{authError}</p>}
                        </div>
                    </div>
                </section>
            ) : !isAuthorized ? (
                <section className={styles.unlockSection}>
                    <div className="container">
                        <div className={styles.unlockCard}>
                            <div className={styles.errorIcon}>!</div>
                            <h2>Access Denied</h2>
                            <p className={styles.unlockCopy}>
                                Signed in as <strong>{currentUser.email}</strong>, but this account is not present in `public.admin_users`.
                            </p>
                            <button type="button" className={styles.signOutButton} onClick={handleLogout}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={styles.dashboardSection}>
                    <div className="container">
                        <div className={styles.tabs}>
                            <button
                                type="button"
                                className={`${styles.tab} ${activeTab === TAB_TYPES.EDUCATORS ? styles.activeTab : ''}`}
                                onClick={() => {
                                    setActiveTab(TAB_TYPES.EDUCATORS);
                                    setFilter(FILTERS.PENDING);
                                    setSearchTerm('');
                                }}
                            >
                                Educator Applicants
                                <span className={styles.tabCount}>{applicants.filter(isPending).length}</span>
                            </button>
                            <button
                                type="button"
                                className={`${styles.tab} ${activeTab === TAB_TYPES.EMPLOYERS ? styles.activeTab : ''}`}
                                onClick={() => {
                                    setActiveTab(TAB_TYPES.EMPLOYERS);
                                    setFilter(FILTERS.PENDING);
                                    setSearchTerm('');
                                }}
                            >
                                Employer Inquiries
                                <span className={styles.tabCount}>{employers.filter(e => e.status === 'new').length}</span>
                            </button>
                        </div>

                        <div className={styles.toolbar}>
                            <div className={styles.toolbarMain}>
                                <div className={styles.filterGroup}>
                                    {[
                                        { key: FILTERS.PENDING, label: 'Pending' },
                                        { key: FILTERS.COMPLETED, label: 'Completed' },
                                        { key: FILTERS.REJECTED, label: 'Rejected' },
                                        { key: FILTERS.ALL, label: 'All' },
                                    ].map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            className={`${styles.filterButton} ${filter === item.key ? styles.filterButtonActive : ''}`}
                                            onClick={() => setFilter(item.key)}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className={styles.searchWrapper}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search by name, email or UTR..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>
                            </div>
                            <div className={styles.meta}>
                                <div className={styles.stats}>
                                    <span className={styles.count}>{filteredData.length}</span>
                                    <span>{activeTab} found</span>
                                </div>
                                <div className={styles.userProfile}>
                                    <div className={styles.userAvatar}>
                                        {currentUser.email[0].toUpperCase()}
                                    </div>
                                    <div className={styles.userDetails}>
                                        <span className={styles.currentUser}>{currentUser.email}</span>
                                        <button type="button" className={styles.logoutLink} onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {statusMessage && <div className={styles.successToast}>{statusMessage}</div>}
                        {errorMessage && <div className={styles.errorToast}>{errorMessage}</div>}

                        {loading ? (
                            <div className={styles.loadingState}>
                                <div className={styles.loader}></div>
                                <p>Fetching {activeTab}...</p>
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>∅</div>
                                <p>No {activeTab} match your criteria.</p>
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>Clear Search</button>
                                )}
                            </div>
                        ) : (
                            <div className={styles.cardGrid}>
                                {filteredData.map((item) => (
                                    <article key={activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id} className={styles.card}>
                                        {activeTab === TAB_TYPES.EDUCATORS ? (
                                            <>
                                                {/* Educator Card Content */}
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.applicantInfo}>
                                                        <div className={styles.avatar}>
                                                            {(item.full_name || 'A')[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3>{item.full_name}</h3>
                                                            <p className={styles.roleTag}>
                                                                {item.role}
                                                                {item.subject && <span> • {item.subject}</span>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className={`${styles.badge} ${isCompleted(item) ? styles.badgeComplete : isRejected(item) ? styles.badgeRejected : styles.badgePending}`}>
                                                        {isCompleted(item) ? 'Verified' : isRejected(item) ? 'Rejected' : 'Pending Review'}
                                                    </span>
                                                </div>

                                                <div className={styles.detailsGrid}>
                                                    <div className={styles.detailItem} onClick={() => handleCopy(item.email, 'Email')}>
                                                        <label>Email Address</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{item.email || 'N/A'}</span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem}>
                                                        <label>Requested Slot</label>
                                                        <div className={styles.detailValue}>
                                                            <span style={{ color: 'var(--primary-teal)', fontWeight: 700 }}>
                                                                {item.interview_date ? formatDate(item.interview_date) : 'Not Selected'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem}>
                                                        <label>Submitted Date</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{formatDate(item.payment_submitted_at)}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem} onClick={() => handleCopy(item.utr_number, 'UTR')}>
                                                        <label>UTR Number</label>
                                                        <div className={styles.detailValue}>
                                                            <span className={styles.utrText}>{item.utr_number || 'N/A'}</span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.links}>
                                                    <a href={item.resume_url || '#'} target="_blank" rel="noopener noreferrer" className={`${styles.actionLink} ${!item.resume_url ? styles.linkDisabled : ''}`}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                                        Resume
                                                    </a>
                                                    <a href={item.payment_screenshot_url || '#'} target="_blank" rel="noopener noreferrer" className={`${styles.actionLink} ${!item.payment_screenshot_url ? styles.linkDisabled : ''}`}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                        Payment Proof
                                                    </a>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Employer Card Content */}
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.applicantInfo}>
                                                        <div className={styles.avatar}>
                                                            {(item.institution_name || 'E')[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3>{item.institution_name}</h3>
                                                            <p className={styles.roleTag}>{item.contact_person}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`${styles.badge} ${item.status === 'completed' ? styles.badgeComplete : item.status === 'rejected' ? styles.badgeRejected : styles.badgePending}`}>
                                                        {item.status === 'completed' ? 'Partnered' : item.status === 'rejected' ? 'Rejected' : 'New Lead'}
                                                    </span>
                                                </div>

                                                <div className={styles.detailsGrid}>
                                                    <div className={styles.detailItem} onClick={() => handleCopy(item.email, 'Email')}>
                                                        <label>Institutional Email</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{item.email}</span>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem} onClick={() => handleCopy(item.phone, 'Phone')}>
                                                        <label>Phone Number</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{item.phone}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem}>
                                                        <label>Roles Needed</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{item.roles_needed || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.detailItem}>
                                                        <label>Inquiry Date</label>
                                                        <div className={styles.detailValue}>
                                                            <span>{formatDate(item.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.messageBox}>
                                                    <label>Inquiry Message</label>
                                                    <p>{item.message || 'No message provided.'}</p>
                                                </div>
                                            </>
                                        )}

                                        <div className={styles.noteSection}>
                                            <label htmlFor={`notes-${activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id}`}>Admin Notes</label>
                                            <textarea
                                                id={`notes-${activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id}`}
                                                value={notesById[activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id] || ''}
                                                onChange={(e) => setNotesById((currentNotes) => ({
                                                    ...currentNotes,
                                                    [activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id]: e.target.value,
                                                }))}
                                                placeholder="Verification notes or rejection reason..."
                                            />
                                        </div>

                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={styles.completeButton}
                                                disabled={savingId === (activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id) || (activeTab === TAB_TYPES.EDUCATORS ? isCompleted(item) : item.status === 'completed')}
                                                onClick={() => handleStatusUpdate(item, 'completed')}
                                            >
                                                {savingId === (activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id) ? 'Saving...' : activeTab === TAB_TYPES.EDUCATORS ? 'Confirm Slot' : 'Mark Partnered'}
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.rejectButton}
                                                disabled={savingId === (activeTab === TAB_TYPES.EDUCATORS ? item.applicant_id : item.inquiry_id) || (activeTab === TAB_TYPES.EDUCATORS ? isRejected(item) : item.status === 'rejected')}
                                                onClick={() => handleStatusUpdate(item, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};


export default AdminReviewPage;
