import React, { useState, useEffect } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useShoppingBag } from '../context/ShoppingBagContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerInfoForm } from './CustomerInfoForm';
import { OrderSummary } from './OrderSummary';

export const Checkout: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, closeBag } = useShoppingBag();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    closeBag();
  }, [closeBag]);

  useEffect(() => {
    if (searchParams.get('direct') === 'true') {
      setShowForm(true);
    }
  }, [searchParams]);

  const deliveryFee = 0;
  const taxes = 0;
  const grandTotal = totalPrice + deliveryFee + taxes;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-light text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some timepieces to get started</p>
            <button
              onClick={() => navigate('/collection')}
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
          >
            ← Retour au panier
          </button>

          <h1 className="text-3xl font-light text-gray-900 mb-8">
            INFORMATIONS DE LIVRAISON
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CustomerInfoForm items={items} totalPrice={grandTotal} />
            <OrderSummary items={items} totalPrice={totalPrice} deliveryFee={deliveryFee} grandTotal={grandTotal} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          PANIER
        </h1>
        <p className="text-gray-600 mb-8">{items.length} {items.length === 1 ? 'article' : 'articles'}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-sm p-6 flex gap-6 hover:shadow-md transition-shadow"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{item.product.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-4">
                      {item.product.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      MAD
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 w-fit">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-gray-600 hover:text-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-gray-600 hover:text-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {totalPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    MAD
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="font-medium text-green-600">gratuit</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span className="font-medium text-gray-900">
                    {taxes.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    MAD
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">Total (HT)</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {totalPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      MAD
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">Total TTC</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {grandTotal.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      MAD
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
              >
                COMMANDER
              </button>

              <p className="text-xs text-center text-gray-500 mb-4">
                Estimated delivery: 3-5 business days
              </p>

              <div className="border-t border-gray-200 pt-4">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                  Apply Coupon
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
