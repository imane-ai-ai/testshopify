import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { Product } from '../types/Product';

interface NewArrivalsProps {
  onViewAllClick: () => void;
  onRolexCollectionClick?: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onViewAllClick, onRolexCollectionClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const newArrivals: Product[] = [
    {
      id: 'rolex-land-dweller-ice-blue',
      name: 'Rolex Land-Dweller Ice Blue Honeycomb',
      brand: 'ROLEX',
      price: 175000,
      image: 'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/JMLbINq.png',
      images: [
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/0N62RbC.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/2FaRc9d.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/eGoORw6.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/JMLbINq.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/wbZJEHs.png'
      ],
      category: 'men',
      description: 'Exceptional Land-Dweller featuring a stunning ice blue honeycomb dial, combining rugged functionality with refined elegance.',
      features: ['Ice blue honeycomb dial', 'Oyster case', 'Automatic movement', 'Scratch-resistant sapphire'],
      inStock: true,
      isNew: true,
      externalUrl: 'https://crowntime.youcan.store/products/rolex-land-dweller-ice-blue-honeycomb'
    },
    {
      id: 'rolex-land-dweller-white',
      name: 'Rolex Land-Dweller White Honeycomb',
      brand: 'ROLEX',
      price: 170000,
      image: 'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/CD3OgYf.png',
      images: [
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/A83Hfe0.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/dRg4TT2.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/IRFL8Kq.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/n87wGZL.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/sIg0kAN.png'
      ],
      category: 'men',
      description: 'Distinguished Land-Dweller with a pristine white honeycomb dial, exemplifying timeless sophistication and precision engineering.',
      features: ['White honeycomb dial', 'Oyster bracelet', 'Automatic movement', 'Water resistant'],
      inStock: true,
      isNew: true,
      externalUrl: 'https://crowntime.youcan.store/products/rolex-land-dweller-white-honeycomb'
    },
    {
      id: 'rolex-day-date-chocolate',
      name: 'Rolex Day-Date 40 Day-Date 40mm Chocolate Dial',
      brand: 'ROLEX',
      price: 165000,
      image: 'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/wxnfxZ1.png',
      images: [
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/5zHmVyG.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/BVd2rQF.jpeg',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/hd4ZM9F.jpeg',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/UMzCPgW.jpeg'
      ],
      category: 'men',
      description: 'The Rolex fluted bezel is a mark of distinction. Originally, the fluting of the Oyster bezel had a functional purpose: it served to screw the bezel onto the case helping to ensure the waterproofness of the watch.',
      features: ['Chronograph function', 'Tachymetric bezel', 'Oyster bracelet', 'Certified chronometer'],
      inStock: true,
      isBestSeller: true,
      externalUrl: 'https://crowntime.youcan.store/products/rolex-daytona'
    },
    {
      id: 'rolex-daytona-le-mans',
      name: 'Rolex Cosmograph Daytona "Le Mans" 126529LN',
      brand: 'ROLEX',
      price: 185000,
      image: 'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/7dEdIWO.png',
      images: [
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/6tAjZq7.jpeg',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/7dEdIWO.png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/7wkI6qm%20(3).png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/IeD4zs8.jpeg',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/JVkCa5d%20(3).png',
        'https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/bilalimages/Untitled%20folder/Rolex3/Rolex%204/rolex5/rolex6/rolex%207/rolex9/mcOUVgD.jpeg'
      ],
      category: 'men',
      description: 'Perpetual, mechanical, self-winding Movement, President, semi-circular three-piece links Bracelet, Approximately 70 hours Power reserve, Waterproof to 100 metres / 330 feet.',
      features: ['Bidirectional bezel', 'Cerachrom insert', 'Oysterflex bracelet', 'Water resistant 100m'],
      inStock: true,
      isNew: true,
      externalUrl: 'https://crowntime.youcan.store/products/rolex-yacht-master'
    }
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;

    if (isLeftSwipe && canScrollRight) {
      scrollRight();
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left px-4 lg:px-0">
            <div className="text-xs sm:text-sm text-black uppercase tracking-wider font-medium">
              ROLEX
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight">
              DÉCOUVREZ LE SOMMET DE L'<span className="text-gold-600">EXCELLENCE</span>
            </h2>

            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              <span className="font-serif italic">Découvrez le savoir-faire légendaire de Rolex, le joyau de l'horlogerie suisse. Chaque garde-temps Rolex représente une précision inégalée, une élégance intemporelle et une valeur durable. De l'iconique Submariner à la prestigieuse Daytona, découvrez des montres qui définissent le luxe depuis des générations.</span>
            </p>

            <button
              onClick={onRolexCollectionClick || onViewAllClick}
              className="bg-black text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
            >
              EXPLORER LA COLLECTION
            </button>
          </div>

          {/* Right Column - Watch Carousel */}
          <div className="relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 border border-gray-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            )}

            <div className="flex items-center">
              {/* Products Container */}
              <div className="flex-1 overflow-hidden">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {newArrivals.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex-shrink-0 w-56 sm:w-64 lg:w-72 xl:w-80 flex flex-col"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div className="bg-white group h-full flex flex-col">
                        {/* Product Image - Fixed aspect ratio */}
                        <div className="relative mb-3 sm:mb-4 overflow-hidden h-72 sm:h-80 lg:h-96">
                          <LazyImage
                            src={product.image}
                            alt={product.name}
                            className="group-hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="text-center space-y-1 sm:space-y-2 flex-grow flex flex-col justify-start">
                          <div className="text-black font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wide">
                            {product.brand}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm font-serif italic min-h-[2.5rem] flex items-center justify-center px-2">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Added Image Section */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] xl:h-[700px] mt-6 sm:mt-8 lg:mt-12 overflow-hidden">
        <img
          src="https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/patek%20philipique/admet%20piguet/cartier/omega/omega%20femme/rolex%20femme%20/hublot/tommy/michel%20kors/boss/Untitled%20folder/jeHK5k8.jpeg"
          alt="Luxury Watch Collection"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};