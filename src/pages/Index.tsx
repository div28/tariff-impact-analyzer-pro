import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import TariffCalculator from '@/components/TariffCalculator';
import { HowItWorksSection, DataSourcesSection, FAQSection, FooterSection } from '@/components/ProfessionalSections';

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
      
      {/* Professional Content Sections */}
      <HowItWorksSection />
      <DataSourcesSection />
      <FAQSection />
      
      {/* Professional Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;
