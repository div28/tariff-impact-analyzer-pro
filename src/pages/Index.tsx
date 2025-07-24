import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MultiStepCalculator from '@/components/MultiStepCalculator';

const Index: React.FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onGetStarted={scrollToCalculator} />
      <HeroSection onStartCalculator={scrollToCalculator} />
      
      <div ref={calculatorRef}>
        <MultiStepCalculator />
      </div>
      
      {/* Footer placeholder for trust elements, disclaimers, etc. */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">TariffPro Calculator</h3>
              <p className="text-primary-foreground/80 text-sm">
                Professional tariff impact analysis for businesses worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Industry Guides</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Expert Consultation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Disclaimers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            <p>© 2024 TariffPro Calculator. Data sourced from USTR and Federal Reserve. For informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;