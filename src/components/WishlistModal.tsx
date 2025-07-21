import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export function WishlistModal() {
  const { state, dispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  if (!state.isOpen) return null;

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'REMOVE_ITEM', payload: product.id });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={() => dispatch({ type: 'CLOSE_WISHLIST' })} />
      
      <div className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b border-gray-100 p-4 bg-gradient-to-r from-pink-50 to-red-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              My Wishlist ({state.items.length})
            </h2>
            <button
              onClick={() => dispatch({ type: 'CLOSE_WISHLIST' })}
              className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-red-200 rounded-full blur-xl opacity-30 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600">Save items you love for later!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm font-medium bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                        ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl mr-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}