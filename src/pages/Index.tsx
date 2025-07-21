import React, { useRef, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import TariffCalculator from '@/components/TariffCalculator';
import { HowItWorksSection, DataSourcesSection, FAQSection, FooterSection } from '@/components/ProfessionalSections';
import { TimelineAwareness } from '@/components/EnterpriseFeatures';
import { PWAInstallPrompt, registerSW } from '@/components/PWAFeatures';

const Index = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register service worker for PWA functionality
    registerSW();
  }, []);

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
      
      {/* Timeline Awareness Section */}
      <section className="py-8 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-6">
          <TimelineAwareness />
        </div>
      </section>

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
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
