import React, { useState } from 'react';
import { User, Heart, Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const scrolled = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      'bg-black shadow-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <button
              onClick={() => onPageChange('home')}
              className="transition-all duration-300 hover:scale-105"
            >
              <div className="h-14 sm:h-16 lg:h-20 w-auto flex items-center">
                <img
                  src="https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/patek%20philipique/admet%20piguet/cartier/omega/omega%20femme/rolex%20femme%20/hublot/tommy/michel%20kors/boss/Untitled%20folder/8pHemQ1.png"
                  alt="CROWN TIME"
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
                  loading="eager"
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-sm xl:text-base font-medium tracking-wide transition-all duration-300 hover:scale-105 relative group ${
                  currentPage === item.id
                    ? 'text-gold-600'
                    : 'text-white hover:text-gold-600'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-600 transition-all duration-300 group-hover:w-full ${
                  currentPage === item.id ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 z-10">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 ml-2 transition-all duration-300 hover:scale-110 text-white hover:text-gold-600"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-800 shadow-lg animate-slide-up">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-4 text-lg font-medium transition-all duration-300 hover:bg-gold-600/10 hover:text-gold-600 rounded-lg ${
                    currentPage === item.id
                      ? 'text-gold-600 bg-gold-600/10'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </header>
  );
};