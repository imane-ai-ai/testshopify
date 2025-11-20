import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BannerImage } from './BannerImage';
import { ScrollingBanner } from './ScrollingBanner';

export const Hero: React.FC = () => {
  return (
    <>
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <BannerImage
          src="https://axohpdpaslhjogdsccsz.supabase.co/storage/v1/object/public/main%20page/patek%20philipique/admet%20piguet/cartier/omega/omega%20femme/rolex%20femme%20/hublot/tommy/michel%20kors/boss/Untitled%20folder/pdaHQJK.png"
          alt="Luxury Watch"
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 drop-shadow-2xl">
          CROWN <span className="text-gold-600">TIME</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-5 sm:mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-4">
          Découvrez l'excellence horlogère
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden sm:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-light tracking-wide">Défiler vers le bas</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      {/* Elegant side decorations */}
      <div className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold-600 to-transparent"></div>
      </div>
      <div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold-600 to-transparent"></div>
      </div>
    </section>
    <ScrollingBanner />
    </>
  );
};