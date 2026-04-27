import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import TopicDetailPage from './pages/TopicDetailPage';
import QuizPage from './pages/QuizPage';
import ChatPage from './pages/ChatPage';
import GlossaryPage from './pages/GlossaryPage';
import CertificatePage from './pages/CertificatePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/topic/:id" element={<TopicDetailPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
