import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart, 
  Settings,
  LogOut,
  Package,
  MapPin,
  ChevronDown,
  Bell,
  Gift,
  Zap,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/mockData';
import { products } from '../data/mockData';
import { SearchSuggestions } from './SearchSuggestions';
import { OrdersModal } from './OrdersModal';
import { SettingsModal } from './SettingsModal';
import { Product } from '../types';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  onProductSelect?: (product: Product) => void;
}

export function Header({ onSearch, onCategorySelect, selectedCategory, onProductSelect }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: authState, logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchFocused(false);
  };

  const handleSearchSelect = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    setIsSearchFocused(false);
  };

  const handleProductSelect = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
    setIsSearchFocused(false);
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 dark:bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm animate-pulse">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Gift className="h-4 w-4 mr-1 animate-bounce" />
                Free shipping on orders over $50
              </span>
              <span className="flex items-center">
                <Zap className="h-4 w-4 mr-1 text-yellow-300" />
                Flash Sale: 30% OFF
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Bell className="h-4 w-4 mr-1" />
                New Arrivals
              </span>
              <span>|</span>
              <span>24/7 Customer Support</span>
              <span>|</span>
              <span>Track Your Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopZone
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </form>
              <SearchSuggestions
                isOpen={isSearchFocused}
                searchQuery={searchQuery}
                products={products}
                onProductSelect={handleProductSelect}
                onSearchSelect={handleSearchSelect}
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
              >
                <img
                  src={authState.user?.avatar}
                  alt="User"
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-100"
                />
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={authState.user?.avatar}
                        alt="User"
                        className="h-10 w-10 rounded-full ring-2 ring-indigo-100"
                      />
                      <div>
                        <p className="font-medium">{authState.user?.name}</p>
                        <p className="text-sm text-gray-500">{authState.user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        setIsOrdersOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center space-x-3 transition-all duration-200">
                      <Package className="h-4 w-4" />
                      <span>My Orders</span>
                    </button>
                    <button 
                      onClick={() => {
                        wishlistDispatch({ type: 'TOGGLE_WISHLIST' });
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center space-x-3 transition-all duration-200">
                      <Heart className="h-4 w-4" />
                      <span>Wishlist</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center space-x-3 transition-all duration-200">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button 
                      onClick={logout}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-3 text-red-600 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              onClick={() => wishlistDispatch({ type: 'TOGGLE_WISHLIST' })}
              className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 transition-all duration-200 relative group">
              <Heart className="h-6 w-6 group-hover:text-pink-500 transition-colors duration-200" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {wishlistState.items.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => cartDispatch({ type: 'TOGGLE_CART' })}
              className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-200 relative group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:text-indigo-500 transition-colors duration-200" />
              {cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 shadow transition-all duration-300 hover:scale-110"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Sun className="h-5 w-5 text-yellow-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Moon className="h-5 w-5 text-indigo-700" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {!authState.isAuthenticated ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
              >
                <img
                  src={authState.user?.avatar}
                  alt="User"
                  className="h-8 w-8 rounded-full ring-2 ring-indigo-100"
                />
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            <button
              onClick={() => handleCategoryClick('All')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-gradient-to-t from-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gradient-to-t hover:from-indigo-50'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-gradient-to-t from-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gradient-to-t hover:from-indigo-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-4 py-3">
        <div className="relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </form>
          <SearchSuggestions
            isOpen={isSearchFocused}
            searchQuery={searchQuery}
            products={products}
            onProductSelect={handleProductSelect}
            onSearchSelect={handleSearchSelect}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all duration-200"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <OrdersModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}