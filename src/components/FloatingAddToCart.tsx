import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface FloatingAddToCartProps {
  product: Product;
}

export function FloatingAddToCart({ product }: FloatingAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <motion.div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md mx-auto p-4`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-card/95 backdrop-blur-md rounded-xl shadow-lg border border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div>
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-primary font-bold">${product.price}</p>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}