// CartContext.js
import React, { createContext, useState } from 'react';

// Create a context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => 
        index === existingProductIndex 
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const incrementQuantity = (productName) => {
    const updatedCart = cart.map(item =>
      item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productName) => {
    const updatedCart = cart.map(item =>
      item.name === productName && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
