import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getInterviewHistory } from '../services/interview.api';
import { useAuth } from '../auth.contex';
import './InterviewPage.css';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getInterviewHistory();
        setReports(data.reports || []);
      } catch (err) {
        setError(err.error || 'Failed to load report history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="interview-page">
        <div className="interview-bg" aria-hidden="true">
          <div className="interview-bg__gradient" />
          <div className="interview-bg__grid" />
        </div>
        <div className="report-loading-page">
           <div className="interview-loading-spinner">
             <div className="interview-loading-spinner__ring" />
             <div className="interview-loading-spinner__core">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
             </div>
           </div>
           <p className="report-loading-msg">{authLoading ? 'Verifying...' : 'Fetching your history...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page">
      {/* Background */}
      <div className="interview-bg" aria-hidden="true">
        <div className="interview-bg__gradient" />
        <div className="interview-bg__orb interview-bg__orb--1" />
        <div className="interview-bg__orb interview-bg__orb--2" />
        <div className="interview-bg__grid" />
      </div>

      <div className="interview-content interview-content--report">
        <header className="report-header">
          <div className="report-header__left">
            <div className="interview-header__badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              My History
            </div>
            <h1 className="report-header__title">Your Past Reports</h1>
          </div>
          <Link to="/interview" className="report-header__new-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Report
          </Link>
        </header>

        {error && <div className="interview-form__error" style={{ marginBottom: 24 }}>{error}</div>}

        {reports.length === 0 ? (
          <div className="history-empty">
            <div className="history-empty__icon">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3>No reports yet</h3>
            <p>Generate your first AI interview report to see it here.</p>
            <Link to="/interview" className="interview-form__submit" style={{ maxWidth: 240, marginTop: 24, textDecoration: 'none' }}>
              Create Report
            </Link>
          </div>
        ) : (
          <div className="history-grid">
            {reports.map((report) => (
              <Link 
                to={`/interview/report/${report._id}`} 
                key={report._id} 
                className="history-card"
              >
                <div className="history-card__header">
                  <div className="history-card__score" style={{ 
                    borderColor: report.matchScore >= 80 ? '#22c55e' : report.matchScore >= 50 ? '#fbbf24' : '#ef4444',
                    color: report.matchScore >= 80 ? '#22c55e' : report.matchScore >= 50 ? '#fbbf24' : '#ef4444'
                  }}>
                    {report.matchScore}%
                  </div>
                  <div className="history-card__date">
                    {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="history-card__body">
                  <h3 className="history-card__role">
                    {report.jobDescription.split('\n')[0].replace(/[*#]/g, '').trim() || 'Software Engineer'}
                  </h3>
                  <p className="history-card__summary">
                    {report.selfDescription.substring(0, 100)}...
                  </p>
                </div>
                <div className="history-card__footer">
                  <span>View Full Report</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
