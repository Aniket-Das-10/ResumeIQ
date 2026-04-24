import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getInterviewReport } from '../services/interview.api';
import { useAuth } from '../auth.contex';
import InterviewReport from './InterviewReport';
import './InterviewPage.css';

export default function ReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Wait until auth state is resolved
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getInterviewReport(id);
        setReport(data.interviewReport);
      } catch (err) {
        setError(err.error || 'Failed to load the report. It may have been deleted or you may not have access.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, isAuthenticated, authLoading, navigate]);

  // Auth is still resolving
  if (authLoading) {
    return <FullPageSpinner message="Checking authentication..." />;
  }

  // Report is loading
  if (loading) {
    return <FullPageSpinner message="Loading your report..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="interview-page">
        <div className="interview-bg" aria-hidden="true">
          <div className="interview-bg__gradient" />
          <div className="interview-bg__orb interview-bg__orb--1" />
          <div className="interview-bg__orb interview-bg__orb--2" />
          <div className="interview-bg__grid" />
        </div>
        <div className="report-error-page">
          <div className="report-error-card">
            <div className="report-error-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="report-error-title">Report Not Found</h2>
            <p className="report-error-desc">{error}</p>
            <div className="report-error-actions">
              <Link to="/interview" className="report-error-btn report-error-btn--primary" id="error-new-report">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Generate New Report
              </Link>
              <button onClick={() => navigate(-1)} className="report-error-btn report-error-btn--secondary" id="error-go-back">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the report — passing navigate to /interview as the "new report" reset handler
  return <InterviewReport report={report} onReset={() => navigate('/interview')} />;
}

/* ─── Full-page spinner shared state ─── */
function FullPageSpinner({ message }) {
  return (
    <div className="interview-page">
      <div className="interview-bg" aria-hidden="true">
        <div className="interview-bg__gradient" />
        <div className="interview-bg__orb interview-bg__orb--1" />
        <div className="interview-bg__orb interview-bg__orb--2" />
        <div className="interview-bg__grid" />
      </div>
      <div className="report-loading-page">
        <div className="interview-loading-spinner" style={{ width: 72, height: 72, margin: '0 auto 24px' }}>
          <div className="interview-loading-spinner__ring" />
          <div className="interview-loading-spinner__ring interview-loading-spinner__ring--2" />
          <div className="interview-loading-spinner__core">
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <p className="report-loading-msg">{message}</p>
      </div>
    </div>
  );
}
