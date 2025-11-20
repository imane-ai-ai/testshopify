import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../context/ShoppingBagContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {product.brand}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.name}
            </p>
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 transition-colors rounded-l-lg"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 transition-colors rounded-r-lg"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">
              ${(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-gray-500">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
