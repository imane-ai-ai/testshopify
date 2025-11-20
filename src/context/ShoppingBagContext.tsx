import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingBagContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  totalItems: number;
  totalPrice: number;
}

const ShoppingBagContext = createContext<ShoppingBagContextType | undefined>(undefined);

export const ShoppingBagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingBag');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('shoppingBag', JSON.stringify(items));
    } else {
      localStorage.removeItem('shoppingBag');
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  const openBag = () => setIsOpen(true);
  const closeBag = () => setIsOpen(false);
  const toggleBag = () => setIsOpen(prev => !prev);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <ShoppingBagContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openBag,
        closeBag,
        toggleBag,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};

export const useShoppingBag = () => {
  const context = useContext(ShoppingBagContext);
  if (context === undefined) {
    throw new Error('useShoppingBag must be used within a ShoppingBagProvider');
  }
  return context;
};
