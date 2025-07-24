import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MultiStepCalculator from '@/components/MultiStepCalculator';
import HTSCodeAssistant from '@/components/HTSCodeAssistant';
import MixedShipmentAnalyzer from '@/components/MixedShipmentAnalyzer';
import { FAQSection } from '@/components/ProfessionalSections';

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
      
      {/* Essential Tools Section - Move key features up */}
      <section id="tools" className="py-12 bg-gradient-to-br from-muted/10 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-primary">Additional Tools</h2>
            <p className="text-sm text-muted-foreground">
              HTS code lookup and shipment analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <HTSCodeAssistant />
            <MixedShipmentAnalyzer />
          </div>
        </div>
      </section>
      
      <FAQSection />
      
      {/* Simple Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-lg">TariffPro Calculator</h3>
              <p className="text-primary-foreground/80 text-sm">
                Estimate tariff impact on your business
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <button 
                onClick={() => document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-accent transition-colors"
              >
                Tools
              </button>
              <button 
                onClick={() => document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-accent transition-colors"
              >
                FAQ
              </button>
              <a href="mailto:support@tariffpro.com" className="hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-xs text-primary-foreground/70">
            <p>© 2024 TariffPro Calculator. Data from USTR. For informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;