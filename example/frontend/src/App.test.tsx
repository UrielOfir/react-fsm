import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


jest.mock('./services/apiServices', () => ({
  elevatorCall: jest.fn(),
}));

jest.mock('./services/webSocketService', () => ({
  initializeWebSocket: jest.fn().mockImplementation((onMessage) => {
    onMessage({ floor: 5 });
    return { close: jest.fn() };
  }),
}));

test('renders without crashing', () => {
  render(<App />);
});
