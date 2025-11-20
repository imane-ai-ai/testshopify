import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../types/Product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (productId: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    ).slice(0, 8);

    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setSearchResults([]);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProductClick = (productId: number) => {
    onProductClick(productId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="flex items-start justify-center min-h-screen px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-slide-up">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Rechercher</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une montre, une marque..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gold-600 focus:ring-2 focus:ring-gold-600/20 outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6">
            {searchQuery.trim() === '' ? (
              <div className="text-center py-12 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Commencez à taper pour rechercher</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Aucun résultat trouvé pour "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group text-left"
                  >
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <p className="text-lg font-bold text-gold-600 mt-1">
                        {product.price.toLocaleString('fr-FR')} DH
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
