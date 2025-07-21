import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const CartPage: React.FC = () => {
  const { state, dispatch, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    dispatch({ type: 'OPEN_CART' }); // Open the drawer checkout modal for now
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e7e5e4] py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">Your Cart</h1>
        {state.items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-700 mb-4">Your cart is empty.</p>
            <Button onClick={() => navigate('/products')} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">{item.product.brand}</p>
                    <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${(item.product.price * item.quantity).toFixed(2)}</span>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full text-lg">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full text-lg">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between w-full text-lg">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full text-xl font-bold">
                <span>Total</span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                <CreditCard className="h-5 w-5" />
                <span>Proceed to Checkout</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 