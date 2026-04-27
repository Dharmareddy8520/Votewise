import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { BookOpen, HelpCircle, MessageSquare, Home } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  const { profile, logout } = useAppContext();
  const navigate = require('react-router-dom').useNavigate();

  return (
    <div className="layout-wrapper">
      <nav className="sidebar" aria-label="Main Navigation">
        <div className="sidebar-header">
          <h2>VoteWise</h2>
          <p>Know Your Vote</p>
        </div>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
              <Home size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/learn" className={({isActive}) => isActive ? 'active' : ''}>
              <BookOpen size={20} /> Learn Topics
            </NavLink>
          </li>
          <li>
            <NavLink to="/chat" className={({isActive}) => isActive ? 'active' : ''}>
              <MessageSquare size={20} /> AI Chatbot
            </NavLink>
          </li>
          <li>
            <NavLink to="/glossary" className={({isActive}) => isActive ? 'active' : ''}>
              <HelpCircle size={20} /> Glossary
            </NavLink>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          {profile && (
            <>
              <p>Learning as <strong>{profile.name}</strong></p>
              <button 
                className="btn-secondary" 
                style={{ marginTop: '10px', fontSize: '0.8rem', padding: '4px 8px', minHeight: 'auto' }}
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
              >
                Reset User Data
              </button>
            </>
          )}
        </div>
      </nav>
      
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
