import React, { useState } from 'react';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Zap, HelpCircle } from 'lucide-react';

const Index = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Hero Section with Context */}
        <div className="text-center mb-8">
          {/* Visual Impact Indicator */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-600">Before</div>
                <div className="text-2xl font-bold text-slate-900">$100K</div>
              </div>
              <div className="text-red-500 text-2xl">→</div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-600">After</div>
                <div className="text-2xl font-bold text-red-600">$135K</div>
              </div>
            </div>
            <p className="text-sm text-red-600 font-medium">+35% typical increase</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Trump Tariff Impact Calculator
          </h1>
          
          <p className="text-xl text-slate-600 mb-4">
            See how new 2025 tariffs affect your import costs
          </p>

          {/* Brief Context */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 font-medium mb-1">
              Trump&apos;s tariffs take effect August 1st, 2025.
            </p>
            <p className="text-amber-700">
              Calculate your business impact and find alternatives.
            </p>
          </div>

          {/* Quick Demo & Helper */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <div className="text-sm text-slate-500 flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Takes 30 seconds
            </div>
            <div className="text-slate-300">•</div>
            <div className="text-sm text-slate-500">
              Used by 500+ businesses
            </div>
          </div>
        </div>
        
        {/* Calculator */}
        <SimpleTariffCalculator />

        {/* First-Time User Help */}
        <div className="mt-8">
          <Collapsible open={showHelp} onOpenChange={setShowHelp}>
            <CollapsibleTrigger className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mx-auto">
              <HelpCircle className="w-4 h-4" />
              New to tariff calculations?
              <ChevronDown className={`w-4 h-4 transition-transform ${showHelp ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-blue-900 mb-3">How it works:</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px]">1.</span>
                    <span>Tell us what you import and from which countries</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px]">2.</span>
                    <span>We calculate the exact tariff impact using official rates</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[20px]">3.</span>
                    <span>Get specific recommendations to reduce costs</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded">
                  <p className="text-xs text-blue-700">
                    <strong>Not sure of exact numbers?</strong> Estimates work fine. Most importers see 15-40% cost increases.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Data: USTR.gov July 2025 • For planning purposes only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
