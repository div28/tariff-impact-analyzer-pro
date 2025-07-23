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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tariff Impact Calculator
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            See how new 2025 tariffs affect your import costs
          </p>
          
          {/* Brief Context */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-blue-100">
              New tariffs take effect August 1st. Calculate your business impact and find alternatives.
            </p>
          </div>

          {/* What You'll Discover */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What You'll Discover</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Exact Cost Impact</h3>
                <p className="text-sm text-blue-100">Precise calculations based on your import patterns</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">AI-Powered Strategies</h3>
                <p className="text-sm text-blue-100">Smart recommendations to protect your margins</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Interactive Analysis</h3>
                <p className="text-sm text-blue-100">Visual breakdown of costs and alternatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <SimpleTariffCalculator />

        {/* FAQ Section - Merged */}
        <div className="mt-8">
          <Collapsible open={showFAQ} onOpenChange={setShowFAQ}>
            <CollapsibleTrigger className="flex items-center gap-2 text-white hover:text-blue-100 font-semibold text-lg w-full">
              <ChevronDown className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
              Frequently Asked Questions
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">How accurate are these calculations?</h4>
                  <p className="text-sm text-blue-100">
                    Our calculations use official USTR.gov tariff rates and current exchange rates from the Federal Reserve. 
                    Actual impacts may vary based on specific HS codes and trade agreements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What should I do with these results?</h4>
                  <p className="text-sm text-blue-100">
                    Use these estimates for strategic planning. Consider the AI recommendations for supplier diversification, 
                    inventory management, and pricing strategies. Consult trade professionals for compliance decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">How can I reduce my tariff impact?</h4>
                  <p className="text-sm text-blue-100">
                    Common strategies include supplier diversification to lower-tariff countries, strategic inventory buildup, 
                    renegotiating supplier terms, and adjusting pricing to maintain margins.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Is my data stored or shared?</h4>
                  <p className="text-sm text-blue-100">
                    No. All calculations happen in your browser. We don't store, track, or share any business information you enter.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Calculation Methodology */}
        <div className="mt-8 text-center">
          <p className="text-blue-100 text-center">
            Your costs increase 27.5% due to new tariff rates on imports from China and Mexico.
          </p>
        </div>

        {/* Official Data Sources - Vertical */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Official Data Sources</h3>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://ustr.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-200" />
              <span className="text-blue-100 text-sm">USTR.gov - Tariff Schedules</span>
            </a>
            <a 
              href="https://federalreserve.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-200" />
              <span className="text-blue-100 text-sm">Federal Reserve - Exchange Rates</span>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-blue-200 border-t border-white/20 pt-6">
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
