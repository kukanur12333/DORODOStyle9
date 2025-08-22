import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Share2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '/shop' },
        { label: 'Clothing', href: '/shop' },
        { label: 'Accessories', href: '/shop' },
        { label: 'AI Collection', href: '/ai-studio' },
        { label: 'Sale', href: '/shop' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'AI Studio', href: '/ai-studio' },
        { label: 'Membership', href: '/membership' },
        { label: 'Community', href: '/community' },
        { label: 'Gift Cards', href: '#' },
        { label: 'VIP Membership', href: '/membership' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping & Returns', href: '/faq' },
        { label: 'Track Order', href: '/orders' },
        { label: 'Help Center', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Sustainability', href: '/about' },
        { label: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Share2 size={20} />, href: '#', label: 'Instagram' },
    { icon: <Share2 size={20} />, href: '#', label: 'Twitter' },
    { icon: <Share2 size={20} />, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-primary-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-primary-gold" size={24} />
              <h3 className="text-2xl font-bold font-montserrat">Stay in Style</h3>
            </div>
            <p className="text-gray-400 mb-6 font-poppins">
              Get exclusive access to new AI-generated collections, luxury drops, and member-only offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1"
              />
              <Button variant="gold" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/">
              <motion.div
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-gold to-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-black font-bold text-sm">D</span>
                </div>
                <span className="font-montserrat font-bold text-xl">
                  DORODOStyle
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6 font-poppins">
              Luxury AI-powered fashion platform redefining style with cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 border border-gray-700 rounded-full hover:border-primary-gold hover:text-primary-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat font-semibold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-gold transition-colors font-poppins"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary-gold" />
              <span className="font-poppins">support@dorodostyle.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-primary-gold" />
              <span className="font-poppins">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-primary-gold" />
              <span className="font-poppins">New York, NY 10001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="font-poppins">
              © 2025 DORODOStyle. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-primary-gold transition-colors">
                Terms & Conditions
              </Link>
              <Link to="#" className="hover:text-primary-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-primary-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
