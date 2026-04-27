import React from 'react';
import TopicCard from '../components/TopicCard';
import { ELECTION_TOPICS } from '../services/firestore';
import { useAppContext } from '../context/AppContext';

const LearnPage = () => {
  const { profile } = useAppContext();

  return (
    <div>
      <h1 className="mb-2">Election Topics</h1>
      <p className="mb-4">Master the Indian election process by exploring these 8 core topics.</p>
      
      <div className="topics-grid">
        {ELECTION_TOPICS.map(topic => {
          const isCompleted = profile?.topicsCompleted?.includes(topic.id);
          const highestScore = profile?.quizScores?.[topic.id] || 0;
          // Progress roughly estimated: completed = 100%, else base it on quiz attempted
          const progress = isCompleted ? 100 : (highestScore > 0 ? (highestScore / 5) * 100 : 0);
          
          return (
            <TopicCard key={topic.id} topic={topic} progress={progress} />
          );
        })}
      </div>
    </div>
  );
};

export default LearnPage;
