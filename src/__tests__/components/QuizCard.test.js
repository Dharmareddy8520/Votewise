import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizCard from '../../components/QuizCard';

const mockQuestion = {
  question: "What is EVM?",
  options: ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
  correct: "A",
  explanation: "Because A is right."
};

describe('QuizCard Component', () => {
  it('renders question and 4 options', () => {
    render(<QuizCard questionData={mockQuestion} onAnswered={jest.fn()} />);
    expect(screen.getByText('What is EVM?')).toBeInDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });

  it('correct answer shows green feedback', () => {
    const mockOnAnswered = jest.fn();
    render(<QuizCard questionData={mockQuestion} onAnswered={mockOnAnswered} />);
    
    // Select Option A
    fireEvent.click(screen.getByText('A) Option A'));
    expect(screen.getByText('A) Option A')).toHaveAttribute('aria-pressed', 'true');
    
    // Submit
    fireEvent.click(screen.getByText('Check Answer'));
    
    expect(mockOnAnswered).toHaveBeenCalledWith(true);
    expect(screen.getByText(/Because A is right/i)).toBeInDocument();
    expect(screen.getByText('A) Option A')).toHaveClass('correct');
  });

  it('wrong answer shows red + explanation', () => {
    const mockOnAnswered = jest.fn();
    render(<QuizCard questionData={mockQuestion} onAnswered={mockOnAnswered} />);
    
    fireEvent.click(screen.getByText('B) Option B'));
    fireEvent.click(screen.getByText('Check Answer'));
    
    expect(mockOnAnswered).toHaveBeenCalledWith(false);
    expect(screen.getByText(/Because A is right/i)).toBeInDocument();
    expect(screen.getByText('B) Option B')).toHaveClass('wrong');
  });
});
