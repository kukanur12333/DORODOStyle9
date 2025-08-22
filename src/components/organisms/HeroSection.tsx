import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '../atoms/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-gold/20 to-purple-500/20 border border-primary-gold/30 rounded-full px-4 py-2"
            >
              <Sparkles size={16} className="text-primary-gold" />
              <span className="text-sm font-montserrat">AI-Powered Fashion Revolution</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight"
              >
                Luxury
                <span className="bg-gradient-to-r from-primary-gold to-yellow-400 bg-clip-text text-transparent">
                  {' '}Redefined
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 font-poppins max-w-2xl"
              >
                Experience the future of fashion with AI-generated designs, exclusive collections, 
                and personalized luxury that adapts to your unique style.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <Star className="text-primary-gold" size={16} />
                <span className="text-gray-300">50K+ AI Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-primary-gold" size={16} />
                <span className="text-gray-300">Elite Membership</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-primary-gold" size={16} />
                <span className="text-gray-300">Global Luxury</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="gold" size="xl" className="group">
                Explore AI Studio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-black">
                Shop Collections
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <span>Free shipping worldwide</span>
              <span>•</span>
              <span>30-day returns</span>
              <span>•</span>
              <span>AI-powered recommendations</span>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative grid grid-cols-2 gap-4">
              {/* Featured Products */}
              <motion.div
                className="space-y-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"
                  alt="AI Fashion 1"
                  className="w-full h-48 object-cover rounded-2xl shadow-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=300&fit=crop"
                  alt="AI Fashion 2"
                  className="w-full h-32 object-cover rounded-2xl shadow-xl"
                />
              </motion.div>
              
              <motion.div
                className="space-y-4 mt-8"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop"
                  alt="AI Fashion 3"
                  className="w-full h-32 object-cover rounded-2xl shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop"
                  alt="AI Fashion 4"
                  className="w-full h-48 object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 bg-primary-gold text-black px-4 py-2 rounded-full text-sm font-semibold shadow-gold"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              AI Generated
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Limited Edition
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
