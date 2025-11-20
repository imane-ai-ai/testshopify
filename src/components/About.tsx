import React from 'react';
import { Award, Shield, Clock, Star } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Uniquement les meilleurs garde-temps suisses des fabricants légendaires'
    },
    {
      icon: Shield,
      title: 'Garantie Authentique',
      description: 'Chaque montre est livrée avec un certificat d’authenticité et une garantie'
    },
    {
      icon: Clock,
      title: 'Service Expert',
      description: 'Entretien et réparation professionnels par des maîtres horlogers certifiés'
    },
    {
      icon: Star,
      title: 'Sélection Exclusive',
      description: 'Collection sélectionnée de garde-temps rares et en édition limitée'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 lg:mb-8 tracking-wide">
              À Propos <span className="font-bold text-gold-600">ROLEX</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-px bg-gold-600 mb-6 sm:mb-8 lg:mb-10"></div>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
              <span className="font-serif italic">Depuis plus de trois décennies, CROWN TIME est la destination principale pour les
              collectionneurs exigeants et les passionnés à la recherche des garde-temps les plus exceptionnels au monde. En tant que
              revendeur agréé de Rolex, nous offrons la plus belle sélection de ces montres suisses légendaires,
              incarnant le summum de l'excellence horlogère.</span>
            </p>
            <p className="text-gray-300 mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-sm sm:text-base lg:text-lg">
              <span className="font-serif italic">Chaque garde-temps Rolex de notre collection représente une qualité sans compromis,
              une précision et un design intemporel. De l'iconique Oyster Perpetual à la légendaire
              Submariner et Daytona, nous vous apportons le luxe authentique Rolex fabriqué dans les prestigieux
              ateliers de Genève – des garde-temps qui définissent l'excellence et transcendent les générations.</span>
            </p>
            <button className="group bg-gold-600 hover:bg-gold-700 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 tracking-wide transition-all duration-500 hover:scale-105 shadow-xl text-sm sm:text-base">
              <span className="relative z-10">Notre Histoire</span>
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 lg:gap-6 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gold-600 p-3 sm:p-4 flex-shrink-0 group-hover:bg-gold-700 transition-colors duration-300 shadow-xl">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 text-gold-600 group-hover:text-gold-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    <span className="font-serif italic">{feature.description}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};