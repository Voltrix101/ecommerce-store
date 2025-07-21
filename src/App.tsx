import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { WishlistModal } from './components/WishlistModal';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductList } from './components/ProductList';
import { products } from './data/mockData';
import { ThankYouPage } from './pages/ThankYouPage';
import CartPage from './pages/CartPage';
import { ChatModal } from './components/ChatModal';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="min-h-screen bg-background">
              <Header onSearch={() => {}} onCategorySelect={() => {}} selectedCategory="All" onProductSelect={() => {}} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductList products={products} viewMode="grid" onViewModeChange={() => {}} searchQuery="" selectedCategory="All" />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
              </Routes>
              <Cart />
              <WishlistModal />
              <ChatModal />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;