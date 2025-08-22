import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Plus, Minus, Share2 } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { ProductImageGallery } from '../components/organisms/ProductImageGallery';
import { ProductReviews } from '../components/organisms/ProductReviews';
import { RelatedProducts } from '../components/organisms/RelatedProducts';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import { useApp } from '../context/AppContext';
import { generateMockProducts } from '../utils/mockData';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('XXL');
  const [selectedColor, setSelectedColor] = useState('#5C4033'); // Brown
  const [quantity, setQuantity] = useState(4);
  const [activeTab, setActiveTab] = useState('review');

  useEffect(() => {
    setTimeout(() => {
      const mockProduct = generateMockProducts(1)[0];
      mockProduct.name = 'Trendy Brown Coat';
      mockProduct.price = 75.00;
      mockProduct.originalPrice = 150.00;
      mockProduct.rating = 4.8;
      mockProduct.reviews = 245;
      mockProduct.category = 'Coats';
      mockProduct.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId: product.id, quantity, size: selectedSize, color: selectedColor }
      });
    }
  };

  const handleToggleWishlist = () => {
    if (product) dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center"><p>Product not found</p></div>;
  }

  const isWishlisted = state.wishlist.includes(product.id);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Coats', href: '/shop/coats' },
    { label: 'Product Details' },
  ];

  return (
    <div className="bg-white">
      <div className="bg-gray-50 py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-montserrat mb-2">Product Details</h1>
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery images={product.images} productName={product.name} />
          <div className="space-y-6">
            <p className="text-gray-500 font-poppins">{product.category}</p>
            <h1 className="text-4xl font-bold font-montserrat text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({product.reviews} Review)</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <p className="text-gray-600 font-poppins leading-relaxed">{product.description}</p>
            <div>
              <h3 className="font-montserrat font-semibold mb-2">Color: <span className="font-normal">Brown</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-gray-300'}`} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-montserrat font-semibold mb-2">Size: <span className="font-normal">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md text-sm transition-colors ${selectedSize === size ? 'bg-brand-tan text-white border-brand-tan' : 'border-gray-300 hover:border-gray-500'}`}>
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="text-sm text-gray-600 underline mt-2 inline-block">View Size Guide</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <button className="text-gray-500 hover:text-gray-900">Clear</button>
                <Badge variant="default" className="bg-green-100 text-green-700">In Stock</Badge>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Minus size={16} /></button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3"><Plus size={16} /></button>
              </div>
              <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1 bg-brand-dark-brown hover:bg-gray-800">Add To Cart</Button>
              <Button variant="outline" size="lg" onClick={() => {}} className="flex-1 bg-brand-tan text-white border-brand-tan hover:bg-opacity-90">Buy Now</Button>
              <Button variant="outline" size="lg" onClick={handleToggleWishlist}><Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} /></Button>
            </div>
            <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
                <div className="flex items-center gap-3">
                    <strong>Share:</strong>
                    <div className="flex items-center gap-2">
                        <a href="#" className="text-gray-500 hover:text-gray-900"><Share2 size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900"><Share2 size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900"><Share2 size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900"><Share2 size={18} /></a>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'additional information', 'review'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-montserrat font-medium capitalize ${activeTab === tab ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'review' && <ProductReviews productId={product.id} />}
            {activeTab === 'description' && <p>{product.description}</p>}
          </div>
        </div>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
};
