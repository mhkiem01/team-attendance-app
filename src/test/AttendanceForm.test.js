import { render, screen, fireEvent } from '@testing-library/react';
import AttendanceForm from '../AttendanceForm';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'Alice', gender: 'Female' })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('adds attendee on submit', async () => {
  const onAddMock = jest.fn();
  render(<AttendanceForm onAdd={onAddMock} />);

  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Alice' }
  });
  fireEvent.change(screen.getByDisplayValue('Male'), {
    target: { value: 'Female' }
  });

  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  // Wait for async actions
  await screen.findByDisplayValue('Female');

  expect(onAddMock).toHaveBeenCalledWith({ name: 'Alice', gender: 'Female' });
});
