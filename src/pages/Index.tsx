import React, { useState, useEffect } from 'react';
import SimpleTariffCalculator from '@/components/SimpleTariffCalculator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Clock, Target, Lightbulb, ExternalLink, PlayCircle } from 'lucide-react';

const Index = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // Countdown to August 1st, 2025
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date('2025-08-01T00:00:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        setTimeLeft('Active');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Tariff Implementation Status - Running Countdown */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Tariffs Active: {timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* What You'll Discover - Top Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Trump Tariff Impact Calculator
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            See how new 2025 tariffs affect your import costs
          </p>
          
          {/* Brief Context */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-amber-800">
              Trump's tariffs take effect August 1st. Calculate your business impact and find alternatives.
            </p>
          </div>

          {/* What You'll Discover */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Discover</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Exact Cost Impact</h3>
                <p className="text-sm text-slate-600">Precise calculations based on your import patterns</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">AI-Powered Strategies</h3>
                <p className="text-sm text-slate-600">Smart recommendations to protect your margins</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Interactive Analysis</h3>
                <p className="text-sm text-slate-600">Visual breakdown of costs and alternatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <SimpleTariffCalculator />

        {/* FAQ Section - Merged */}
        <div className="mt-8">
          <Collapsible open={showFAQ} onOpenChange={setShowFAQ}>
            <CollapsibleTrigger className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-lg w-full">
              <ChevronDown className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
              Frequently Asked Questions
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">How accurate are these calculations?</h4>
                  <p className="text-sm text-slate-600">
                    Our calculations use official USTR.gov tariff rates and current exchange rates from the Federal Reserve. 
                    Actual impacts may vary based on specific HS codes and trade agreements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">What should I do with these results?</h4>
                  <p className="text-sm text-slate-600">
                    Use these estimates for strategic planning. Consider the AI recommendations for supplier diversification, 
                    inventory management, and pricing strategies. Consult trade professionals for compliance decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">How can I reduce my tariff impact?</h4>
                  <p className="text-sm text-slate-600">
                    Common strategies include supplier diversification to lower-tariff countries, strategic inventory buildup, 
                    renegotiating supplier terms, and adjusting pricing to maintain margins.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Is my data stored or shared?</h4>
                  <p className="text-sm text-slate-600">
                    No. All calculations happen in your browser. We don't store, track, or share any business information you enter.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Calculation Methodology */}
        <div className="mt-8 text-center">
          <p className="text-slate-700">
            Your costs increase 27.5% due to new tariff rates on imports from China and Mexico.
          </p>
        </div>

        {/* Official Data Sources - Vertical */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Official Data Sources</h3>
          <div className="space-y-3">
            <a 
              href="https://ustr.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">USTR.gov - Tariff Schedules</span>
            </a>
            <a 
              href="https://federalreserve.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">Federal Reserve - Exchange Rates</span>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-slate-500 border-t pt-6">
          <p>
            This calculator provides estimates based on announced policy proposals. 
            Actual tariff impacts may vary. Consult trade professionals for specific guidance.
          </p>
          <p className="mt-2">
            Data sources: U.S. Trade Representative, Federal Reserve Economic Data
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
