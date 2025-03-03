import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

// Create root using modern React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside HashRouter for GitHub Pages compatibility
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Log initialization info for debugging
console.log('React app rendering initialized');
console.log('Root element:', document.getElementById('root'));