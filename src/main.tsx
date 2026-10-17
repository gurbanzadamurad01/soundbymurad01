import { StrictMode } from 'react';
import { Capacitor } from '@capacitor/core';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PlayerProvider } from './player';
import { SongsProvider } from './songs';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SongsProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </SongsProvider>
    </BrowserRouter>
  </StrictMode>,
);

// Lets the website be installed and opened offline. The Android app already ships its files.
if (import.meta.env.PROD && 'serviceWorker' in navigator && !Capacitor.isNativePlatform()) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
