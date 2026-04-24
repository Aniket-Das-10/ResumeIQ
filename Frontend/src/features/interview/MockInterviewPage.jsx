import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startMockSession, submitMockAnswer, completeMockSession, followUpMockChat } from '../services/mock.api';
import './MockInterview.css';

export default function MockInterviewPage() {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [summary, setSummary] = useState(null);
    const [finalScore, setFinalScore] = useState(0);
    const [waitingForNext, setWaitingForNext] = useState(false);
    
    const chatEndRef = useRef(null);

    useEffect(() => {
        const initSession = async () => {
            try {
                const data = await startMockSession(reportId);
                setSessionId(data.sessionId);
                
                // Combine technical and behavioral questions
                const allQs = [
                    ...data.questions.technical.map(q => ({ ...q, type: 'technical' })),
                    ...data.questions.behavioral.map(q => ({ ...q, type: 'behavioral' }))
                ];
                setQuestions(allQs);
                
                // Add first question to chat
                setMessages([{
                    role: 'ai',
                    text: `Hello! I'm your AI interviewer. Let's start. Here is your first question: \n\n ${allQs[0].question}`,
                    type: allQs[0].type
                }]);
            } catch (error) {
                console.error("Failed to start session", error);
                alert("Error starting interview session");
                navigate('/history');
            }
        };
        initSession();
    }, [reportId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!userInput.trim() || isLoading) return;

        const userMsg = userInput;
        setUserInput('');
        setIsLoading(true);

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

        try {
            if (waitingForNext) {
                // If we are waiting for next question, this is a follow-up chat
                const result = await followUpMockChat({
                    sessionId,
                    message: userMsg,
                    history: messages.map(m => ({ role: m.role, text: m.text }))
                });
                setMessages(prev => [...prev, { role: 'ai', text: result.reply }]);
            } else {
                // This is an answer to a question
                const currentQ = questions[currentIndex];
                const result = await submitMockAnswer({
                    sessionId,
                    question: currentQ.question,
                    answer: userMsg,
                    role: currentQ.type
                });

                // Add AI feedback to chat
                setMessages(prev => [...prev, { 
                    role: 'ai', 
                    text: "Thanks for your answer. Here is some feedback:", 
                    feedback: result.evaluation 
                }]);

                // Move to next question or finish
                if (currentIndex < questions.length - 1) {
                    setWaitingForNext(true);
                } else {
                    setMessages(prev => [...prev, { 
                        role: 'ai', 
                        text: "That was the last question! I'm generating your overall performance report now..." 
                    }]);
                    handleComplete();
                }
            }
        } catch (error) {
            console.error("Error in AI communication", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextQuestion = () => {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setWaitingForNext(false);
        setMessages(prev => [...prev, { 
            role: 'ai', 
            text: `Next question: \n\n ${questions[nextIdx].question}`,
            type: questions[nextIdx].type
        }]);
    };

    const handleComplete = async () => {
        try {
            const data = await completeMockSession(sessionId);
            setSummary(data.summary);
            setFinalScore(data.finalScore);
            setIsCompleted(true);
        } catch (error) {
            console.error("Error completing session", error);
        }
    };

    if (isCompleted) {
        return (
            <div className="mock-page">
                <div className="interview-bg"><div className="interview-bg__gradient" /></div>
                <div className="mock-container summary-screen">
                    <h1 className="mock-header__title">Interview Completed!</h1>
                    <div className="summary-score">{finalScore}%</div>
                    <p className="report-score__label">Overall Performance Score</p>
                    <div className="report-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
                        <h3 className="report-card__title">Performance Summary</h3>
                        <p className="report-card__text" style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
                    </div>
                    <button 
                        className="report-header__new-btn" 
                        style={{ marginTop: '2rem', padding: '1rem 2rem' }}
                        onClick={() => navigate('/history')}
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mock-page">
            <div className="interview-bg">
                <div className="interview-bg__gradient" />
                <div className="interview-bg__orb interview-bg__orb--1" />
                <div className="interview-bg__grid" />
            </div>

            <div className="mock-container">
                <header className="mock-header">
                    <div className="mock-header__title">Mock Interview Session</div>
                    <div className="mock-progress">
                        <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                        <div className="mock-progress__bar">
                            <div 
                                className="mock-progress__fill" 
                                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </header>

                <div className="mock-chat">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-bubble chat-bubble--${msg.role}`}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                            {msg.feedback && (
                                <div className="feedback-card">
                                    <div className="feedback-card__score">Score: {msg.feedback.score}/10</div>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{msg.feedback.feedback}</p>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                        <strong>Tips:</strong> {msg.feedback.suggestions?.join(', ') || 'No specific tips at this moment.'}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-bubble chat-bubble--ai" style={{ opacity: 0.6 }}>
                            AI is thinking...
                        </div>
                    )}
                    {waitingForNext && (
                        <button 
                            className="report-header__new-btn" 
                            style={{ alignSelf: 'center', margin: '1rem 0', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white' }}
                            onClick={handleNextQuestion}
                        >
                            Continue to Next Question →
                        </button>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="mock-input-area">
                    <input 
                        type="text" 
                        className="mock-input" 
                        placeholder="Type your answer here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <button 
                        className="mock-send-btn" 
                        onClick={handleSend}
                        disabled={isLoading || !userInput.trim()}
                    >
                        {isLoading ? '...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}
