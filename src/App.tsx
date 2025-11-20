import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/SEO';
import { AppRouter } from './AppRouter';
import { WhatsAppWidget } from './components/WhatsAppWidget';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SEO />
        <AppRouter />
        <WhatsAppWidget />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;