import React, { useState } from 'react';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Zap, HelpCircle, TrendingUp, DollarSign, Star } from 'lucide-react';
import successHeroBg from '@/assets/success-hero-bg.jpg';

const Index = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${successHeroBg})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        {/* Premium Hero Section */}
        <div className="text-center mb-8">
          {/* Success Indicators */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-white/90 text-sm font-medium">Save Money</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-white/90 text-sm font-medium">Increase Profits</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-white/90 text-sm font-medium">Stay Competitive</div>
            </div>
          </div>

          {/* Premium Visual Impact */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-4 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="text-center">
                <div className="text-lg font-semibold text-white/80">Current Cost</div>
                <div className="text-2xl font-bold text-white">$100K</div>
              </div>
              <div className="text-yellow-400 text-3xl animate-pulse">⚡</div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white/80">With Tariffs</div>
                <div className="text-2xl font-bold text-red-400">$135K</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/80 to-orange-500/80 rounded-full border border-red-400/50">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">+35% Impact</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Trump Tariff Impact
            </span>
            <br />
            <span className="text-white">Calculator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-200 mb-4 font-light">
            Turn tariff challenges into competitive advantages
          </p>

          {/* Premium Context Alert */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xl p-4 mb-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
              <span className="text-amber-200 font-semibold">URGENT: August 1st Deadline</span>
            </div>
            <p className="text-amber-100 text-sm">
              Smart importers are already adapting. Calculate your impact and discover profit-protecting strategies.
            </p>
          </div>

          {/* Premium Social Proof */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Results in 30 seconds</span>
            </div>
            <div className="text-white/40">•</div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Trusted by 1,200+ businesses</span>
            </div>
          </div>
        </div>
        
        {/* Premium Calculator */}
        <SimpleTariffCalculator />

        {/* Enhanced First-Time User Help */}
        <div className="mt-8">
          <Collapsible open={showHelp} onOpenChange={setShowHelp}>
            <CollapsibleTrigger className="flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium text-sm mx-auto">
              <HelpCircle className="w-4 h-4" />
              New to tariff strategy?
              <ChevronDown className={`w-4 h-4 transition-transform ${showHelp ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 space-y-4 backdrop-blur-md">
                <h3 className="font-semibold text-blue-200 mb-3">Turn Challenges Into Opportunities:</h3>
                <div className="space-y-3 text-sm text-blue-100">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px] text-yellow-400">1.</span>
                    <span>Identify your exact cost impact with precision</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px] text-yellow-400">2.</span>
                    <span>Get AI-powered strategies to reduce costs and protect margins</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px] text-yellow-400">3.</span>
                    <span>Stay ahead of competitors with actionable insights</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                  <p className="text-xs text-blue-200">
                    <strong>💡 Pro Tip:</strong> Most successful importers save 20-40% on tariff impact through strategic planning.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Premium Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-center gap-2 items-center mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-white/60">Official USTR.gov data</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-xs text-white/40">
            Enterprise-grade calculations for business planning
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
