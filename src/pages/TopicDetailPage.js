import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ELECTION_TOPICS } from '../services/firestore';
import { explainTopic } from '../services/gemini';
import { translateText } from '../services/translate';
import { useAppContext } from '../context/AppContext';
import './TopicDetailPage.css';

const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAppContext();
  
  const topic = ELECTION_TOPICS.find(t => t.id === id);
  
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [translatedState, setTranslatedState] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  // Fetch explanation when component mounts or topic changes
  useEffect(() => {
    const fetchExplanation = async () => {
      if (!topic || !profile) return;
      setLoading(true);
      const level = profile.knowledgeLevel || 'beginner';
      const text = await explainTopic(topic.title, level);
      setExplanation(text);
      setTranslatedState(text);
      
      if (profile.language && profile.language !== 'en') {
        setIsTranslating(true);
        const translated = await translateText(text, profile.language);
        setTranslatedState(translated);
        setIsTranslating(false);
      }
      
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
            {isTranslating ? (
              <p className="translating-text">Translating to your preferred language...</p>
            ) : (
              <p className="gemini-text">{translatedState}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="actions-section">
        <button 
          className="btn-primary" 
          onClick={() => navigate(`/quiz/${id}`)}
          disabled={loading || isTranslating}
        >
          Take Topic Quiz
        </button>
      </div>
    </div>
  );
};

export default TopicDetailPage;
