import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/molecules/ProductCard';
import { FilterSidebar } from '../components/organisms/FilterSidebar';
import { QuickViewModal } from '../components/molecules/QuickViewModal';
import { Button } from '../components/atoms/Button';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 2000],
    brand: '',
    isAI: false,
    isLimited: false,
    inStock: true,
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const mockProducts = generateMockProducts(48);
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.isAI) {
      filtered = filtered.filter(p => p.isAIGenerated);
    }
    if (filters.isLimited) {
      filtered = filtered.filter(p => p.isLimited);
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Best Rating' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-montserrat text-gray-900">
                  Luxury Fashion Collection
                </h1>
                <p className="text-gray-600 font-poppins mt-2">
                  Discover {filteredAndSortedProducts.length} premium products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 font-poppins bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="hidden sm:flex border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <div className={`lg:block ${showFilters ? 'block fixed inset-0 bg-black/50 z-40 lg:static lg:bg-transparent' : 'hidden'}`}>
              <div className="bg-gray-50 w-80 h-full overflow-y-auto lg:bg-transparent lg:w-auto lg:h-auto">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>

            <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredAndSortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={handleAddToCart}
                          onToggleWishlist={handleToggleWishlist}
                          onQuickView={setQuickViewProduct}
                          isWishlisted={state.wishlist.includes(product.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-luxury p-6 flex flex-col sm:flex-row gap-6"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full sm:w-40 h-40 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-montserrat font-semibold text-xl mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 font-poppins mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-2xl font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={() => setQuickViewProduct(product)}>Quick View</Button>
                              <Button
                                variant="primary"
                                onClick={() => handleAddToCart(product.id)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 font-poppins text-lg">
                    Try adjusting your filters or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
