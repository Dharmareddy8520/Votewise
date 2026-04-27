import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../services/firestore';
import { useAppContext } from '../context/AppContext';
import './OnboardingPage.css';

const OnboardingPage = () => {
  const { user, refreshProfile, logout } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    language: 'en',
    knowledgeLevel: 'beginner'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // safety
    
    setIsSubmitting(true);
    try {
      await saveUserProfile(user.uid, {
        ...formData,
        onboardingComplete: true
      });
      
      await refreshProfile();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to save profile. Ensure Firestore Database is created and your security rules are published.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="card onboarding-card">
        <h2>Welcome to VoteWise</h2>
        <p>Let's personalize your learning experience.</p>
        
        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              className="input-field" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Dharma"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="language">Preferred Language</label>
            <select 
              id="language" 
              className="input-field"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
            >
              <option value="en">English</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="te">Telugu (తెలుగు)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="kn">Kannada (ಕನ್ನಡ)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="knowledge">Election Knowledge Level</label>
            <select 
              id="knowledge" 
              className="input-field"
              value={formData.knowledgeLevel}
              onChange={(e) => setFormData({...formData, knowledgeLevel: e.target.value})}
            >
              <option value="beginner">Beginner (I want to learn the basics)</option>
              <option value="intermediate">Intermediate (I know a bit)</option>
              <option value="advanced">Advanced (I know a lot)</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Start My Journey'}
          </button>
          
          <button 
            type="button"
            className="back-btn" 
            style={{ marginTop: '1rem', alignSelf: 'center', fontSize: '0.9rem' }}
            onClick={async () => {
              await logout();
              navigate('/');
            }}
          >
            Start Over / Clear Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
