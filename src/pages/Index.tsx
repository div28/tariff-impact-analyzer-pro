import React from 'react';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Calculate Your Tariff Impact
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how Trump's tariffs affect your business costs
          </p>
        </div>
        
        <SimpleTariffCalculator />
      </div>
    </div>
  );
};

export default Index;
