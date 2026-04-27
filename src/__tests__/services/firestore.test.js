import { getUserProfile, saveUserProfile, markTopicComplete } from '../../services/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn()
}));

jest.mock('../../services/firebase', () => ({
  db: {}
}));

describe('Firestore Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('saveUserProfile saves correct fields', async () => {
    await saveUserProfile('testUid', { name: 'Test', language: 'en' });
    expect(setDoc).toHaveBeenCalled();
    const callArgs = setDoc.mock.calls[0][1];
    expect(callArgs.name).toBe('Test');
    expect(callArgs.language).toBe('en');
    expect(callArgs.topicsCompleted).toEqual([]);
  });

  it('getUser returns null for unknown uid', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });
    const user = await getUserProfile('unknown');
    expect(user).toBeNull();
  });

  it('updateQuizScore updates correctly (markTopicComplete)', async () => {
    getDoc.mockResolvedValueOnce({ 
      exists: () => true, 
      data: () => ({ topicsCompleted: [], quizScores: {} }) 
    });
    
    await markTopicComplete('testUid', 't1', 4);
    expect(updateDoc).toHaveBeenCalled();
    const updateArgs = updateDoc.mock.calls[0][1];
    expect(updateArgs.topicsCompleted).toContain('t1');
    expect(updateArgs.quizScores['t1']).toBe(4);
  });
});
