import React from 'react';
import { HeroSection } from '../components/organisms/HeroSection';
import { FeaturedCategories } from '../components/organisms/FeaturedCategories';
import { TrendingProducts } from '../components/organisms/TrendingProducts';
import { AIShowcase } from '../components/organisms/AIShowcase';
import { OfferTimer } from '../components/organisms/OfferTimer';
import { MembershipBenefits } from '../components/organisms/MembershipBenefits';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <AIShowcase />
      <OfferTimer />
      <MembershipBenefits />
    </>
  );
};
