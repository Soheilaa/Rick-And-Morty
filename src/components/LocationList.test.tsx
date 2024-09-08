import { render, screen } from '@testing-library/react';
import LocationList from './LocationList';

test('renders location cards correctly', () => {
  const locations = [
    {
      id: '1',
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: [
        { name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', image: 'rick.png' },
      ],
    },
  ];

  render(<LocationList locations={locations} />);

  expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
  expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
});
