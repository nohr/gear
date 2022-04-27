import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';
import { stat } from './state'

// Theme to prefrence and listen for changes
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !stat.themeChanged ?
  (stat.theme = 'dark') : (stat.theme = 'light')
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",
  e => e.matches ? (stat.theme = 'dark') : (stat.theme = 'light') // listener
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <App tab="home" />
);