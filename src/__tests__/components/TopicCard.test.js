import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopicCard from '../../components/TopicCard';

const mockTopic = { id: 't1', title: 'How to Register', summary: 'Summary' };

describe('TopicCard Component', () => {
  it('renders title and progress bar', () => {
    render(
      <MemoryRouter>
        <TopicCard topic={mockTopic} progress={50} />
      </MemoryRouter>
    );
    expect(screen.getByText('How to Register')).toBeInDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('completed state shows checkmark', () => {
    render(
      <MemoryRouter>
        <TopicCard topic={mockTopic} progress={100} />
      </MemoryRouter>
    );
    expect(screen.getByText('✅')).toBeInDocument();
  });

  it('progress percentage displays correctly', () => {
    render(
      <MemoryRouter>
        <TopicCard topic={mockTopic} progress={75} />
      </MemoryRouter>
    );
    expect(screen.getByText('75% Completed')).toBeInDocument();
  });
});
