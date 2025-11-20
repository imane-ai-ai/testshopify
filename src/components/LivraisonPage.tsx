import React from 'react';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

export const LivraisonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-black text-white px-8 py-6 text-center">
            <Truck className="h-12 w-12 mx-auto mb-3" />
            <h1 className="text-3xl font-bold">Livraison Gratuite</h1>
            <p className="text-gray-300 mt-2 text-sm uppercase tracking-wide">Pour tout le Maroc</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Couverture Nationale</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous livrons gratuitement dans toutes les villes du Maroc, de Tanger à Laâyoune.
                  Votre montre de luxe vous sera livrée directement à votre domicile ou bureau.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Délai de Livraison</h2>
                <p className="text-gray-600 leading-relaxed">
                  Livraison rapide sous 24 à 48 heures pour les grandes villes (Casablanca, Rabat, Marrakech).
                  Sous 3 à 5 jours ouvrables pour les autres villes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Emballage Sécurisé</h2>
                <p className="text-gray-600 leading-relaxed">
                  Chaque montre est soigneusement emballée dans son écrin d'origine avec tous les documents
                  et certificats. Livraison discrète et assurée pour votre tranquillité d'esprit.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> Pour toute commande passée avant 14h,
                  l'expédition est effectuée le jour même. Un numéro de suivi vous sera fourni par SMS et email.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="/"
                className="inline-block bg-black text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
              >
                Retour à la boutique
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
