import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and form', () => {
  render(<App />);

  expect(screen.getByText(/team attendance app/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();

  const comboBoxes = screen.getAllByRole('combobox');
  expect(comboBoxes.length).toBeGreaterThanOrEqual(2); // sanity check
});
