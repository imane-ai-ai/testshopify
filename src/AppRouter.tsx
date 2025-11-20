import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExclusiveServices } from './components/ExclusiveServices';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { initPerformanceMonitoring } from './utils/performance';

type Page = 'home' | 'about' | 'contact';

export const AppRouter: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const navigate = useNavigate();

  React.useEffect(() => {
    initPerformanceMonitoring();
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
    navigate(`/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const HomePage = () => (
    <>
      <Hero />
      <About />
      <ExclusiveServices />
      <Newsletter />
    </>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-8 text-center">
          Nous <span className="font-bold text-yellow-600">Contacter</span>
        </h1>
        <div className="p-8 border-t border-gray-200">
          <p className="text-gray-600 text-center font-serif italic">
            Contactez nos experts en montres de luxe. Nous sommes là pour vous aider à trouver le garde-temps parfait.
          </p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
