# VoteWise — Know Your Vote

> **An AI-Powered, Anonymous-First Civic Education Platform for Indian Voters**

VoteWise is a comprehensive election process education application designed to empower Indian voters with personalized, AI-generated explanations and interactive learning experiences. Built with React and powered by Google's Gemini API and Firebase, VoteWise provides a non-partisan, language-inclusive platform for civic engagement.

**Vertical:** Election Process Education  
**Approach:** Anonymous-first, AI-personalized civic education in regional languages  
**Target Users:** Indian voters of all educational backgrounds  
**Key Achievement:** Users who complete all 8 topics earn an **Informed Citizen Certificate**

---

## 🎯 Table of Contents

- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Components Overview](#-components-overview)
- [Services & APIs](#-services--apis)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [User Flow](#-user-flow)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Development Guidelines](#-development-guidelines)
- [Troubleshooting](#-troubleshooting)
- [Security & Assumptions](#-security--assumptions)

---

## ✨ Features

### Core Features
- **🔐 Anonymous Sessions**: Zero-friction login with Firebase Anonymous Authentication
- **🧠 AI-Powered Explanations**: Gemini API generates personalized explanations at 3 difficulty levels (beginner, intermediate, advanced)
- **📝 Dynamic Quizzes**: AI-generated multiple-choice quizzes that regenerate fresh on each attempt
- **💬 Interactive Chatbot**: Real-time AI chatbot for voter questions
- **🌍 Multilingual Support**: Google Translate API integration for regional language support (with fallback to English)
- **📊 Progress Tracking**: Real-time dashboard showing completed topics, quiz scores, and learning streaks
- **📚 Glossary**: Election terminology with AI-powered explanations in user's preferred language
- **🎓 Certificate Generation**: Interactive certificate for users who complete all 8 election topics

### Topics Covered
1. How to Register to Vote
2. What is EVM & VVPAT
3. Understanding Constituencies
4. Election Commission of India
5. How Voting Works
6. Candidate & Party Research
7. NOTA — None of the Above
8. Election Results & Counting

---

## 🏗️ Architecture & Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18.2** | UI framework and component management |
| **React Router v6** | Client-side routing and navigation |
| **React Scripts** | Build tooling and development server |
| **Lucide React** | Icon library for UI components |

### Backend & Services
| Technology | Purpose |
|-----------|---------|
| **Firebase Auth** | Anonymous authentication |
| **Cloud Firestore** | User profiles, progress, and quiz scores |
| **Gemini 2.5 Flash API** | AI explanations, quizzes, and chatbot |
| **Google Translate API** | Multilingual content support |
| **Firebase Hosting** | Live deployment (optional) |

### Development & Testing
| Technology | Purpose |
|-----------|---------|
| **Jest** | Test runner and assertion library |
| **React Testing Library** | Component testing utilities |
| **ESLint** | Code quality and style enforcement |

### DevOps
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization for consistent environments |
| **Docker Compose** | Multi-container orchestration |
| **Nginx** | Production web server |
| **Node.js 18** | Runtime environment |

---

## 📁 Project Structure

```
votewise/
├── public/                           # Static assets
│   └── index.html                   # HTML entry point
│
├── src/
│   ├── index.js                     # React app entry point
│   ├── App.js                       # Main routing configuration
│   ├── App.css                      # Global application styles
│   ├── setupTests.js                # Test configuration
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── Layout.js               # Main layout wrapper (header/footer/nav)
│   │   ├── Layout.css
│   │   ├── QuizCard.js             # Quiz question card component
│   │   ├── QuizCard.css
│   │   ├── TopicCard.js            # Topic display card component
│   │   └── TopicCard.css
│   │
│   ├── context/                     # React context for state management
│   │   └── AppContext.js           # Global app state (user, profile, auth)
│   │
│   ├── pages/                       # Page components (one per route)
│   │   ├── LandingPage.js          # Welcome page with app intro
│   │   ├── LandingPage.css
│   │   ├── OnboardingPage.js       # User registration & preferences
│   │   ├── OnboardingPage.css
│   │   ├── DashboardPage.js        # Main dashboard with topic overview
│   │   ├── DashboardPage.css
│   │   ├── LearnPage.js            # Topic browsing and selection
│   │   ├── LearnPage.css
│   │   ├── TopicDetailPage.js      # Individual topic explanation
│   │   ├── TopicDetailPage.css
│   │   ├── QuizPage.js             # Quiz taking interface
│   │   ├── QuizPage.css
│   │   ├── ChatPage.js             # Chatbot interface
│   │   ├── ChatPage.css
│   │   ├── GlossaryPage.js         # Election terminology reference
│   │   ├── GlossaryPage.css
│   │   ├── CertificatePage.js      # Certificate display/download
│   │   └── CertificatePage.css
│   │
│   ├── services/                    # External service integrations
│   │   ├── firebase.js             # Firebase initialization & authentication
│   │   ├── firestore.js            # Firestore operations & data models
│   │   ├── gemini.js               # Gemini API integration
│   │   └── translate.js            # Google Translate API integration
│   │
│   └── __tests__/                   # Unit and integration tests
│       ├── components/
│       │   ├── QuizCard.test.js
│       │   └── TopicCard.test.js
│       ├── pages/
│       │   └── glossary.test.js
│       └── services/
│           ├── firestore.test.js
│           └── gemini.test.js
│
├── Dockerfile                        # Multi-stage production build
├── docker-compose.yml               # Docker container orchestration
├── package.json                     # Project dependencies and scripts
├── firebase.json                    # Firebase deployment config
├── firestore.rules                  # Firestore security rules
├── test-gemini.js                   # Gemini API testing utility
└── README.md                        # This file
```

---

## 🧩 Components Overview

### Layout Component
**File:** [src/components/Layout.js](src/components/Layout.js)

The main layout wrapper that provides consistent navigation and header across all authenticated pages.

**Features:**
- Header with navigation links
- Sidebar navigation for main sections
- Responsive design
- User profile display

**Props:** None (consumes AppContext)

---

### QuizCard Component
**File:** [src/components/QuizCard.js](src/components/QuizCard.js)

Displays individual quiz questions with multiple-choice options.

**Key Props:**
- `question` (object) - Question data with options and correct answer
- `onAnswerSubmit` (function) - Callback when user selects an answer
- `disabled` (boolean) - Whether quiz is disabled

**Features:**
- Multiple choice options display
- Answer validation
- Explanation display after selection
- Score calculation

---

### TopicCard Component
**File:** [src/components/TopicCard.js](src/components/TopicCard.js)

Card component for displaying election topics with progress indication.

**Key Props:**
- `topic` (object) - Topic ID, title, and summary
- `isCompleted` (boolean) - Whether topic is completed
- `score` (number) - Quiz score if completed
- `onClick` (function) - Navigation callback

**Features:**
- Visual progress indicator
- Topic summary display
- Completion status badge
- Score display if available

---

## 📄 Pages Explained

| Page | Route | Purpose |
|------|-------|---------|
| **Landing Page** | `/` | Welcome screen, app overview, start button |
| **Onboarding** | `/onboarding` | User profile setup (name, language, level) |
| **Dashboard** | `/dashboard` | Main hub with topic list and progress stats |
| **Learn** | `/learn` | Browse and select topics to learn |
| **Topic Detail** | `/topic/:id` | AI-generated explanation for selected topic |
| **Quiz** | `/quiz/:id` | Interactive AI-generated quiz for topic |
| **Chat** | `/chat` | Real-time chatbot for user questions |
| **Glossary** | `/glossary` | Election terminology reference |
| **Certificate** | `/certificate` | Achievement display after completing all 8 topics |

---

## 🔌 Services & APIs

### Firebase Service
**File:** [src/services/firebase.js](src/services/firebase.js)

Handles Firebase initialization and anonymous authentication.

**Key Functions:**
- `initSession()` - Creates/retrieves anonymous Firebase session
- Exports: `auth`, `db` - Firebase instances for use across the app

**Environment Variables Required:**
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

---

### Firestore Service
**File:** [src/services/firestore.js](src/services/firestore.js)

Manages user profiles, progress tracking, and quiz scores in Firestore.

**Key Functions:**

```javascript
// Get user profile
getUserProfile(uid)                    // Returns: { name, language, level, ... }

// Save/update user profile
saveUserProfile(uid, data)             // Stores user preferences and metadata

// Mark topic as complete
markTopicComplete(uid, topicId, score) // Updates completion status and score
```

**Data Model:**
```javascript
{
  name: string,
  language: string,            // 'en', 'hi', 'ta', etc.
  level: string,               // 'beginner', 'intermediate', 'advanced'
  topicsCompleted: string[],  // Array of topic IDs
  quizScores: {               // Maps topic ID to best score
    't1': 85,
    't2': 92
  },
  streak: number,              // Consecutive days of activity
  lastActive: ISO8601,         // Last activity timestamp
  createdAt: ISO8601          // Profile creation timestamp
}
```

---

### Gemini Service
**File:** [src/services/gemini.js](src/services/gemini.js)

Integrates Google's Gemini API for AI-powered content generation.

**Key Functions:**

```javascript
// Generate topic explanation at user's level
explainTopic(topic, level)
// Returns: Plain text explanation with key takeaway

// Generate quiz questions
generateQuiz(topic)
// Returns: Array of 5 quiz question objects

// Elaborate on glossary terms
elaborateGlossaryTerm(term, language)
// Returns: 2-3 sentence explanation with real example

// Get chatbot response
getChatResponse(history, message, level, language)
// Returns: Chatbot response based on conversation history
```

**Features:**
- **Caching:** Responses cached in-memory to reduce API calls
- **Context-Aware:** All responses reference Indian elections (ECI, EVMs, Lok Sabha)
- **Difficulty Levels:** Explanations adapted for beginner/intermediate/advanced
- **Language Support:** Responses can be generated in multiple languages

**Prompts Used:**
- **Explanations:** Conversational format, <200 words, includes key takeaway
- **Quizzes:** Structured JSON format, 5 questions, Indian context focus
- **Glossary:** Simple 2-3 sentence format with real-world example
- **Chatbot:** Conversational, maintains history, voter-focused

---

### Translate Service
**File:** [src/services/translate.js](src/services/translate.js)

Provides multilingual support using Google Translate API.

**Environment Variable:**
- `REACT_APP_TRANSLATE_API_KEY`

**Features:**
- Fallback to English if API quota exceeded
- Caching of translations
- Support for major Indian languages (Hindi, Tamil, Telugu, etc.)

---

## 💾 AppContext
**File:** [src/context/AppContext.js](src/context/AppContext.js)

Global state management for the application.

**State Variables:**
```javascript
user              // Firebase auth user object
profile           // User profile from Firestore
loading           // Initial load state
```

**Functions:**
```javascript
refreshProfile()  // Refetch user profile from Firestore
logout()         // Sign out and create new anonymous session
```

**Usage:**
```javascript
import { useAppContext } from '../context/AppContext';

function MyComponent() {
  const { user, profile, loading, refreshProfile } = useAppContext();
  // Use context values
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js:** v18 or higher
- **npm:** v9 or higher (comes with Node.js)
- **Docker:** (Optional, for containerized deployment)
- **Google Cloud Project** with enabled APIs:
  - Firebase
  - Gemini API
  - Google Translate API
- **Firebase Project** configured in Google Cloud Console

### Traditional Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/Dharmareddy8520/Votewise.git
cd votewise
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

#### Step 4: Configure Environment Variables
Edit `.env` with your credentials (see [Environment Configuration](#-environment-configuration) section below)

#### Step 5: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

---

### Docker Setup (Recommended for Production)

#### Prerequisites
- Docker Desktop installed and running
- `.env` file configured with all required API keys

#### Step 1: Build and Run
```bash
docker-compose up -d --build
```

#### Step 2: Access Application
Open browser and navigate to `http://localhost:3000`

#### Step 3: View Logs
```bash
docker-compose logs -f votewise-app
```

#### Step 4: Stop Application
```bash
docker-compose down
```

#### Docker Commands Reference
```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# View logs
docker-compose logs -f

# Remove volumes (clean slate)
docker-compose down -v
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Gemini API
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Google Translate API
REACT_APP_TRANSLATE_API_KEY=your_translate_api_key

# (Optional) Server Configuration
PORT=3000
```

### How to Obtain Credentials

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Anonymous Authentication:
   - Authentication → Sign-in method → Anonymous → Enable
4. Create a Firestore database:
   - Firestore Database → Create database → Start in test mode
5. Get credentials:
   - Project Settings → General → Copy web app config

#### Gemini API
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API key"
3. Create new API key for the project
4. Enable Gemini API in Google Cloud Console

#### Google Translate API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Translation API
3. Create service account key
4. Copy API key

---

## 🏃 Running the Application

### Development Mode
```bash
npm start
```
- Starts React development server at `http://localhost:3000`
- Hot-reload enabled for code changes
- Detailed error messages in console

### Production Build
```bash
npm run build
```
- Creates optimized production bundle in `build/` directory
- Minified and optimized for performance
- Ready for deployment

### Run Tests
```bash
npm test
```
- Runs all tests in watch mode
- Uses Jest and React Testing Library
- Tests located in `src/__tests__/`

---

## 👥 User Flow

### 1. **First Visit**
- User opens app → Landing page with app overview
- Click "Start Learning" → Redirects to Onboarding
- Onboarding form: Name, Language preference, Learning level
- Profile saved to Firestore
- Redirected to Dashboard

### 2. **Main Learning Flow**
```
Dashboard → Select a Topic → View Explanation → Take Quiz
  ↓
Quiz Results → Mark Complete (if ≥60%) → Update Progress
  ↓
Dashboard shows updated stats
  ↓
Repeat for all 8 topics → Unlock Certificate
```

### 3. **Dashboard View**
- Topic cards showing completion status
- Quiz scores for completed topics
- Learning streak counter
- Progress percentage (0-100%)

### 4. **Learning Page**
- Browse all 8 topics
- Filter by completion status
- View topic summaries

### 5. **Topic Detail Page**
- AI-generated explanation at user's difficulty level
- Key takeaway highlighted
- "Take Quiz" button to proceed

### 6. **Quiz Page**
- AI-generated 5-question multiple choice
- Questions one at a time
- Immediate feedback on answers
- Final score display

### 7. **Glossary**
- Search/browse election terms
- AI-powered explanations in user's language
- Examples from Indian elections

### 8. **Chat**
- Real-time chatbot for questions
- Maintains conversation history
- Contextual responses based on learning level

### 9. **Certificate**
- Unlocked after completing all 8 topics
- Personalized with user's name
- Download as PDF/image

---

## 💾 Database Schema

### Firestore Collections

#### Collection: `users`
```javascript
users/{uid}/
{
  name: string,                      // User's display name
  language: 'en' | 'hi' | 'ta' | ..., // Preferred language
  level: 'beginner' | 'intermediate' | 'advanced',
  email: string (optional),          // Contact email if provided
  
  // Learning Progress
  topicsCompleted: string[],         // [t1, t3, t5, ...]
  quizScores: {                      // Best scores per topic
    t1: 85,
    t2: 92
  },
  
  // Metadata
  streak: number,                    // Days of consecutive activity
  totalScore: number,                // Sum of all quiz scores
  certificationDate: ISO8601,        // When certificate was unlocked
  lastActive: ISO8601,               // Last action timestamp
  createdAt: ISO8601                 // Account creation date
}
```

#### Security Rules
```
users/{uid} can be read/written only by authenticated user with matching UID
```

---

## 🧪 Testing

### Test Structure
Tests are organized by type in `src/__tests__/`:
- **Component Tests:** `components/` - UI component logic and rendering
- **Service Tests:** `services/` - API integration and data handling
- **Page Tests:** `pages/` - Page component functionality

### Running Tests

```bash
# Run all tests once
npm test

# Run specific test file
npm test -- QuizCard.test.js

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Test Examples

**Component Test** - [src/__tests__/components/QuizCard.test.js](src/__tests__/components/QuizCard.test.js)
- Tests quiz question rendering
- Tests answer submission
- Tests score calculation

**Service Test** - [src/__tests__/services/firestore.test.js](src/__tests__/services/firestore.test.js)
- Tests user profile CRUD
- Tests topic completion marking
- Tests score updates

**Service Test** - [src/__tests__/services/gemini.test.js](src/__tests__/services/gemini.test.js)
- Tests API response parsing
- Tests prompt generation
- Tests caching mechanism

### Test Technologies
- **Jest:** Test runner and assertions
- **React Testing Library:** Component testing utilities
- **@testing-library/user-event:** User interaction simulation

---

## 🌍 Deployment

### Firebase Hosting (Recommended)

#### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created and configured

#### Deploy Steps
```bash
# Login to Firebase
firebase login

# Initialize Firebase in project (if not done)
firebase init

# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy
```

Your app will be live at: `https://your-project-id.firebaseapp.com`

### Docker Deployment

#### Build Production Image
```bash
docker build -t votewise:latest .
```

#### Run on Server
```bash
docker run -d \
  --name votewise \
  -p 80:80 \
  -e REACT_APP_FIREBASE_API_KEY=... \
  -e REACT_APP_GEMINI_API_KEY=... \
  votewise:latest
```

#### Using Docker Compose
```bash
docker-compose up -d --build
```

---

## 📋 Development Guidelines

### Code Structure Conventions

#### Component Organization
```javascript
// Import dependencies
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

// Import styles last
import './ComponentName.css';

// Component export
export default function ComponentName() {
  const { user } = useAppContext();
  
  return (
    // JSX here
  );
}
```

#### Service Functions
- Export functions, not classes
- Use async/await for promises
- Include error handling with try-catch
- Add JSDoc comments for complex functions
- Cache API responses where appropriate

#### Page Components
- Handle loading states
- Handle error states
- Use Layout wrapper for authenticated pages
- Import and use AppContext for user data

### Naming Conventions
- **Components:** PascalCase (e.g., `TopicCard.js`)
- **Utilities/Services:** camelCase (e.g., `gemini.js`)
- **CSS Files:** Match component name (e.g., `TopicCard.css`)
- **Tests:** `ComponentName.test.js`

### Adding New Features

#### Adding a New Topic
1. Add to `ELECTION_TOPICS` in [src/services/firestore.js](src/services/firestore.js)
2. Assign unique ID (t1, t2, etc.)
3. Test gemini service generates appropriate content

#### Adding New Language Support
1. Ensure Google Translate API supports the language
2. Add language code to language selection dropdown
3. Test translations in Glossary page

#### Adding New Difficulty Levels
1. Update `level` options in onboarding component
2. Modify Gemini prompts in [src/services/gemini.js](src/services/gemini.js)
3. Test content generation for new level

### ESLint & Code Quality
```bash
# Check code quality
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Failed to initialize Firebase"
**Solution:**
- Verify all Firebase environment variables are set correctly
- Check Firebase project is active in Google Cloud Console
- Ensure Anonymous Auth is enabled in Firebase

#### Issue: "Gemini API returns empty response"
**Solution:**
- Check API key has Gemini API access enabled
- Verify API key quota hasn't been exceeded
- Check that prompts don't violate content policy

#### Issue: "Translations not working"
**Solution:**
- Verify Google Translate API key is valid
- Check if API quota has been exceeded
- App will fallback to English if quota exceeded

#### Issue: "Quiz questions not generating"
**Solution:**
- Fresh quiz attempt should generate new questions
- Cached responses may be used for same topic within session
- Clear browser cache and try again

#### Issue: "Profile not saving"
**Solution:**
- Verify Firestore security rules allow writes
- Check user is authenticated (in AppContext)
- Verify network connectivity
- Check browser console for detailed error

#### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use different port
PORT=3001 npm start

# Or kill process using port 3000
npx kill-port 3000
```

#### Issue: "Docker build fails"
**Solution:**
```bash
# Clear Docker cache and rebuild
docker-compose down -v
docker-compose up -d --build

# Check logs
docker-compose logs votewise-app
```

### Debug Mode

#### Browser Console
- Open DevTools (F12)
- Check Console for error messages
- Check Network tab for API failures

#### Check Firebase Connection
```javascript
// In browser console
firebase.auth().currentUser
firebase.firestore().collection('users').doc('test').get()
```

#### Test Gemini API
```bash
# Run test script
node test-gemini.js
```

---

## 🔒 Security & Assumptions

### Security Measures
- **Anonymous Authentication:** No personal data required for login
- **Firestore Rules:** Database restricted to authenticated users
- **Environment Variables:** API keys never committed to version control
- **Content Sanitization:** No direct HTML injection from API responses
- **XSS Prevention:** React's built-in XSS protection via JSX

### Assumptions & Limitations
- ✅ **Content Quality:** All content is based on ECI official guidelines
- ✅ **Non-Partisan:** No party opinions or political bias in generated content
- ✅ **Session Persistence:** Anonymous sessions persist on same device/browser
- ✅ **Offline Unavailable:** Requires internet connection (API-dependent)
- ✅ **API Quota:** Translate API falls back to English if quota exceeded
- ✅ **Quiz Randomization:** Fresh quiz regenerated each attempt (not cached)
- ✅ **Language Accuracy:** Translations depend on Google Translate accuracy

### Data Privacy
- No personally identifiable information required
- User profiles stored only for learning progress
- No data sharing with third parties
- Can clear local data by clearing browser cache

---

## 📚 Additional Resources

### Learning Materials
- [Election Commission of India](https://www.eci.gov.in) - Official source
- [NVSP Portal](https://www.nvsp.in) - Voter registration
- [Gemini API Docs](https://ai.google.dev) - AI model documentation

### Technologies
- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com)
- [Google Translate API](https://cloud.google.com/translate)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

Please ensure:
- Code follows existing style conventions
- Tests are included for new features
- README is updated if needed
- Commit messages are descriptive

---

## 📄 License

This project is part of the H2A (Help to Access) initiative focused on civic education and voter empowerment in India.

---

## 📞 Support & Contact

For issues, suggestions, or feedback:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed reproduction steps
- Include environment information (OS, browser, etc.)

---

## 🎉 Acknowledgments

- **Election Commission of India** for official election guidelines
- **Google** for Firebase, Gemini API, and Translate API
- **React Community** for excellent documentation and tools
- **Contributors** who help improve civic education in India

---

**Made with ❤️ for informed Indian voters**
