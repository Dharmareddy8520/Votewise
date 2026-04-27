import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './LandingPage.css';

const LandingPage = () => {
  const { profile, loading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile?.onboardingComplete) {
      navigate('/dashboard');
    }
  }, [profile, loading, navigate]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="hero-title">VoteWise</h1>
        <p className="hero-tagline">"Empowering every Indian voter with knowledge"</p>
        
        <div className="landing-card">
          <h2>Know Your Vote</h2>
          <p>
            Learn about EVMs, VVPAT, Constituencies, the role of ECI, 
            and your rights as a voter before you cast your ballot.
          </p>
          <button 
            className="btn-primary start-btn" 
            onClick={() => navigate('/onboarding')}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start Learning'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
