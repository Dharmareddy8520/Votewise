export const translateText = async (text, targetLanguage) => {
  if (!text || targetLanguage === 'en') return text;
  
  try {
    const key = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${key}`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage
      })
    });
    
    const data = await res.json();
    return data?.data?.translations[0]?.translatedText || text;
  } catch (error) {
    console.error("Translate API error:", error);
    return text; // Fallback to English on error as per specs
  }
};
