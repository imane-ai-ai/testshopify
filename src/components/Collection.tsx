import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, getProductsByCategory } from '../data/products';
import { Filter } from 'lucide-react';

interface CollectionProps {
  category?: string;
}

export const Collection: React.FC<CollectionProps> = ({ category = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const brandLogos: { [key: string]: string } = {
    'rolex': 'https://i.imgur.com/NHVeL7Y.jpeg',
    'rolex-femme': 'https://i.imgur.com/NHVeL7Y.jpeg',
    'patek-philippe': 'https://i.imgur.com/cAZC3Z2.jpeg',
    'audemars-piguet': 'https://i.imgur.com/3aGxpA3.jpeg',
    'cartier': 'https://i.imgur.com/NFI0o5H.jpeg',
    'omega': 'https://i.imgur.com/AJ3jgrT.jpeg',
    'omega-femmes': 'https://i.imgur.com/AJ3jgrT.jpeg',
    'franck-muller-femme': 'https://i.imgur.com/0n877jO.jpeg',
    'hublot': 'https://i.imgur.com/D95S3f6.png',
    'tommy': 'https://montresuisse.ma/wp-content/uploads/2025/07/TOMMY-HILFIGER-montres-homme-montre-femme-authentique-maroc-logo-montresuisse.png',
    'richard-mille': 'https://i.imgur.com/u0tZ84J.jpeg',
    'michael-kors': 'https://i.imgur.com/xnuOqSD.jpeg',
    'jacob-co': 'https://i.imgur.com/P8rbe2K.png',
    'breitling': 'https://i.imgur.com/d286iaH.jpeg',
    'boss': 'https://montresuisse.ma/wp-content/uploads/2025/07/Hugo-Boss-montres-homme-montre-femme-authentique-maroc-logo-montresuisse.png'
  };

  const categories = [
    { id: 'rolex', name: 'ROLEX', count: products.filter(p => p.brand === 'ROLEX').length },
    { id: 'patek-philippe', name: 'Patek Philippe', count: products.filter(p => p.brand === 'Patek Philippe').length },
    { id: 'audemars-piguet', name: 'Audemars Piguet', count: products.filter(p => p.brand === 'Audemars Piguet').length },
    { id: 'cartier', name: 'Cartier', count: products.filter(p => p.brand === 'Cartier').length },
    { id: 'omega', name: 'OMEGA', count: products.filter(p => p.brand === 'OMEGA').length },
    { id: 'omega-femmes', name: 'OMEGA FEMMES', count: products.filter(p => p.brand === 'OMEGA FEMMES').length },
    { id: 'franck-muller-femme', name: 'FRANCK MULLER FEMME', count: products.filter(p => p.brand === 'FRANCK MULLER FEMME').length },
    { id: 'rolex-femme', name: 'ROLEX FEMME', count: products.filter(p => p.brand === 'ROLEX FEMME').length },
    { id: 'hublot', name: 'Hublot', count: products.filter(p => p.brand === 'Hublot').length },
    { id: 'tommy', name: 'Tommy', count: products.filter(p => p.brand === 'Tommy').length },
    { id: 'richard-mille', name: 'Richard Mille', count: products.filter(p => p.brand === 'Richard Mille').length },
    { id: 'michael-kors', name: 'Michael Kors', count: products.filter(p => p.brand === 'Michael Kors').length },
    { id: 'jacob-co', name: 'Jacob & CO', count: products.filter(p => p.brand === 'Jacob & CO').length },
    { id: 'breitling', name: 'Breitling', count: products.filter(p => p.brand === 'Breitling').length },
    { id: 'boss', name: 'BOSS', count: products.filter(p => p.brand === 'BOSS').length }
  ];

  const filteredProducts = getProductsByCategory(selectedCategory);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {brandLogos[selectedCategory] && (
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={brandLogos[selectedCategory]}
              alt={categories.find(c => c.id === selectedCategory)?.name || 'Brand'}
              className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 object-contain max-w-full px-4"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center lg:text-left px-4 sm:px-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
            Notre <span className="font-bold text-yellow-600">Collection</span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            <span className="font-serif italic">Découvrez notre sélection de garde-temps de luxe des marques les plus prestigieuses au monde</span>
          </p>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Categories */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 text-center lg:text-left">Catégories</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-yellow-600 text-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-64 text-center lg:text-left">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Trier par</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-xs sm:text-sm"
              >
                <option value="featured">À la Une</option>
                <option value="price-low">Prix: Du Moins Cher au Plus Cher</option>
                <option value="price-high">Prix: Du Plus Cher au Moins Cher</option>
                <option value="name">Nom: A à Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 px-4 sm:px-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            Filtres
          </button>
        </div>

        {/* Products Grid */}
        <div className="relative px-4 sm:px-0">
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
            {sortedProducts.map((product) => (
              <div key={product.id} className="flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {(sortedProducts.length === 0) && (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">Aucune montre trouvée correspondant à vos critères.</p>
          </div>
        )}
      </div>
    </div>
  );
};