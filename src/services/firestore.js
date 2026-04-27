import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const ELECTION_TOPICS = [
  { id: 't1', title: 'How to Register to Vote', summary: 'Form 6, NVSP portal' },
  { id: 't2', title: 'What is EVM & VVPAT', summary: 'How it works, is it safe?' },
  { id: 't3', title: 'Understanding Constituencies', summary: 'Lok Sabha vs Vidhan Sabha' },
  { id: 't4', title: 'Election Commission of India', summary: 'Role, powers, MCC' },
  { id: 't5', title: 'How Voting Works', summary: 'Step by step on election day' },
  { id: 't6', title: 'Candidate & Party Research', summary: 'How to find info' },
  { id: 't7', title: 'NOTA — None of the Above', summary: 'What it means, how to use it' },
  { id: 't8', title: 'Election Results & Counting', summary: 'Process and declaration' }
];

export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const saveUserProfile = async (uid, data) => {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, {
    ...data,
    topicsCompleted: data.topicsCompleted || [],
    quizScores: data.quizScores || {},
    streak: data.streak || 0,
    lastActive: new Date().toISOString(),
    createdAt: data.createdAt || new Date().toISOString()
  }, { merge: true });
};

export const markTopicComplete = async (uid, topicId, score) => {
  const profile = await getUserProfile(uid);
  if (!profile) return;
  
  const completed = new Set(profile.topicsCompleted || []);
  completed.add(topicId);
  
  const scores = profile.quizScores || {};
  scores[topicId] = Math.max(scores[topicId] || 0, score);
  
  await updateDoc(doc(db, 'users', uid), {
    topicsCompleted: Array.from(completed),
    quizScores: scores,
    lastActive: new Date().toISOString()
  });
};
