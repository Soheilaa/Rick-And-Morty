import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { GET_LOCATIONS } from './App';

const mocks = [
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: {
          results: [
            {
              id: '1',
              name: 'Earth (C-137)',
              type: 'Planet',
              dimension: 'Dimension C-137',
              residents: [
                { name: 'Rick Sanchez', status: 'Alive', species: 'Human', gender: 'Male', image: 'rick.png' },
              ],
            },
          ],
        },
      },
    },
  },
];

test('renders Rick and Morty Locations heading', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  await waitFor(() => expect(screen.getByText(/Rick and Morty Locations/i)).toBeInTheDocument());
});
