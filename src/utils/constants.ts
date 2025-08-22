export const BRAND_COLORS = {
  black: '#000000',
  white: '#ffffff',
  gold: '#FFD700',
  red: '#FF0000',
} as const;

export const MEMBERSHIP_TIERS = {
  Silver: { minPoints: 0, color: '#C0C0C0', perks: ['Free shipping over $100'] },
  Gold: { minPoints: 1000, color: '#FFD700', perks: ['Free shipping', '10% discount'] },
  Platinum: { minPoints: 5000, color: '#E5E4E2', perks: ['Free shipping', '15% discount', 'Early access'] },
  Elite: { minPoints: 10000, color: '#000000', perks: ['Free shipping', '20% discount', 'VIP access', 'Personal stylist'] },
} as const;

export const PRODUCT_CATEGORIES = [
  'Clothing',
  'Accessories',
  'Shoes',
  'Bags',
  'Jewelry',
  'Beauty',
  'Home & Lifestyle',
  'AI Exclusive',
] as const;

export const AI_STYLES = [
  'Minimalist',
  'Futuristic',
  'Vintage',
  'Streetwear',
  'Luxury',
  'Bohemian',
  'Gothic',
  'Avant-garde',
] as const;
