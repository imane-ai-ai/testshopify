import React from 'react';
import { Link } from 'react-router-dom';
import { LazyImage } from './LazyImage';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="text-center group block h-full flex flex-col">
      {/* Badges */}
      <div className="flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 min-h-[28px] sm:min-h-[32px]">
        {!product.inStock && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 tracking-wide">
            ÉPUISÉ
          </span>
        )}
      </div>

      {/* Product Image - Fixed aspect ratio */}
      <div className="relative mb-0.5 overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
        />
      </div>

      {/* Product Info - Flex grow to fill space */}
      <div className="flex flex-col flex-grow">
        <div className="text-black text-sm sm:text-base font-bold uppercase tracking-wide mb-0.5 text-center">
          {product.brand}
        </div>

        <h3 className="text-gray-700 text-xs sm:text-sm font-serif italic leading-tight mb-0.5 text-center px-2 min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
          {product.name}
        </h3>

        {/* Price Display */}
        <div className="flex items-center justify-center gap-2 mt-auto">
          {product.originalPrice && (
            <span className="text-[#9aa0a6] text-sm font-medium relative">
              <span className="relative">
                {product.originalPrice.toLocaleString('fr-MA')}Dh
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full h-[1.5px] bg-[#9aa0a6]"></span>
                </span>
              </span>
            </span>
          )}
          <span className="text-[#111] text-xl font-medium">
            {product.price.toLocaleString('fr-MA')}Dh
          </span>
        </div>
      </div>
    </Link>
  );
};