import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

interface HeroSectionProps {
  onScrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToCalculator }) => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
          Calculate Your Tariff Impact
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
          See how Trump's tariffs affect your business costs
        </p>

        <Button 
          size="lg" 
          className="px-8 py-4 text-lg"
          onClick={onScrollToCalculator}
        >
          <Calculator className="mr-2 h-5 w-5" />
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;