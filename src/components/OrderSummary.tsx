import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CartItem } from '../context/ShoppingBagContext';

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  grandTotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalPrice,
  deliveryFee,
  grandTotal,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 h-fit lg:sticky lg:top-24">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-6 text-left hover:opacity-80 transition-opacity"
      >
        <h2 className="text-xl font-semibold text-gray-900">Résumé de la commande</h2>
        {isExpanded ? (
          <ChevronUp className="text-gray-600" size={24} />
        ) : (
          <ChevronDown className="text-gray-600" size={24} />
        )}
      </button>

      {isExpanded && (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-gray-50 rounded-lg p-4 shadow-sm"
              >
                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{item.product.brand}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Qté: {item.quantity}</span>
                    <span className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString('en-US', {
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

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span className="font-medium text-gray-900">
                {totalPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                MAD
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              <span className="font-medium text-green-600">
                {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee} MAD`}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {grandTotal.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                MAD
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span>Livraison sous 3-5 jours ouvrables</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
