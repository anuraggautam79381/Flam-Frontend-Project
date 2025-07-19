import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bottom sheet demo app', () => {
  render(<App />);
  const titleElement = screen.getByText(/React Bottom Sheet Demo/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders open button', () => {
  render(<App />);
  const openButton = screen.getByText(/Open Bottom Sheet/i);
  expect(openButton).toBeInTheDocument();
});

test('renders feature cards', () => {
  render(<App />);
  const springMotionCard = screen.getByRole('heading', { name: /Spring Motion/i });
  const gestureCard = screen.getByRole('heading', { name: /Gesture Support/i });
  const responsiveCard = screen.getByRole('heading', { name: /Responsive Design/i });
  
  expect(springMotionCard).toBeInTheDocument();
  expect(gestureCard).toBeInTheDocument();
  expect(responsiveCard).toBeInTheDocument();
});
