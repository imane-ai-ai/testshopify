import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PerformanceMonitor } from './utils/performance';

// Start performance monitoring
const monitor = PerformanceMonitor.getInstance();
monitor.startTiming('app-initialization');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// End performance monitoring
monitor.endTiming('app-initialization');
