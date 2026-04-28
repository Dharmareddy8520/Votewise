import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ELECTION_TOPICS, markTopicComplete } from '../services/firestore';
import { generateQuiz } from '../services/gemini';
import { useAppContext } from '../context/AppContext';
import QuizCard from '../components/QuizCard';
import './QuizPage.css';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAppContext();
  
  const topic = ELECTION_TOPICS.find(t => t.id === id);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!topic) return;
      setLoading(true);
      const language = profile?.language || 'en';
      const generated = await generateQuiz(topic.title, language);
      setQuestions(generated);
      setLoading(false);
    };
    fetchQuiz();
  }, [topic, profile]);

  const handleAnswer = (idx, isCorrect) => {
    setAnswers(prev => ({ ...prev, [idx]: isCorrect }));
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach(correct => {
      if (correct) score++;
    });
    return score;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    await markTopicComplete(user.uid, topic.id, score);
    await refreshProfile();
    setShowResults(true);
  };

  if (!topic) return <div>Topic not found</div>;

  return (
    <div className="quiz-page">
      <button className="back-btn" onClick={() => navigate(`/topic/${id}`)}>&larr; Back to Explanation</button>
      
      <h2>{topic.title} Challenge</h2>
      
      {loading ? (
        <div className="card loading-card">
          <p>Generating a unique AI quiz to test your knowledge...</p>
        </div>
      ) : showResults ? (
        <div className="card result-card">
          <h2>Quiz Complete!</h2>
          <p className="score-display">You scored {calculateScore()} out of {questions.length}</p>
          {calculateScore() >= 3 ? (
             <p className="text-success">Great job! You've successfully passed this topic.</p>
          ) : (
             <p className="text-error">You might want to review the topic and try again.</p>
          )}
          <button className="btn-primary mt-4" onClick={() => navigate('/learn')}>Return to Topics</button>
        </div>
      ) : questions.length === 0 ? (
        <div className="card loading-card" style={{ color: '#d32f2f' }}>
          <h3>⚠️ Generation Failed</h3>
          <p>Failed to generate quiz. The AI token limit might be exceeded (Error 429) or there is a network issue. Please check your developer console or try again later.</p>
          <button className="btn-secondary mt-4" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <div className="quiz-list">
          {questions.map((q, i) => (
            <QuizCard 
              key={i} 
              questionData={q} 
              onAnswered={(isCorrect) => handleAnswer(i, isCorrect)} 
            />
          ))}
          
          <button 
            className="btn-primary finish-btn" 
            onClick={finishQuiz}
            disabled={Object.keys(answers).length < questions.length}
          >
            Submit All Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
