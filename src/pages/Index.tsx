import React from 'react';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-red-600 font-bold text-4xl mb-2">
              ↗️ <span>35%</span>
            </div>
            <p className="text-sm text-slate-500">Average cost increase</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Trump Tariff Impact Calculator
          </h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Know your exact cost increase in 30 seconds
          </p>
        </div>
        
        {/* Calculator */}
        <SimpleTariffCalculator />
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Data: USTR.gov July 2025 • For planning purposes only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
