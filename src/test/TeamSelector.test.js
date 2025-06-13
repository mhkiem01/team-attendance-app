import { render, screen, fireEvent } from '@testing-library/react';
import TeamSelector from '../TeamSelector';

test('calls setNumTeams and onGenerate', () => {
  const setNumTeams = jest.fn();
  const onGenerate = jest.fn();

  render(<TeamSelector numTeams={2} setNumTeams={setNumTeams} onGenerate={onGenerate} />);

  fireEvent.change(screen.getByDisplayValue("2"), {
    target: { value: "3" }
  });

  expect(setNumTeams).toHaveBeenCalledWith(3);

  fireEvent.click(screen.getByText(/generate teams/i));
  expect(onGenerate).toHaveBeenCalled();
});
