import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.contex';
import { generateInterview } from '../services/interview.api';
import './InterviewPage.css';

export default function InterviewPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [selfDescription, setSelfDescription] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Progress steps for loading animation
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    'Parsing your resume...',
    'Analyzing job requirements...',
    'Identifying skill gaps...',
    'Generating interview questions...',
    'Building preparation plan...',
    'Finalizing your report...',
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
    } else {
      setError('Please upload a PDF file.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
    } else if (file) {
      setError('Please upload a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!resumeFile) { setError('Please upload your resume.'); return; }
    if (!selfDescription.trim()) { setError('Please provide a self description.'); return; }
    if (!jobDescription.trim()) { setError('Please provide a job description.'); return; }

    setLoading(true);
    setError('');
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 3500);

    try {
      const data = await generateInterview(resumeFile, selfDescription, jobDescription);
      navigate(`/interview/report/${data.interviewReport._id}`);
    } catch (err) {
      setError(err.error || 'Failed to generate interview report. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  return (
    <div className="interview-page">
      {/* Background effects */}
      <div className="interview-bg" aria-hidden="true">
        <div className="interview-bg__gradient" />
        <div className="interview-bg__orb interview-bg__orb--1" />
        <div className="interview-bg__orb interview-bg__orb--2" />
        <div className="interview-bg__orb interview-bg__orb--3" />
        <div className="interview-bg__grid" />
      </div>

      <div className="interview-content">
        {/* Loading Overlay */}
        {loading && (
          <div className="interview-loading-overlay">
            <div className="interview-loading-card">
              <div className="interview-loading-spinner">
                <div className="interview-loading-spinner__ring" />
                <div className="interview-loading-spinner__ring interview-loading-spinner__ring--2" />
                <div className="interview-loading-spinner__core">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
              </div>
              <h3 className="interview-loading__title">Generating Your Report</h3>
              <p className="interview-loading__step">{loadingSteps[loadingStep]}</p>
              <div className="interview-loading__progress">
                <div
                  className="interview-loading__progress-bar"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
              <p className="interview-loading__hint">This may take 30-60 seconds</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="interview-header">
          <div className="interview-header__badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            AI Interview Prep
          </div>
          <h1 className="interview-header__title">
            Ace Your Next
            <span className="interview-header__gradient-text"> Interview</span>
          </h1>
          <p className="interview-header__subtitle">
            Upload your resume, describe yourself and the job — our AI generates a personalized
            interview preparation report with questions, skill gaps, and a study plan.
          </p>
        </header>

        {/* Form */}
        <form className="interview-form" onSubmit={handleSubmit} id="interview-generate-form">
          {/* Resume Upload */}
          <div className="interview-form__section">
            <label className="interview-form__label">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume (PDF)
            </label>
            <div
              className={`interview-dropzone ${dragActive ? 'interview-dropzone--active' : ''} ${resumeFile ? 'interview-dropzone--has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              id="resume-dropzone"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="resume-file-input"
              />
              {resumeFile ? (
                <div className="interview-dropzone__file">
                  <div className="interview-dropzone__file-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="interview-dropzone__file-info">
                    <span className="interview-dropzone__file-name">{resumeFile.name}</span>
                    <span className="interview-dropzone__file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <button
                    type="button"
                    className="interview-dropzone__remove"
                    onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                    aria-label="Remove file"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="interview-dropzone__placeholder">
                  <div className="interview-dropzone__upload-icon">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <p className="interview-dropzone__text">
                    <span className="interview-dropzone__text--highlight">Click to upload</span> or drag and drop
                  </p>
                  <p className="interview-dropzone__hint">PDF only · Max 3MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Self Description */}
          <div className="interview-form__section">
            <label className="interview-form__label" htmlFor="self-description">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Tell us about yourself
            </label>
            <textarea
              id="self-description"
              className="interview-form__textarea"
              placeholder="Briefly describe your background, experience, strengths, and what you're looking for. E.g., 'I'm a full-stack developer with 2 years of experience in React and Node.js, passionate about building user-centric products...'"
              rows={4}
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />
            <div className="interview-form__char-count">{selfDescription.length} / 2000</div>
          </div>

          {/* Job Description */}
          <div className="interview-form__section">
            <label className="interview-form__label" htmlFor="job-description">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Job Description
            </label>
            <textarea
              id="job-description"
              className="interview-form__textarea interview-form__textarea--lg"
              placeholder="Paste the full job description here — including role title, responsibilities, required skills, and qualifications. The more detail you provide, the better your personalized report will be."
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <div className="interview-form__char-count">{jobDescription.length} / 5000</div>
          </div>

          {/* Error */}
          {error && (
            <div className="interview-form__error" id="interview-error">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="interview-form__submit"
            disabled={loading}
            id="interview-submit-btn"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            Generate Interview Report
          </button>
        </form>

        {/* Features row */}
        <div className="interview-features">
          <div className="interview-feature">
            <div className="interview-feature__icon interview-feature__icon--violet">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3>Smart Questions</h3>
            <p>AI-generated technical & behavioral questions tailored to your profile</p>
          </div>
          <div className="interview-feature">
            <div className="interview-feature__icon interview-feature__icon--fuchsia">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <h3>Skill Gap Analysis</h3>
            <p>Identify missing skills with severity indicators to prioritize learning</p>
          </div>
          <div className="interview-feature">
            <div className="interview-feature__icon interview-feature__icon--indigo">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3>Preparation Plan</h3>
            <p>Day-by-day study plan so you know exactly what to focus on</p>
          </div>
        </div>
      </div>
    </div>
  );
}
