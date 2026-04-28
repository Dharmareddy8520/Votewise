import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Maps VoteWise language codes to BCP-47 locale tags understood by SpeechSynthesis.
 */
const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
};

/**
 * useSpeech – wraps the browser Web Speech API (SpeechSynthesis).
 *
 * @param {string} langCode  VoteWise language code, e.g. 'hi', 'en'
 * @returns {{ speak, stop, toggle, isSpeaking, isSupported }}
 */
const useSpeech = (langCode = 'en') => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text) => {
      if (!isSupported || !text) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const locale = LANG_MAP[langCode] || 'en-IN';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      utterance.rate = 0.95;
      utterance.pitch = 1;

      // Pick the best available voice for the locale
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang === locale) ||
        voices.find((v) => v.lang.startsWith(locale.split('-')[0])) ||
        null;
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, langCode]
  );

  const toggle = useCallback(
    (text) => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, speak, stop]
  );

  return { speak, stop, toggle, isSpeaking, isSupported };
};

export default useSpeech;
