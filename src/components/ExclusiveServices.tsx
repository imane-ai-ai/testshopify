import React from 'react';
import { ThumbsUp, Truck, RotateCcw, DollarSign } from 'lucide-react';

export const ExclusiveServices: React.FC = () => {
  const services = [
    {
      icon: ThumbsUp,
      title: 'EXCELLENCE',
      subtitle: 'Qualité Garantie'
    },
    {
      icon: Truck,
      title: 'SERVICE PREMIUM',
      subtitle: 'Livraison Rapide'
    },
    {
      icon: RotateCcw,
      title: 'SATISFACTION',
      subtitle: "Assistance Dédiée"
    },
    {
      icon: DollarSign,
      title: 'TARIFS COMPÉTITIFS',
      subtitle: 'Meilleure Valeur'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-medium mb-3 sm:mb-4">
            NOS SERVICES EXCLUSIFS
          </div>
          <div className="w-10 sm:w-12 md:w-16 h-px bg-black mx-auto"></div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="text-black">Notre</span>{' '}
            <span className="text-gold-600">Engagement</span>
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed px-3 sm:px-4">
            <span className="font-serif italic">Découvrez nos services premium et notre engagement envers l'excellence</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group p-3 sm:p-4">
              <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gold-600 transition-colors duration-300">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-gray-600 group-hover:text-black transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-black font-bold text-xs sm:text-sm uppercase tracking-wide mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                <span className="font-serif italic">{service.subtitle}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};