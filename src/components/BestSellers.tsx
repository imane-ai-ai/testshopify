import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { getBestSellers } from '../data/products';

export const BestSellers: React.FC = () => {
  const products = getBestSellers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  React.useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 sm:mb-16 lg:mb-20">
          <div className="text-center flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 sm:mb-6 tracking-wide">
              Meilleures <span className="font-bold text-gold-600">Ventes</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gold-600 mx-auto mb-4 sm:mb-6 lg:mb-8"></div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
              <span className="font-serif italic">Nos garde-temps les plus convoités, choisis par des connaisseurs du monde entier</span>
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 sm:p-3 border-2 border-gray-300 hover:border-gold-600 hover:text-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 ${
                  currentIndex === i 
                    ? 'bg-gold-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-2 sm:p-3 border-2 border-gray-300 hover:border-gold-600 hover:text-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              width: `${(products.length * 100) / itemsPerPage}%`
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 sm:px-3 lg:px-4 flex"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};