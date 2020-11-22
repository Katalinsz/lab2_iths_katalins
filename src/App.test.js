import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import Topbar from './components/TopBar'; 


test('renders 4 Cards', () => {
  const buttons = screen.getByText(/Knit with Line by line/i);
  expect(buttons).toBeInTheDocument();
});

test('renders a message', () => {
  const { container, getByText } = render(<App />)
  expect(getByText('Grid')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `)
  
})

test('renders learn react link', () => {
  const app = render(<App />);
  expect(app.getByText('/knit/')).toBeInTheDocument();
  
});

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
   
  });
});

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });
 
  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
 
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});