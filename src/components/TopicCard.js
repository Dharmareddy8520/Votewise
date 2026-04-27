import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopicCard.css';

const TopicCard = ({ topic, progress = 0 }) => {
  const navigate = useNavigate();
  const isCompleted = progress === 100;

  return (
    <div className={`card topic-card ${isCompleted ? 'completed' : ''}`} onClick={() => navigate(`/topic/${topic.id}`)}>
      <div className="topic-header">
        <h3>{topic.title}</h3>
        {isCompleted && <span className="badge badge-success" aria-label="Completed">✅</span>}
      </div>
      <p className="topic-summary">{topic.summary}</p>
      
      <div className="progress-section">
        <div className="progress-bar-container" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}% Completed</span>
      </div>
    </div>
  );
};

export default TopicCard;
