import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  isAI: boolean;
  productCount: number;
}

export const FeaturedCategories: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'AI Exclusive',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop',
      description: 'Unique AI-generated fashion pieces',
      isAI: true,
      productCount: 240,
    },
    {
      id: '2',
      name: 'Luxury Bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      description: 'Premium designer handbags',
      isAI: false,
      productCount: 156,
    },
    {
      id: '3',
      name: 'Elite Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
      description: 'Exquisite luxury jewelry collection',
      isAI: false,
      productCount: 89,
    },
    {
      id: '4',
      name: 'AI Streetwear',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      description: 'Futuristic street fashion',
      isAI: true,
      productCount: 198,
    },
    {
      id: '5',
      name: 'Designer Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      description: 'Luxury footwear collection',
      isAI: false,
      productCount: 134,
    },
    {
      id: '6',
      name: 'AI Accessories',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop',
      description: 'Tech-inspired accessories',
      isAI: true,
      productCount: 76,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
            Trending Categories
          </h2>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover our curated collections featuring AI-generated exclusives and luxury essentials
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-500 overflow-hidden cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* AI Badge */}
                {category.isAI && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles size={12} />
                      AI
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-poppins">{category.productCount} items</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-poppins text-sm">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            className="inline-flex items-center gap-2 bg-primary-black text-white px-8 py-4 rounded-2xl font-montserrat font-semibold hover:bg-gray-800 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Categories
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
