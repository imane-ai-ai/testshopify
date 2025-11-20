import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Package, Truck, Home } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  items: OrderItem[];
  customerInfo: {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
  };
  totalPrice: number;
  orderDate: string;
}

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state as OrderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Commande non trouvée</h1>
            <p className="text-gray-600 mb-8">Aucune information de commande disponible.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              RETOUR À L'ACCUEIL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in">
          <div className="bg-green-600 text-white px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-50"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 animate-bounce">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold mb-3">Merci pour votre commande !</h1>
              <p className="text-green-100 text-lg">Votre commande a été confirmée avec succès</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Package className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Commande confirmée</h3>
                <p className="text-sm text-gray-600">Votre commande est en cours de préparation</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Livraison gratuite</h3>
                <p className="text-sm text-gray-600">Sous 24-48h pour les grandes villes</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Garantie 1 an</h3>
                <p className="text-sm text-gray-600">Avec essayages inclus</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de livraison</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nom complet</p>
                    <p className="font-semibold text-gray-900">
                      {orderData.customerInfo.prenom} {orderData.customerInfo.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                    <p className="font-semibold text-gray-900">{orderData.customerInfo.telephone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Adresse de livraison</p>
                  <p className="font-semibold text-gray-900">{orderData.customerInfo.adresse}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Résumé de la commande</h2>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 rounded-lg p-4"
                  >
                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {item.brand}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                        <span className="font-bold text-gray-900">
                          {(item.price * item.quantity).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          MAD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-medium">
                      {orderData.totalPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      MAD
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-medium text-green-600">Gratuit</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="font-medium">0.00 MAD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>
                      {orderData.totalPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      MAD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Prochaines étapes</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Vous recevrez un SMS de confirmation avec un numéro de suivi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Notre équipe vous contactera pour confirmer la livraison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>La livraison sera effectuée dans un emballage sécurisé et discret</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Home size={20} />
                  <span>RETOUR À L'ACCUEIL</span>
                </button>
                <button
                  onClick={() => navigate('/collection')}
                  className="flex-1 bg-white border-2 border-black text-black py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  CONTINUER VOS ACHATS
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ? Contactez-nous au{' '}
            <a href="http://wa.me/+212773893222" className="text-green-600 font-semibold hover:underline">
              +212 773 893 222
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
