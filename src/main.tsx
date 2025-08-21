import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./firebase";
import "./firebasenotification";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

navigator.serviceWorker
  .register('/firebase-messaging-sw.js')
  .then((registration) => {
    console.log("Service Worker registered:", registration);
  })
  .catch((err) => {
    console.log("Service Worker registration failed:", err);
  });
