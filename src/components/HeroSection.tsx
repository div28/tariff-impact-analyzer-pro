import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calculator, TrendingDown, Shield, BarChart3, Target } from 'lucide-react';
import heroImage from '@/assets/premium-hero.jpg';

interface HeroSectionProps {
  onScrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToCalculator }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-primary/90 to-accent/85" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-warning/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-warning/20 to-orange-500/20 border border-warning/30 rounded-2xl mb-8 backdrop-blur-md">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-warning tracking-wide">LIVE: 2025 TARIFF CALCULATOR</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
            Trump Tariff
          </span>
          <br />
          <span className="bg-gradient-to-r from-accent-light via-accent to-primary bg-clip-text text-transparent">
            Impact Calculator
          </span>
        </h1>

        {/* Professional Subheadline */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
          Enterprise-grade analysis of <span className="font-semibold text-warning">2025 tariff impacts</span> on your supply chain.<br />
          <span className="text-accent font-medium">Instant insights. Strategic planning. Professional results.</span>
        </p>

        {/* Premium Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Analysis</h3>
            <p className="text-slate-300 text-sm">Real-time calculations with enterprise-grade accuracy</p>
          </div>
          
          <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cost Modeling</h3>
            <p className="text-slate-300 text-sm">Comprehensive financial impact across all import categories</p>
          </div>
          
          <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Strategic Planning</h3>
            <p className="text-slate-300 text-sm">Data-driven insights for supply chain optimization</p>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button 
            variant="premium" 
            size="lg" 
            className="text-lg px-10 py-6 text-white relative overflow-hidden group"
            onClick={onScrollToCalculator}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Calculator className="mr-3 h-5 w-5" />
            Calculate Impact Now
          </Button>
          
          <Button 
            variant="glass" 
            size="lg" 
            className="text-lg px-10 py-6"
          >
            <Shield className="mr-3 h-5 w-5" />
            View Methodology
          </Button>
        </div>

        {/* Trust Indicators - Premium Style */}
        <div className="pt-8">
          <p className="text-sm text-slate-400 mb-6 font-medium tracking-wide">SUPPORTING IMPORTERS FROM</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { country: 'China', rate: '30%', color: 'from-red-500 to-red-600' },
              { country: 'Mexico', rate: '25%', color: 'from-green-500 to-green-600' },
              { country: 'Germany', rate: '40%', color: 'from-yellow-500 to-yellow-600' },
              { country: 'Japan', rate: '24%', color: 'from-blue-500 to-blue-600' },
              { country: 'South Korea', rate: '35%', color: 'from-purple-500 to-purple-600' }
            ].map((item) => (
              <div key={item.country} className="group relative">
                <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                    <span className="text-white font-medium text-sm">{item.country}</span>
                    <span className="text-slate-300 text-xs">({item.rate})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="flex flex-col items-center group cursor-pointer" onClick={onScrollToCalculator}>
          <span className="text-xs mb-3 font-medium tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">CALCULATE BELOW</span>
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center group-hover:border-white/60 transition-colors">
            <div className="w-1.5 h-4 bg-gradient-to-b from-white to-transparent rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;