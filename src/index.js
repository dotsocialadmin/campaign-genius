import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BasicApp from './BasicApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasicApp />
  </React.StrictMode>
);

// Add debug info to console
console.log('React app rendering started');
console.log('Public URL:', process.env.PUBLIC_URL);
console.log('Root element:', document.getElementById('root'));