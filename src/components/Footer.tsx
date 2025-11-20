import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    company: [
      { name: 'À Propos', href: '#' },
      { name: 'Notre Histoire', href: '#' },
      { name: 'Carrières', href: '#' },
      { name: 'Presse', href: '#' }
    ],
    support: [
      { name: 'Contactez-nous', href: '#' },
      { name: 'Guide des Tailles', href: '#' },
      { name: 'Livraison', href: '#' },
      { name: 'Retours', href: '#' }
    ],
    legal: [
      { name: 'Politique de Confidentialité', href: '#' },
      { name: 'Conditions de Service', href: '#' },
      { name: 'Politique des Cookies', href: '#' },
      { name: 'Garantie', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              CROWN<span className="text-gold-600">TIME</span>
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              <span className="font-serif italic">Votre destination première pour les garde-temps de luxe authentiques.
              Découvrez les marques de montres les plus prestigieuses au monde.</span>
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-gray-400 hover:text-gold-600 transition-colors duration-300">
                <MapPin className="h-5 w-5 text-gold-600" />
                <span className="text-sm sm:text-base">123 Avenue du Luxe, Genève, Suisse</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-gray-400 hover:text-gold-600 transition-colors duration-300">
                <Phone className="h-5 w-5 text-gold-600" />
                <span className="text-sm sm:text-base">+212 773-893222</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-gray-400 hover:text-gold-600 transition-colors duration-300">
                <Mail className="h-5 w-5 text-gold-600" />
                <span className="text-sm sm:text-base">Modewatch066@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gold-600">Entreprise</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-gold-600 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gold-600">Assistance</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-gold-600 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gold-600">Légal</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-gold-600 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-8 sm:pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg text-center md:text-left">
              © 2025 CROWN TIME. Tous droits réservés. Fabriqué avec précision.
            </p>
            <div className="flex items-center gap-6 sm:gap-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-gold-600 transition-all duration-300 hover:scale-125"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};