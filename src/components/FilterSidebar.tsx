import React from 'react';
import { X, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    priceRange: [number, number];
    brands: string[];
    rating: number;
    inStock: boolean;
  };
  onFiltersChange: (filters: any) => void;
  products: Product[];
}

export function FilterSidebar({ isOpen, onClose, filters, onFiltersChange, products }: FilterSidebarProps) {
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  const maxPrice = Math.max(...products.map(p => p.price));

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  const handleStockToggle = () => {
    onFiltersChange({ ...filters, inStock: !filters.inStock });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, maxPrice],
      brands: [],
      rating: 0,
      inStock: false,
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-100 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Filters
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-65px)]">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-2 rounded-lg transition-all duration-200"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border-2 rounded transition-colors ${
                        filters.brands.includes(brand)
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {filters.brands.includes(brand) && (
                        <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{brand}</span>
                  <span className="text-xs text-gray-500">
                    ({products.filter((p) => p.brand === brand).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-2 rounded-lg transition-all duration-200"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border-2 rounded-full transition-colors ${
                        filters.rating === rating
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {filters.rating === rating && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating
                            ? 'text-yellow-400 fill-current drop-shadow-sm'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">& above</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-2 rounded-lg transition-all duration-200">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={handleStockToggle}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded transition-colors ${
                    filters.inStock
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-600'
                      : 'border-gray-300'
                  }`}
                >
                  {filters.inStock && (
                    <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}