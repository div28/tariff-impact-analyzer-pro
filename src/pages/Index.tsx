import React, { useRef, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import TariffCalculator from '@/components/TariffCalculator';
import { HowItWorksSection, DataSourcesSection, FAQSection, FooterSection } from '@/components/ProfessionalSections';
import { PWAInstallPrompt, registerSW } from '@/components/PWAFeatures';
import { MethodologySection } from '@/components/UserExperienceFeatures';

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

      {/* Calculator Section */}
      <section ref={calculatorRef} className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto">
          <TariffCalculator />
        </div>
      </section>
      
      {/* Simple FAQ Section */}
      <FAQSection />
      
      {/* Professional Footer */}
      <FooterSection />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
