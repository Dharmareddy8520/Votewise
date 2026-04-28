import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Eagerly load critical pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';

// Lazy load the rest of the application
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const TopicDetailPage = lazy(() => import('./pages/TopicDetailPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    Loading...
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;
