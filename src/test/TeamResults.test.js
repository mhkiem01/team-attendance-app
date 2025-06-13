import { render, screen } from '@testing-library/react';
import TeamResults from '../TeamResults';

test('renders team members correctly', () => {
  const teams = [
    [{ name: 'Alice', gender: 'Female' }, { name: 'Bob', gender: 'Male' }],
    [{ name: 'Charlie', gender: 'Male' }]
  ];

  render(<TeamResults teams={teams} />);

  expect(screen.getByText(/Team 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Alice \(Female\)/i)).toBeInTheDocument();
  expect(screen.getByText(/Charlie \(Male\)/i)).toBeInTheDocument();
});
