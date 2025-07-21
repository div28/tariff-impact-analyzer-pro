import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Database, HelpCircle, Shield, ExternalLink, BarChart3 } from 'lucide-react';

export const HowItWorksSection = () => (
  <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">How Our Calculator Works</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional-grade calculations using official tariff data and proven methodology
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Visual Process Flow */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-warning to-success transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Calculator className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Input Your Data</h3>
              <p className="text-muted-foreground mb-4">
                Enter your business type, import volumes, and source countries
              </p>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="text-sm text-primary font-semibold">Example:</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Electronics • $100K monthly • China + Germany
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center shadow-lg">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Our algorithm processes official tariff rates with weighted averages
              </p>
              <div className="bg-warning/5 rounded-lg p-4">
                <div className="text-sm text-warning font-semibold">Calculation:</div>
                <div className="text-xs text-muted-foreground mt-1">
                  $100K × 35% avg tariff = $35K monthly impact
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategic Insights</h3>
              <p className="text-muted-foreground mb-4">
                Get AI-powered recommendations and alternative supplier suggestions
              </p>
              <div className="bg-success/5 rounded-lg p-4">
                <div className="text-sm text-success font-semibold">Recommendations:</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Consider Vietnam (20% tariff) as alternative
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-3 text-primary">Official Data Sources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  USTR trade policy announcements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Commerce Department statistics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  CBP tariff schedules
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-3 text-success">Proven Methodology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Weighted average calculations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Conservative business estimates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Real-time updates from sources
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

export const DataSourcesSection = () => (
  <section className="py-16 bg-gradient-to-br from-background to-muted/20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">Calculation Methodology</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent calculations based on official government data and proven formulas
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Formula Breakdown */}
        <div className="bg-gradient-to-r from-card to-muted/10 rounded-2xl p-8 border-2 border-primary/10">
          <h3 className="text-2xl font-bold mb-6 text-center">Core Calculation Formula</h3>
          <div className="bg-white rounded-xl p-6 shadow-inner border">
            <div className="text-center space-y-4">
              <div className="text-lg font-semibold text-primary">Monthly Tariff Impact</div>
              <div className="text-3xl font-mono bg-primary/5 rounded-lg p-4 border-2 border-primary/20">
                Import Value × Tariff Rate = Additional Cost
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-700">Example Input</div>
                  <div className="text-muted-foreground mt-1">$100,000 monthly imports</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">China Tariff</div>
                  <div className="text-muted-foreground mt-1">30% rate announced</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-700">Result</div>
                  <div className="text-muted-foreground mt-1">$30,000 additional cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Database className="h-5 w-5" />
                Official Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="font-medium text-sm">USTR.gov</div>
                <div className="text-xs text-muted-foreground">Official tariff announcements and trade policy</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Commerce Department</div>
                <div className="text-xs text-muted-foreground">International trade statistics</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">CBP.gov</div>
                <div className="text-xs text-muted-foreground">Customs and border protection data</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Shield className="h-5 w-5" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="font-medium text-sm">Weighted Averages</div>
                <div className="text-xs text-muted-foreground">Accounts for multiple country imports</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Conservative Estimates</div>
                <div className="text-xs text-muted-foreground">Uses midpoint values for ranges</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Real-time Updates</div>
                <div className="text-xs text-muted-foreground">Based on latest announcements</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <BarChart3 className="h-5 w-5" />
                Key Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="font-medium text-sm">Import Ranges</div>
                <div className="text-xs text-muted-foreground">Midpoint calculations for estimates</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">Standard Products</div>
                <div className="text-xs text-muted-foreground">Assumes typical HS classifications</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm">USD Calculations</div>
                <div className="text-xs text-muted-foreground">Exchange rates not factored</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accuracy Note */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Database className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-amber-800">Data Accuracy</span>
          </div>
          <p className="text-sm text-amber-700 max-w-2xl mx-auto">
            Our calculations are based on official tariff announcements as of July 2025. 
            For final business decisions, always consult with trade professionals and verify current rates.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const FAQSection = () => {
  const faqs = [
    {
      question: "How accurate are these calculations?",
      answer: "Based on official tariff rates. Results are estimates for planning purposes - consult trade professionals for final decisions."
    },
    {
      question: "When do tariffs take effect?",
      answer: "Implementation begins August 1, 2025. Check official sources for latest updates."
    },
    {
      question: "What should I do with these results?",
      answer: "Use them to understand potential impact and start planning. Consider consulting trade advisors for detailed strategy."
    }
  ];

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-primary">Quick Questions</h2>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-muted">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-sm">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FooterSection = () => (
  <footer className="bg-slate-900 text-white py-8">
    <div className="container mx-auto px-6 text-center">
      <h3 className="text-lg font-bold mb-2">Trump Tariff Calculator</h3>
      <p className="text-slate-300 text-sm mb-4">
        Get quick estimates of tariff impact on your business
      </p>
      <p className="text-xs text-slate-500">
        Disclaimer: Estimates for planning purposes. Consult trade professionals for business decisions.
      </p>
    </div>
  </footer>
);