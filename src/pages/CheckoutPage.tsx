import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, MapPin, User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const { state } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: state.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const steps = [
    { id: 1, title: 'Information', icon: <User size={18} /> },
    { id: 2, title: 'Shipping', icon: <MapPin size={18} /> },
    { id: 3, title: 'Payment', icon: <CreditCard size={18} /> },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-bold font-montserrat mb-8">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id
                        ? 'bg-primary-black border-primary-black text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`ml-2 font-montserrat font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-px mx-4 ${
                        currentStep > step.id ? 'bg-primary-black' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-luxury p-8">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold font-montserrat mb-4">Contact Information</h2>
                  
                  <Input
                    label="Email address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                    <Input
                      label="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold font-montserrat mb-4">Shipping Address</h2>
                  
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    required
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold font-montserrat mb-4">Payment Information</h2>
                  
                  <Input
                    label="Card number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                  
                  <Input
                    label="Name on card"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    required
                  />

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock size={16} />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button variant="primary" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button variant="gold" size="lg">
                    Complete Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-luxury p-8 sticky top-8">
              <h2 className="text-xl font-bold font-montserrat mb-6">Order Summary</h2>
              
              {/* Order items would go here */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$459.97</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$36.80</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$496.77</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600 mb-4">Secure checkout powered by:</p>
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} />
                    <span className="font-semibold">Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} />
                    <span className="font-semibold">SSL Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
