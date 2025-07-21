import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calculator, TrendingDown } from 'lucide-react';
import heroImage from '@/assets/hero-tariff.jpg';

interface HeroSectionProps {
  onScrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToCalculator }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/90" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        {/* Alert Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/20 border border-warning/30 rounded-full mb-6">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="text-sm font-medium text-warning">2025 Tariff Updates</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Trump Tariff Impact
          <span className="block text-accent">Calculator</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
          Calculate how new <span className="text-warning font-semibold">2025 tariffs</span> will affect your business in 
          <span className="text-accent font-semibold"> 60 seconds</span>
        </p>

        {/* Feature Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <Calculator className="h-8 w-8 text-accent mb-2" />
            <span className="text-lg font-medium">Instant Calculations</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingDown className="h-8 w-8 text-warning mb-2" />
            <span className="text-lg font-medium">Real Cost Impact</span>
          </div>
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
            <span className="text-lg font-medium">Business Planning</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6 text-white"
            onClick={onScrollToCalculator}
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate Your Impact Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
          >
            Learn About Tariffs
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-sm text-gray-300 mb-4">Trusted by businesses importing from:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span className="px-3 py-1 bg-white/10 rounded-full">China (30% tariff)</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Mexico (25% tariff)</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Germany (40% tariff)</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Japan (24% tariff)</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">South Korea (35% tariff)</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Calculate Below</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;