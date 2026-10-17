import { StrictMode } from 'react';
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
