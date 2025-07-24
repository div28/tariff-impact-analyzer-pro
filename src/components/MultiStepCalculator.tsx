import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import BusinessProfileStep from './BusinessProfileStep';
import ImportDetailsStep from './ImportDetailsStep';
import BusinessModelStep from './BusinessModelStep';
import ResultsDashboard from './ResultsDashboard';

interface FormData {
  // Step 1: Business Profile
  businessType: string;
  productCategory: string;
  primaryConcern: string;
  
  // Step 2: Import Details
  productCost: string;
  quantity: string;
  countryOfOrigin: string;
  shippingCost: string;
  productWeight: string;
  
  // Step 3: Business Model
  sellingPrice: string;
  profitMargin: number;
  priceSensitivity: string;
  annualVolume: string;
  monthlyRevenue: string;
}

const initialFormData: FormData = {
  businessType: '',
  productCategory: '',
  primaryConcern: '',
  productCost: '',
  quantity: '',
  countryOfOrigin: '',
  shippingCost: '',
  productWeight: '',
  sellingPrice: '',
  profitMargin: 0,
  priceSensitivity: '',
  annualVolume: '',
  monthlyRevenue: ''
};

const steps = [
  'Business Profile',
  'Import Details', 
  'Business Model',
  'Results'
];

const countries = [
  { code: 'CN', name: 'China', tariffRate: 25 },
  { code: 'MX', name: 'Mexico', tariffRate: 0 },
  { code: 'VN', name: 'Vietnam', tariffRate: 10 },
  { code: 'IN', name: 'India', tariffRate: 15 },
  { code: 'TW', name: 'Taiwan', tariffRate: 20 },
  { code: 'KR', name: 'South Korea', tariffRate: 8 },
  { code: 'TH', name: 'Thailand', tariffRate: 12 },
  { code: 'DE', name: 'Germany', tariffRate: 5 },
  { code: 'JP', name: 'Japan', tariffRate: 3 },
  { code: 'IT', name: 'Italy', tariffRate: 6 }
];

const MultiStepCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const restartCalculator = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  // Validation functions
  const isStep1Valid = (): boolean => {
    return !!(formData.businessType && formData.productCategory && formData.primaryConcern);
  };

  const isStep2Valid = (): boolean => {
    return !!(formData.productCost && formData.quantity && formData.countryOfOrigin);
  };

  const isStep3Valid = (): boolean => {
    return !!(formData.sellingPrice && formData.priceSensitivity && formData.monthlyRevenue);
  };

  // Get results data
  const getResultsData = () => {
    const selectedCountry = countries.find(c => c.code === formData.countryOfOrigin);
    return {
      productCost: parseFloat(formData.productCost || '0'),
      sellingPrice: parseFloat(formData.sellingPrice || '0'),
      quantity: parseFloat(formData.quantity || '0'),
      tariffRate: selectedCountry?.tariffRate || 0,
      countryName: selectedCountry?.name || '',
      profitMargin: formData.profitMargin,
      priceSensitivity: formData.priceSensitivity,
      monthlyRevenue: parseFloat(formData.monthlyRevenue || '0')
    };
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentStep < 4 && (
          <ProgressIndicator 
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
          />
        )}

        {currentStep === 1 && (
          <BusinessProfileStep
            data={{
              businessType: formData.businessType,
              productCategory: formData.productCategory,
              primaryConcern: formData.primaryConcern
            }}
            onUpdate={updateFormData}
            onNext={nextStep}
            isValid={isStep1Valid()}
          />
        )}

        {currentStep === 2 && (
          <ImportDetailsStep
            data={{
              productCost: formData.productCost,
              quantity: formData.quantity,
              countryOfOrigin: formData.countryOfOrigin,
              shippingCost: formData.shippingCost,
              productWeight: formData.productWeight
            }}
            onUpdate={updateFormData}
            onNext={nextStep}
            onPrevious={previousStep}
            isValid={isStep2Valid()}
          />
        )}

        {currentStep === 3 && (
          <BusinessModelStep
            data={{
              sellingPrice: formData.sellingPrice,
              profitMargin: formData.profitMargin,
              priceSensitivity: formData.priceSensitivity,
              annualVolume: formData.annualVolume,
              monthlyRevenue: formData.monthlyRevenue
            }}
            onUpdate={updateFormData}
            onNext={nextStep}
            onPrevious={previousStep}
            isValid={isStep3Valid()}
            productCost={parseFloat(formData.productCost || '0')}
          />
        )}

        {currentStep === 4 && (
          <ResultsDashboard
            data={getResultsData()}
            onRestart={restartCalculator}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepCalculator;