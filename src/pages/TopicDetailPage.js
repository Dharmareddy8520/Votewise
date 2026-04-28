import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ELECTION_TOPICS } from '../services/firestore';
import { explainTopic } from '../services/gemini';
import { useAppContext } from '../context/AppContext';
import './TopicDetailPage.css';

const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAppContext();
  
  const topic = ELECTION_TOPICS.find(t => t.id === id);
  
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch explanation when component mounts or topic changes
  useEffect(() => {
    const fetchExplanation = async () => {
      if (!topic || !profile) return;
      setLoading(true);
      const level = profile.knowledgeLevel || 'beginner';
      const language = profile.language || 'en';
      
      // AI explains directly in the user's preferred language natively.
      const text = await explainTopic(topic.title, level, language);
      setExplanation(text);
      
      setLoading(false);
    };
    fetchExplanation();
  }, [topic, profile]);

  if (!topic) return <div>Topic not found</div>;

  return (
    <div className="topic-detail-page">
      <button className="back-btn" onClick={() => navigate('/learn')}>&larr; Back to Topics</button>
      
      <div className="card content-card">
        <h1>{topic.title}</h1>
        
        {loading ? (
          <div className="loading-skeleton">
            <p>AI is generating a personalized explanation based on your {profile?.knowledgeLevel} level...</p>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line w-75"></div>
          </div>
        ) : (
          <div className="explanation-content">
              <p className="gemini-text">{explanation}</p>
          </div>
        )}
      </div>
      
      <div className="actions-section">
        <button 
          className="btn-primary" 
          onClick={() => navigate(`/quiz/${id}`)}
          disabled={loading}
        >
          Take Topic Quiz
        </button>
      </div>
    </div>
  );
};

export default TopicDetailPage;
