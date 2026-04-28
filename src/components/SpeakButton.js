import React from 'react';
import useSpeech from '../hooks/useSpeech';
import './SpeakButton.css';

/**
 * SpeakButton
 *
 * Props:
 *  text      – the text to read aloud
 *  langCode  – VoteWise language code ('en', 'hi', etc.)
 *  className – optional extra class for positioning
 */
const SpeakButton = ({ text, langCode = 'en', className = '' }) => {
  const { toggle, isSpeaking, isSupported } = useSpeech(langCode);

  if (!isSupported) return null; // hide silently on unsupported browsers

  return (
    <button
      type="button"
      className={`speak-btn ${isSpeaking ? 'speak-btn--active' : ''} ${className}`}
      onClick={() => toggle(text)}
      aria-label={isSpeaking ? 'Stop reading aloud' : 'Read aloud'}
      title={isSpeaking ? 'Stop' : 'Listen'}
    >
      {isSpeaking ? (
        /* Stop icon */
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="5" y="5" width="14" height="14" rx="2" />
        </svg>
      ) : (
        /* Speaker icon */
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06C18.01 19.86 21 16.28 21 12c0-4.28-2.99-7.86-7-8.77z"/>
        </svg>
      )}
      <span className="speak-btn__label">{isSpeaking ? 'Stop' : 'Listen'}</span>
    </button>
  );
};

export default SpeakButton;
