import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {MoviesContextProvider} from './context/MoviesContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoviesContextProvider>
      <App />
    </MoviesContextProvider>
  </StrictMode>,
);
