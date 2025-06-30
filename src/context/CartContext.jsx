import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse cart data', error);
      return [];
    }
  });

  // Calculate derived values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((book, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === book._id);
      
      if (existingItem) {
        // Check stock availability
        if (existingItem.quantity + quantity > existingItem.countInStock) {
          toast.error(`Only ${existingItem.countInStock} items available in stock`);
          return prev;
        }
        
        const updated = prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Quantity updated (${existingItem.quantity + quantity})`);
        return updated;
      } else {
        // Verify stock before adding new item
        if (quantity > book.countInStock) {
          toast.error(`Only ${book.countInStock} items available in stock`);
          return prev;
        }
        
        const updated = [...prev, { 
          ...book, 
          quantity,
          // Store only necessary book data
          title: book.title,
          price: book.price,
          image: book.image,
          countInStock: book.countInStock
        }];
        toast.success('Item added to cart');
        return updated;
      }
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      toast.success('Item removed from cart');
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prev) => {
      const item = prev.find(item => item._id === id);
      if (!item) return prev;
      
      // Check stock availability
      if (newQuantity > item.countInStock) {
        toast.error(`Only ${item.countInStock} items available in stock`);
        return prev;
      }
      
      const updated = prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      );
      toast.success(`Quantity updated to ${newQuantity}`);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success('Cart cleared');
  }, []);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount,
        cartTotal,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};