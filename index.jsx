 import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ✅ Correct path
import './App.css'; // ✅ Optional: global CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
