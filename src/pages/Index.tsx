import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MultiStepCalculator from '@/components/MultiStepCalculator';
import { TariffInsuranceCalculator } from '@/components/AdvancedFeatures';
import { ExportReports } from '@/components/ExportReports';
import HTSCodeAssistant from '@/components/HTSCodeAssistant';
import MixedShipmentAnalyzer from '@/components/MixedShipmentAnalyzer';
import { ScenarioComparison } from '@/components/ScenarioComparison';
import { QuickCalculateMode, CalculationHistory } from '@/components/UserExperienceFeatures';
import { HowItWorksSection, DataSourcesSection, FAQSection } from '@/components/ProfessionalSections';

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
      
      {/* Advanced Features Sections */}
      <HowItWorksSection />
      <DataSourcesSection />
      
      {/* Professional Tools Section */}
      <section className="py-16 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">Professional Tools & Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced capabilities for professional tariff analysis and business planning
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <QuickCalculateMode onQuickCalculate={() => {}} />
              <CalculationHistory />
            </div>
            <div className="space-y-6">
              <HTSCodeAssistant />
              <MixedShipmentAnalyzer />
            </div>
          </div>
        </div>
      </section>
      
      <FAQSection />
      
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