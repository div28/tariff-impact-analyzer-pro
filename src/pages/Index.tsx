import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import TariffCalculator from '@/components/TariffCalculator';

const Index = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onScrollToCalculator={scrollToCalculator} />
      
      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto">
          <TariffCalculator />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2025 Trump Tariff Impact Calculator. Educational tool for business planning.
          </p>
          <p className="text-xs opacity-75 mt-2">
            Tariff rates based on proposed 2025 policies. Consult professional advisors for business decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
