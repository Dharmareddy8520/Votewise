import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
const model = 'gemini-2.5-flash';

const cache = new Map();
const getCacheKey = (type, ...args) => `${type}_${args.join('_')}`;

// Used prompt spec from instruction.md
export const explainTopic = async (topic, level) => {
  const cacheKey = getCacheKey('explain', topic, level);
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const prompt = `You are VoteWise, an election education assistant for India.
Explain ${topic} to a ${level} voter in simple, friendly language. Use Indian context (ECI, EVMs, Lok Sabha). Keep it under 200 words. No jargon. 
End with 1 key takeaway starting with '💡 Key Takeaway:'`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    cache.set(cacheKey, response.text);
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error getting explanation. Please try again.";
  }
};

export const generateQuiz = async (topic) => {
  const cacheKey = getCacheKey('quiz', topic);
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const prompt = `Generate exactly 5 multiple choice questions about ${topic} for Indian elections context.
Return ONLY a valid JSON array, no markdown, no extra text:
[{
  "question": "question text",
  "options": ["A) option", "B) option", "C) option", "D) option"],
  "correct": "A",
  "explanation": "why this is correct"
}]`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const text = response.text;
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(jsonStr);
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const elaborateGlossaryTerm = async (term, language = 'en') => {
  const cacheKey = getCacheKey('glossary', term, language);
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const prompt = `Explain the election term '${term}' in the context of Indian elections in 2-3 simple sentences. Give one real example. Please provide the response in ${language} language.`;
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    cache.set(cacheKey, response.text);
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Information temporarily unavailable.";
  }
};

// Chatbot history management is typically done in the UI component, fetching responses via AI.
export const getChatResponse = async (history, message, level, language) => {
  try {
    const systemInstruction = `You are VoteWise AI, helping Indian citizens understand elections. Be friendly, factual, non-partisan. Use ECI guidelines. If unsure, direct to eci.gov.in. User level: ${level}. Preferred language: ${language}. Keep answers under 150 words.`;
    
    // We combine the history up to this point + the new message + the system prompt conceptually.
    // For standard API, we format as full prompt string or chat session object.
    const messages = history.map(h => `${h.role === 'user' ? 'User' : 'VoteWise'}: ${h.text}`).join('\\n');
    const fullPrompt = `${systemInstruction}\\n\\nChat History:\\n${messages}\\nUser: ${message}\\nVoteWise:`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently unable to process your request. Please try again later.";
  }
};
