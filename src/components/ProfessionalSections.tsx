import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Database, HelpCircle, Shield, ExternalLink, BarChart3 } from 'lucide-react';

export const HowItWorksSection = () => (
  <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">📊 How It Works</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional-grade calculations using official tariff data and enterprise methodology
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">1. Input Business Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure your business type, import volumes, source countries, and product categories
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">2. Calculate Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our algorithm processes official tariff rates with weighted averages for precise results
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">3. Strategic Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Receive AI-powered recommendations and strategic planning insights for your business
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export const DataSourcesSection = () => (
  <section className="py-16 bg-gradient-to-br from-background to-muted/20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">🌍 Data Sources</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our calculations are based on official government announcements and trade policy documents
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Official Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span>USTR Trade Policy</span>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span>Commerce Department</span>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span>Federal Register</span>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Methodology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              • Weighted average calculations across selected countries
            </p>
            <p className="text-sm text-muted-foreground">
              • Midpoint values for import volume ranges
            </p>
            <p className="text-sm text-muted-foreground">
              • Real-time updates from official sources
            </p>
            <p className="text-sm text-muted-foreground">
              • Conservative estimates for business planning
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export const FAQSection = () => {
  const faqs = [
    {
      question: "How accurate are these calculations?",
      answer: "Our calculations use official tariff rates and conservative methodologies. Results are estimates for planning purposes."
    },
    {
      question: "When do the new tariffs take effect?",
      answer: "Based on current announcements, implementation begins August 1, 2025. Check official sources for updates."
    },
    {
      question: "Can I use this for official business planning?",
      answer: "Yes, but consult with trade professionals and legal advisors for final business decisions."
    },
    {
      question: "Are there exemptions or special cases?",
      answer: "Some products may qualify for exemptions. Check with trade authorities for specific product classifications."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">❓ Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about tariff calculations and implementation
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FooterSection = () => (
  <footer className="bg-slate-900 text-white py-12">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Trump Tariff Calculator</h3>
          <p className="text-slate-300 text-sm">
            Professional tariff impact analysis for business planning and strategic decision-making.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-white transition-colors">Methodology</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Data Sources</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-slate-300 mb-4">
            For business inquiries and support
          </p>
          <p className="text-sm text-slate-300">
            Email: info@tariffcalculator.com
          </p>
        </div>
      </div>
      
      <div className="border-t border-slate-700 mt-8 pt-8 text-center">
        <p className="text-sm text-slate-400">
          © 2025 Trump Tariff Impact Calculator. Based on announced tariff rates as of July 2025.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Disclaimer: This tool provides estimates for planning purposes. Consult professional advisors for business decisions.
        </p>
      </div>
    </div>
  </footer>
);