# VoteWise — Know Your Vote

Vertical: Election Process Education
Approach: Anonymous-first, AI-personalized civic education for Indian voters in their regional language

## How it works:
- Open app → anonymous session → onboarding (name/language/level)
- Dashboard → Browse topics → Gemini explains at your level
- Take AI-generated quiz → Track progress → Ask chatbot
- Learn glossary terms → Complete all 8 topics → **Earn an Informed Citizen Certificate**

## Google Services used:
| Service | Purpose |
|---------|---------|
| Firebase Anonymous Auth | Zero-friction session |
| Cloud Firestore | Progress & score tracking |
| Gemini API | Explanations, quizzes, chatbot |
| Google Translate API | Multilingual support |
| Firebase Hosting | Live deployment |

## Assumptions & Security
- Content based on ECI official guidelines.
- Completely non-partisan — no party opinions.
- Anonymous sessions persist on the same device/browser.
- Translate API falls back to English if quota exceeded.
- Gemini quiz is regenerated fresh each attempt.
- No direct injection of innerHTML for API responses.

## Setup Instructions

### Traditional Method
1. Run `npm install`
2. Create `.env` from `.env.example` and populate keys
3. Run `npm start`

### Docker Method (Recommended)
1. Ensure Docker is installed.
2. Populate your `.env` file.
3. Run `docker-compose up -d --build`
4. App will be available at `http://localhost:3000`
