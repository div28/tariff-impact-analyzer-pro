import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';

const Index = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection onScrollToCalculator={scrollToCalculator} />

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <SimpleTariffCalculator />
        </div>
      </section>
    </div>
  );
};

export default Index;
