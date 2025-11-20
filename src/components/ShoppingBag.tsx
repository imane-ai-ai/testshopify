import React, { useEffect } from 'react';
import { X, ShoppingBag as BagIcon, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShoppingBag } from '../context/ShoppingBagContext';
import { CartItem } from './CartItem';

export const ShoppingBag: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    closeBag,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
  } = useShoppingBag();

  const handleViewCart = () => {
    closeBag();
    navigate('/checkout');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBag();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeBag]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeBag}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-bag-title"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <BagIcon size={24} className="text-gray-900" />
              <h2 id="shopping-bag-title" className="text-xl font-bold text-gray-900">
                Shopping Bag
                {totalItems > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={closeBag}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close shopping bag"
            >
              <X size={24} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BagIcon size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your bag is empty
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Add items to get started
              </p>
              <button
                onClick={closeBag}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleViewCart}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base flex items-center justify-center gap-2 group"
                >
                  <span>VIEW CART</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={closeBag}
                  className="w-full mt-3 bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  CONTINUER LES ACHATS
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
