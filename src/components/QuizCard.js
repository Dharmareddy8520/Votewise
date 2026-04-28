import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import './QuizCard.css';

const QuizCard = memo(({ questionData, onAnswered }) => {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fallback check to prevent rendering crashes
  if (!questionData || !questionData.options) {
    return <div className="card quiz-card">Loading question...</div>;
  }

  // The correct field is an exact character (A, B, C, D) but options have text like 'A) Option'.
  // We extract the prefix logic nicely.
  
  const handleSelect = (opt) => {
    if (!isSubmitted) setSelectedOpt(opt);
  };

  const checkAnswer = () => {
    if (!selectedOpt) return;
    setIsSubmitted(true);
    const isCorrect = selectedOpt.startsWith(questionData.correct);
    onAnswered(isCorrect);
  };

  return (
    <div className="card quiz-card">
      <h3 className="quiz-question">{questionData.question}</h3>
      <div className="options-container" role="radiogroup">
        {questionData.options.map((opt, idx) => {
          const isCorrectChoice = opt.startsWith(questionData.correct);
          let extraClass = '';
          
          if (isSubmitted) {
            if (isCorrectChoice) extraClass = 'correct';
            else if (selectedOpt === opt && !isCorrectChoice) extraClass = 'wrong';
          } else if (selectedOpt === opt) {
            extraClass = 'selected';
          }

          return (
            <button 
              key={idx} 
              className={`option-btn ${extraClass}`}
              onClick={() => handleSelect(opt)}
              aria-pressed={selectedOpt === opt}
              disabled={isSubmitted}
              role="radio"
              aria-checked={selectedOpt === opt}
            >
              {opt}
            </button>
          );
        })}
      </div>
      
      {!isSubmitted && (
        <button 
          className="btn-primary submit-btn" 
          onClick={checkAnswer} 
          disabled={!selectedOpt}
        >
          Check Answer
        </button>
      )}

      {isSubmitted && (
        <div 
          className={`feedback ${selectedOpt.startsWith(questionData.correct) ? 'feedback-success' : 'feedback-error'}`}
          aria-live="polite"
        >
          <p><strong>Explanation:</strong> {questionData.explanation}</p>
        </div>
      )}
    </div>
  );
});

QuizCard.propTypes = {
  questionData: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
  }).isRequired,
  onAnswered: PropTypes.func.isRequired,
};

export default QuizCard;
