import { generateQuiz, explainTopic, elaborateGlossaryTerm, getChatResponse } from '../../services/gemini';

jest.mock('@google/genai', () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockImplementation(async (args) => {
        if (args && args.contents && args.contents.includes("Generate exactly 5 multiple choice questions")) {
          return {
            text: JSON.stringify([{ question: "Q1", options: ["A", "B", "C", "D"], correct: "A", explanation: "Exp" }])
          };
        }
        return { text: "Mocked Gemini Response" };
      })
    }
  }))
}));

describe('Gemini Service', () => {
  it('quiz generation returns valid JSON array', async () => {
    const quiz = await generateQuiz('EVM');
    expect(Array.isArray(quiz)).toBe(true);
    expect(quiz[0].question).toBe("Q1");
  });

  it('explanation returns non-empty string', async () => {
    const text = await explainTopic('EVM', 'beginner');
    expect(text).toBe("Mocked Gemini Response");
    expect(typeof text).toBe('string');
  });

  it('chatbot handles multi-turn history', async () => {
    const history = [{ role: 'user', text: 'Hi' }];
    const text = await getChatResponse(history, 'What is NOTA', 'beginner', 'en');
    expect(text).toBe("Mocked Gemini Response");
  });

  it('glossary returns text', async () => {
    const text = await elaborateGlossaryTerm('NOTA');
    expect(text).toBe("Mocked Gemini Response");
  });
});
