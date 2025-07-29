import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@/utils/dayjs-config';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
