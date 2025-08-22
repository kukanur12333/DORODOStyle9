import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/organisms/Header';
import { Footer } from './components/molecules/Footer';
import { TopBar } from './components/organisms/TopBar';
import { Preloader } from './components/organisms/Preloader';
import { CommandPalette } from './components/organisms/CommandPalette';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { UserDashboard } from './pages/UserDashboard';
import { WishlistPage } from './pages/WishlistPage';
import { CommunityPage } from './pages/CommunityPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { MembershipPage } from './pages/MembershipPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

// Context
import { AppProvider, useApp } from './context/AppContext';

// This component handles the conditional rendering of layouts
const PageLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Render only the auth pages without the main header and footer
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    );
  }

  // Render the main application layout
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ai-studio" element={<AIStudioPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/orders" element={<OrderTrackingPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const AppContent: React.FC = () => {
  const { dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [dispatch]);

  return (
    <>
      <CommandPalette />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="min-h-screen bg-white">
              <PageLayout />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
