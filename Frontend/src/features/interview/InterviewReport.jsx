import { useState } from 'react';
import './InterviewPage.css';

export default function InterviewReport({ report, onReset }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: overviewIcon },
    { id: 'technical', label: 'Technical Q&A', icon: technicalIcon },
    { id: 'behavioral', label: 'Behavioral Q&A', icon: behavioralIcon },
    { id: 'skillgap', label: 'Skill Gaps', icon: skillgapIcon },
    { id: 'plan', label: 'Prep Plan', icon: planIcon },
  ];

  const toggleQuestion = (idx) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  const severityColor = (severity) => {
    switch (severity) {
      case 'high': return { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', text: '#f87171', dot: '#ef4444' };
      case 'medium': return { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24', dot: '#f59e0b' };
      case 'low': return { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', text: '#4ade80', dot: '#22c55e' };
      default: return { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)', text: '#94a3b8', dot: '#64748b' };
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#fbbf24';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const scoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Work';
  };

  return (
    <div className="interview-page">
      {/* Background */}
      <div className="interview-bg" aria-hidden="true">
        <div className="interview-bg__gradient" />
        <div className="interview-bg__orb interview-bg__orb--1" />
        <div className="interview-bg__orb interview-bg__orb--2" />
        <div className="interview-bg__orb interview-bg__orb--3" />
        <div className="interview-bg__grid" />
      </div>

      <div className="interview-content interview-content--report">
        {/* Report Header */}
        <header className="report-header">
          <div className="report-header__left">
            <div className="interview-header__badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Report Generated
            </div>
            <h1 className="report-header__title">Your Interview Prep Report</h1>
          </div>
          <button className="report-header__new-btn" onClick={onReset} id="new-report-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Report
          </button>
        </header>

        {/* Score Card */}
        <div className="report-score-card">
          <div className="report-score__ring-wrapper">
            <svg className="report-score__ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={scoreColor(report.matchScore)}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(report.matchScore / 100) * 326.7} 326.7`}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dasharray 1.5s ease' }}
              />
            </svg>
            <div className="report-score__value">
              <span className="report-score__number" style={{ color: scoreColor(report.matchScore) }}>
                {report.matchScore}
              </span>
              <span className="report-score__percent">%</span>
            </div>
          </div>
          <div className="report-score__info">
            <h2 className="report-score__label" style={{ color: scoreColor(report.matchScore) }}>
              {scoreLabel(report.matchScore)}
            </h2>
            <p className="report-score__desc">
              Based on your resume analysis against the job requirements
            </p>
            <div className="report-score__stats">
              <div className="report-score__stat">
                <span className="report-score__stat-num">{report.technicalQuestions?.length || 0}</span>
                <span className="report-score__stat-label">Technical Q's</span>
              </div>
              <div className="report-score__stat-divider" />
              <div className="report-score__stat">
                <span className="report-score__stat-num">{report.behavioralQuestions?.length || 0}</span>
                <span className="report-score__stat-label">Behavioral Q's</span>
              </div>
              <div className="report-score__stat-divider" />
              <div className="report-score__stat">
                <span className="report-score__stat-num">{report.skillGap?.length || 0}</span>
                <span className="report-score__stat-label">Skill Gaps</span>
              </div>
              <div className="report-score__stat-divider" />
              <div className="report-score__stat">
                <span className="report-score__stat-num">{report.preparationPlan?.length || 0}</span>
                <span className="report-score__stat-label">Day Plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="report-tabs" id="report-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`report-tab ${activeTab === tab.id ? 'report-tab--active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setExpandedQuestion(null); }}
              id={`tab-${tab.id}`}
            >
              {tab.icon()}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="report-panel" key={activeTab}>
          {activeTab === 'overview' && (
            <div className="report-overview">
              <div className="report-card">
                <h3 className="report-card__title">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
                  Self Description
                </h3>
                <p className="report-card__text">{report.selfDescription}</p>
              </div>
              <div className="report-card">
                <h3 className="report-card__title">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  Job Description
                </h3>
                <p className="report-card__text">{report.jobDescription}</p>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="report-questions">
              {report.technicalQuestions?.map((q, idx) => (
                <div
                  key={idx}
                  className={`report-question ${expandedQuestion === idx ? 'report-question--expanded' : ''}`}
                  onClick={() => toggleQuestion(idx)}
                  id={`tech-q-${idx}`}
                >
                  <div className="report-question__header">
                    <span className="report-question__number">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="report-question__text">{q.question}</span>
                    <svg className="report-question__chevron" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedQuestion === idx && (
                    <div className="report-question__body">
                      <div className="report-question__section">
                        <h4>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                          Why they ask this
                        </h4>
                        <p>{q.intention}</p>
                      </div>
                      <div className="report-question__section report-question__section--answer">
                        <h4>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Suggested Answer
                        </h4>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {(!report.technicalQuestions || report.technicalQuestions.length === 0) && (
                <div className="report-empty">No technical questions generated.</div>
              )}
            </div>
          )}

          {activeTab === 'behavioral' && (
            <div className="report-questions">
              {report.behavioralQuestions?.map((q, idx) => (
                <div
                  key={idx}
                  className={`report-question ${expandedQuestion === idx ? 'report-question--expanded' : ''}`}
                  onClick={() => toggleQuestion(idx)}
                  id={`behav-q-${idx}`}
                >
                  <div className="report-question__header">
                    <span className="report-question__number">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="report-question__text">{q.question}</span>
                    <svg className="report-question__chevron" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedQuestion === idx && (
                    <div className="report-question__body">
                      <div className="report-question__section">
                        <h4>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                          Why they ask this
                        </h4>
                        <p>{q.intention}</p>
                      </div>
                      <div className="report-question__section report-question__section--answer">
                        <h4>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Suggested Answer
                        </h4>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {(!report.behavioralQuestions || report.behavioralQuestions.length === 0) && (
                <div className="report-empty">No behavioral questions generated.</div>
              )}
            </div>
          )}

          {activeTab === 'skillgap' && (
            <div className="report-skillgaps">
              {report.skillGap?.map((gap, idx) => {
                const colors = severityColor(gap.severity);
                return (
                  <div
                    key={idx}
                    className="report-skillgap"
                    style={{ borderColor: colors.border, backgroundColor: colors.bg }}
                    id={`skill-gap-${idx}`}
                  >
                    <div className="report-skillgap__header">
                      <div className="report-skillgap__dot" style={{ backgroundColor: colors.dot }} />
                      <h3 className="report-skillgap__skill">{gap.skill}</h3>
                      <span className="report-skillgap__severity" style={{ color: colors.text, borderColor: colors.border }}>
                        {gap.severity}
                      </span>
                    </div>
                    <p className="report-skillgap__type">{gap.type}</p>
                  </div>
                );
              })}
              {(!report.skillGap || report.skillGap.length === 0) && (
                <div className="report-empty">No skill gaps identified — great job!</div>
              )}
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="report-plan">
              {report.preparationPlan?.map((dayPlan, idx) => (
                <div key={idx} className="report-plan-day" id={`plan-day-${idx}`}>
                  <div className="report-plan-day__marker">
                    <div className="report-plan-day__dot" />
                    {idx < report.preparationPlan.length - 1 && <div className="report-plan-day__line" />}
                  </div>
                  <div className="report-plan-day__content">
                    <div className="report-plan-day__header">
                      <span className="report-plan-day__label">Day {dayPlan.day}</span>
                      <span className="report-plan-day__focus">{dayPlan.focus}</span>
                    </div>
                    <ul className="report-plan-day__tasks">
                      {dayPlan.task?.map((t, tIdx) => (
                        <li key={tIdx} className="report-plan-day__task">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {(!report.preparationPlan || report.preparationPlan.length === 0) && (
                <div className="report-empty">No preparation plan generated.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab icon helpers ─── */
function overviewIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
    </svg>
  );
}
function technicalIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}
function behavioralIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}
function skillgapIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
function planIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}
