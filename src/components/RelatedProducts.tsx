import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newPosition =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8 sm:mb-10 lg:mb-12 relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-full"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-widest uppercase border-t border-b border-black py-2 px-8">
            DANS LA MÊME CATÉGORIE
          </h2>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-full"
            aria-label="Next"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-64 sm:w-72 cursor-pointer group"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="aspect-square bg-white mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="text-center space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-800">
                  {product.brand}
                </div>
                <h3 className="text-sm font-medium text-gray-900 px-2">
                  {product.name}
                </h3>
                <p className="text-base font-bold text-black">
                  {product.price.toLocaleString('fr-MA')} MAD
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
