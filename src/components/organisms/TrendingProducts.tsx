import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '../molecules/ProductCard';
import { Button } from '../atoms/Button';
import { generateMockProducts } from '../../utils/mockData';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export const TrendingProducts: React.FC = () => {
  const { state, dispatch } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trendingProducts = generateMockProducts(8);
    setProducts(trendingProducts);
  }, []);

  useEffect(() => {
    const calculateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };
    
    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    
    return () => window.removeEventListener('resize', calculateWidth);
  }, [products]);

  const handleAddToCart = (productId: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity: 1 }
    });
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="text-orange-500" size={24} />
            <h2 className="text-4xl font-bold font-montserrat text-gray-900">
              Trending Now
            </h2>
          </div>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover the most coveted pieces from our luxury collection and AI-generated exclusives
          </p>
        </motion.div>

        <motion.div ref={carousel} className="cursor-grab" whileTap={{ cursor: "grabbing" }}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-6 mb-12"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[280px] md:min-w-[320px]"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={state.wishlist.includes(product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="group">
            View All Trending
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
