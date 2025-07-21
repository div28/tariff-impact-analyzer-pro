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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      {/* Live Badge */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          🔴 LIVE: 2025 TARIFF CALCULATOR
        </div>
      </div>

      {/* Tariff Implementation Status - Running Countdown */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Tariffs Active: {timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Trump Tariff Impact Calculator
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Enterprise-grade analysis of <span className="text-amber-300 font-semibold">2025 tariff impacts</span> on your supply chain.
          </p>
          <p className="text-lg text-blue-200 mb-12">
            Instant insights. Strategic planning. Professional results.
          </p>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-blue-200 mb-8">Get your tariff impact analysis in 3 simple steps</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Enter Details</h3>
                <p className="text-blue-200 text-sm">Quick 30-second form with your business info</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Instant Analysis</h3>
                <p className="text-blue-200 text-sm">See your exact cost impact immediately</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Smart Solutions</h3>
                <p className="text-blue-200 text-sm">Get AI-powered recommendations to save money</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Based on official USTR.gov tariff rates - Updated July 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Your data stays private - calculations happen in your browser</span>
            </div>
          </div>

          <div className="bg-amber-500/20 border border-amber-300/30 rounded-lg px-4 py-2 inline-block mb-12">
            <span className="text-amber-200 text-sm">⭐ 1,200+ businesses calculated their impact this month</span>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Analysis</h3>
              <p className="text-blue-200 text-sm">Real-time calculations with enterprise-grade accuracy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cost Modeling</h3>
              <p className="text-blue-200 text-sm">Comprehensive financial impact across all import categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Strategic Planning</h3>
              <p className="text-blue-200 text-sm">Data-driven insights for supply chain optimization</p>
            </div>
          </div>
        </div>

        {/* What You'll Discover */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What You'll Discover</h2>
          <div className="grid md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-white mb-1 text-sm">Exact Financial Impact</h3>
              <p className="text-xs text-blue-200">Precise cost increases in dollars and percentages</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="font-semibold text-white mb-1 text-sm">Alternative Suppliers</h3>
              <p className="text-xs text-blue-200">Countries with lower tariff rates for your products</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold text-white mb-1 text-sm">Strategic Timing</h3>
              <p className="text-xs text-blue-200">Should you order before Aug 1st deadline?</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-white mb-1 text-sm">Money-Saving Strategies</h3>
              <p className="text-xs text-blue-200">Custom recommendations for your business type</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📄</div>
              <h3 className="font-semibold text-white mb-1 text-sm">Shareable Summary</h3>
              <p className="text-xs text-blue-200">Professional report for your team or investors</p>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <SimpleTariffCalculator />
        </div>

        {/* FAQ Section - Merged */}
        <div className="mb-8">
          <Collapsible open={showFAQ} onOpenChange={setShowFAQ}>
            <CollapsibleTrigger className="flex items-center justify-center gap-2 text-white hover:text-blue-200 font-semibold text-lg w-full mb-4">
              <ChevronDown className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-180' : ''}`} />
              Frequently Asked Questions
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">How accurate are these calculations?</h4>
                  <p className="text-sm text-blue-200">
                    Our calculations use official USTR.gov tariff rates and current exchange rates from the Federal Reserve. 
                    Actual impacts may vary based on specific HS codes and trade agreements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What should I do with these results?</h4>
                  <p className="text-sm text-blue-200">
                    Use these estimates for strategic planning. Consider the AI recommendations for supplier diversification, 
                    inventory management, and pricing strategies. Consult trade professionals for compliance decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">How can I reduce my tariff impact?</h4>
                  <p className="text-sm text-blue-200">
                    Common strategies include supplier diversification to lower-tariff countries, strategic inventory buildup, 
                    renegotiating supplier terms, and adjusting pricing to maintain margins.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Is my data stored or shared?</h4>
                  <p className="text-sm text-blue-200">
                    No. All calculations happen in your browser. We don't store, track, or share any business information you enter.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Calculation Methodology */}
        <div className="text-center mb-8">
          <p className="text-blue-200">
            Your costs increase 27.5% due to new tariff rates on imports from China and Mexico.
          </p>
        </div>

        {/* Official Data Sources - Vertical */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Official Data Sources</h3>
          <div className="space-y-3">
            <a 
              href="https://ustr.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200">USTR.gov - Tariff Schedules</span>
            </a>
            <a 
              href="https://federalreserve.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200">Federal Reserve - Exchange Rates</span>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-blue-300 border-t border-white/20 pt-6">
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
