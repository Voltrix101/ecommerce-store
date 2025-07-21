import React, { useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Product } from '../types';

interface SearchSuggestionsProps {
  isOpen: boolean;
  searchQuery: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
  onSearchSelect: (query: string) => void;
}

const trendingSearches = [
  'Wireless headphones',
  'Smart watch',
  'Running shoes',
  'Laptop',
  'iPhone case',
];

const recentSearches = ['Nike shoes', 'MacBook Pro', 'Gaming chair'];

export function SearchSuggestions({
  isOpen,
  searchQuery,
  products,
  onProductSelect,
  onSearchSelect,
}: SearchSuggestionsProps) {
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ['name', 'brand', 'category', 'tags'],
        threshold: 0.3,
      }),
    [products]
  );

  if (!isOpen) return null;

  const filteredProducts =
    searchQuery.length > 0 ? fuse.search(searchQuery).slice(0, 5) : [];

  const showTrending = searchQuery.length === 0;
  const showProducts = searchQuery.length > 0 && filteredProducts.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md rounded-xl shadow-xl border border-border z-50 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
      {showTrending && (
        <>
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Recent Searches
                </span>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => onSearchSelect(search)}
                    className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 rounded-lg transition-all duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Trending
              </span>
            </div>
            <div className="space-y-2">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onSearchSelect(search)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Search className="h-3 w-3 text-muted-foreground" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {showProducts && (
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Products
            </span>
          </div>
          <div className="space-y-2">
            {filteredProducts.map(({ item: product }) => (
              <button
                key={product.id}
                onClick={() => onProductSelect(product)}
                className="w-full text-left p-3 hover:bg-primary/10 rounded-lg transition-all duration-200 flex items-center space-x-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.brand} • ${product.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {searchQuery.length > 0 && filteredProducts.length === 0 && (
        <div className="p-4 text-center">
          <Search className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No products found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}