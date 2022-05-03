import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';
import { stat } from './state'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCGt_oynUHVpdfZ1-P71eUBtwY-4urMnuI",
  authDomain: "glimb-nabla.firebaseapp.com",
  projectId: "glimb-nabla",
  storageBucket: "glimb-nabla.appspot.com",
  messagingSenderId: "878451516642",
  appId: "1:878451516642:web:638ac2dee2b8c73c836abb",
  measurementId: "G-27BFCYK0NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function Themes() {
  // Theme to prefrence and listen for changes
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !stat.themeChanged ?
    (stat.theme = 'dark') : (stat.theme = 'light')
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",
    e => e.matches ? (stat.theme = 'dark') : (stat.theme = 'light') // listener
  );
}
Themes();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <App tab="home" />
);