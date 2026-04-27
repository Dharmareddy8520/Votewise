import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GlossaryPage from '../../pages/GlossaryPage';

// Mock the Gemini service
jest.mock('../../services/gemini', () => ({
  elaborateGlossaryTerm: jest.fn().mockResolvedValue('Mocked Definition')
}));

// Mock AppContext
jest.mock('../../context/AppContext', () => ({
  useAppContext: () => ({ profile: { language: 'en' } })
}));

describe('GlossaryPage Component', () => {
  it('search filters terms correctly', () => {
    render(<GlossaryPage />);
    const searchInput = screen.getByPlaceholderText('Search terms...');
    
    // all terms show initially (we pick one to test)
    expect(screen.getByText('EVM (Electronic Voting Machine)')).toBeInDocument();
    
    fireEvent.change(searchInput, { target: { value: 'NOTA' } });
    
    expect(screen.getByText('NOTA')).toBeInDocument();
    expect(screen.queryByText('EVM (Electronic Voting Machine)')).not.toBeInDocument();
  });

  it('empty search shows all terms', () => {
    render(<GlossaryPage />);
    // There are 20 terms basically, just check a couple
    expect(screen.getByText('NOTA')).toBeInDocument();
    expect(screen.getByText('Form 6')).toBeInDocument();
  });
});
