import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ELECTION_TOPICS } from '../services/firestore';
import './DashboardPage.css';

const DashboardPage = () => {
  const { profile } = useAppContext();
  const navigate = useNavigate();

  if (!profile) return <div>Loading...</div>;

  const completedCount = profile.topicsCompleted?.length || 0;
  const totalTopics = ELECTION_TOPICS.length;
  
  // Calculate average score
  const scores = Object.values(profile.quizScores || {});
  const avgScore = scores.length ? 
    (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;

  const lastIncompleteTopic = ELECTION_TOPICS.find(t => !profile.topicsCompleted?.includes(t.id));

  return (
    <div className="dashboard-page">
      <div className="welcome-banner">
        <h1>Hello, {profile.name}!</h1>
        <p>Ready to continue your civic journey?</p>
      </div>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Progress</h3>
          <div className="stat-value">{completedCount} / {totalTopics}</div>
          <p>Topics Completed</p>
        </div>
        <div className="card stat-card">
          <h3>Knowledge Score</h3>
          <div className="stat-value">{avgScore}</div>
          <p>Avg Quizzes (out of 5)</p>
        </div>
        <div className="card stat-card">
          <h3>Streak</h3>
          <div className="stat-value">{profile.streak || 1} 🔥</div>
          <p>Day{profile.streak > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        {lastIncompleteTopic ? (
          <div className="card action-card">
            <h2>Continue Learning</h2>
            <p>Your next topic is: <strong>{lastIncompleteTopic.title}</strong></p>
            <button className="btn-primary mt-2" onClick={() => navigate(`/topic/${lastIncompleteTopic.id}`)}>
              Go to Topic
            </button>
          </div>
        ) : (
          <div className="card action-card success-banner">
            <h2>🎉 Congratulations!</h2>
            <p>You have completed all topics. You are an informed citizen ready for Election Day.</p>
            <button className="btn-primary mt-3" onClick={() => navigate('/certificate')}>
              View My Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
