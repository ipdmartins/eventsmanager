import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title', () => {
	render(<App />);
	const linkElement = screen.getByText(/Event Manager/i);
	expect(linkElement).toBeInTheDocument();
});

test('renders input search', () => {
	render(<App />);
	const linkElement = screen.getByPlaceholderText(/Search for an event/i);
	expect(linkElement).toBeInTheDocument();
});

test('renders button new event search', () => {
	render(<App />);
	const linkElement = screen.getByRole('button', { name: /New event/ });
	expect(linkElement).toBeInTheDocument();
});
