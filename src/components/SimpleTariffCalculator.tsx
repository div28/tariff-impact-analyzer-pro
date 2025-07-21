import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrendingUp, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, ChevronDown, Lightbulb, Zap, DollarSign, Shield, Brain, Target, ExternalLink, Globe, Star } from 'lucide-react';

interface FormData {
  imports: string;
  countries: string[];
  monthlyValue: string;
}

const countries = [
  { name: 'China', tariff: 30, flag: '🇨🇳', note: '30% tariff starting Aug 1st', risk: 'High' },
  { name: 'Germany', tariff: 40, flag: '🇩🇪', note: 'Highest rate announced', risk: 'High' },
  { name: 'Mexico', tariff: 25, flag: '🇲🇽', note: 'USMCA trade partner', risk: 'Medium' },
  { name: 'India', tariff: 20, flag: '🇮🇳', note: 'Growing alternative source', risk: 'Low' },
  { name: 'Other', tariff: 25, flag: '🌐', note: 'Average rate for other countries', risk: 'Medium' }
];

const valueRanges = [
  { label: '<$50K', value: '25000', display: 'Under $50K', context: 'Small importer' },
  { label: '$50-200K', value: '125000', display: '$50K - $200K', context: 'Medium business' },
  { label: '$200K-1M', value: '600000', display: '$200K - $1M', context: 'Large operation' },
  { label: '>$1M', value: '2000000', display: 'Over $1M', context: 'Enterprise scale' }
];

const currencies = [
  { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' }
];

const sampleScenario = {
  imports: 'electronics, computer parts, accessories',
  countries: ['China', 'Mexico'],
  monthlyValue: '125000'
};

const SimpleTariffCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    imports: '',
    countries: [],
    monthlyValue: ''
  });
  
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(true);
  const [showTimelineAnalysis, setShowTimelineAnalysis] = useState(true);
  const [showSupplierAnalysis, setShowSupplierAnalysis] = useState(true);
  const [selectedCountryNote, setSelectedCountryNote] = useState('');

  const handleCountryChange = (countryName: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        countries: [...prev.countries, countryName]
      }));
      
      // Show contextual note for first-time users
      const country = countries.find(c => c.name === countryName);
      if (country && formData.countries.length === 0) {
        setSelectedCountryNote(country.note);
        setTimeout(() => setSelectedCountryNote(''), 3000);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        countries: prev.countries.filter(c => c !== countryName)
      }));
    }
  };

  const loadSampleData = () => {
    setFormData(sampleScenario);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    const convertedAmount = amount * (currency?.rate || 1);
    return `${currency?.symbol}${convertedAmount.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`;
  };

  const generateAIRecommendations = (results: any) => {
    const hasChina = formData.countries.includes('China');
    const hasHighValueImports = results.importValue > 500000;
    const isElectronics = formData.imports.toLowerCase().includes('electron');
    
    const recommendations = [];

    if (hasChina) {
      const vietnamSavings = Math.round(results.annualTariffCost * 0.35);
      recommendations.push({
        type: 'Supplier Diversification',
        priority: 'High Impact',
        action: `Switch 60% of sourcing to Vietnam`,
        benefit: `Save $${vietnamSavings.toLocaleString()}/year`,
        timeline: '3-6 months implementation',
        difficulty: 'Complex'
      });
    }

    if (hasHighValueImports) {
      const inventorySavings = Math.round(results.monthlyTariffCost * 4);
      recommendations.push({
        type: 'Inventory Strategy',
        priority: 'Easy Win',
        action: `Pre-order 4 months inventory before Aug 1st`,
        benefit: `Avoid $${inventorySavings.toLocaleString()} in Q4 tariffs`,
        timeline: 'Order by July 15th',
        difficulty: 'Easy'
      });
    }

    if (isElectronics) {
      recommendations.push({
        type: 'Supply Chain',
        priority: 'Medium Impact',
        action: `Consider Malaysia suppliers for electronics`,
        benefit: `25% vs 30% tariff = 17% savings`,
        timeline: '6-12 months',
        difficulty: 'Moderate'
      });
    } else {
      const costReduction = Math.round(results.annualTariffCost * 0.4);
      recommendations.push({
        type: 'Cost Optimization',
        priority: 'Medium Impact',
        action: `Negotiate volume discounts with existing suppliers`,
        benefit: `Target $${costReduction.toLocaleString()} cost reduction`,
        timeline: '1-3 months',
        difficulty: 'Easy'
      });
    }

    return recommendations.slice(0, 3);
  };

  const calculateMarginProtection = (results: any) => {
    const priceIncreasePercent = (results.percentageIncrease * 0.25).toFixed(1);
    const breakEvenInventory = Math.round(results.importValue * 3);
    const costSavingsTarget = Math.round(results.annualTariffCost * 0.6);

    return {
      priceIncrease: `Raise prices by ${priceIncreasePercent}% to maintain current margins`,
      costSavings: `Find $${costSavingsTarget.toLocaleString()} in other cost savings to absorb impact`,
      inventoryStrategy: `Order $${breakEvenInventory.toLocaleString()} inventory before Aug 1st to avoid tariffs`
    };
  };

  const calculateImpact = async () => {
    if (!formData.imports || formData.countries.length === 0 || !formData.monthlyValue) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for professional feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const importValue = parseInt(formData.monthlyValue);
    const selectedCountries = countries.filter(c => formData.countries.includes(c.name));
    const weightedTariff = selectedCountries.reduce((sum, country) => sum + country.tariff, 0) / selectedCountries.length;
    
    const monthlyTariffCost = importValue * (weightedTariff / 100);
    const annualTariffCost = monthlyTariffCost * 12;
    const percentageIncrease = weightedTariff;

    const calculationResults: any = {
      monthlyTariffCost,
      annualTariffCost,
      percentageIncrease,
      importValue,
      selectedCountries,
      currentMonthlyCost: importValue,
      newMonthlyCost: importValue + monthlyTariffCost,
      deadlineDate: 'August 1st, 2025',
      explanation: `Your costs increase ${percentageIncrease.toFixed(1)}% due to new tariff rates on imports from ${formData.countries.join(' and ')}.`,
      riskLevel: selectedCountries.some(c => c.risk === 'High') ? 'High' : selectedCountries.some(c => c.risk === 'Medium') ? 'Medium' : 'Low',
      timestamp: new Date().toLocaleString(),
      aiRecommendations: generateAIRecommendations({
        monthlyTariffCost,
        annualTariffCost,
        percentageIncrease,
        importValue
      }),
      marginProtection: calculateMarginProtection({
        percentageIncrease,
        importValue,
        annualTariffCost
      })
    };
    
    setResults(calculationResults);
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setResults(null);
    setFormData({
      imports: '',
      countries: [],
      monthlyValue: ''
    });
    setShowDetailedBreakdown(false);
    setShowTimelineAnalysis(false);
    setShowSupplierAnalysis(false);
  };

  const isFormValid = formData.imports && formData.countries.length > 0 && formData.monthlyValue;
  const isFormEmpty = !formData.imports && formData.countries.length === 0 && !formData.monthlyValue;

  if (results) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your Tariff Impact Analysis
            </h2>
            <p className="text-slate-600">
              Based on your import profile and announced tariff rates
            </p>
          </div>

          {/* Primary Results */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-white">Monthly Impact</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(results.monthlyTariffCost, selectedCurrency)}
              </div>
              <div className="text-sm text-blue-100">
                +{results.percentageIncrease.toFixed(1)}% increase
              </div>
            </div>

            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <span className="font-semibold text-white">Annual Impact</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(results.annualTariffCost, selectedCurrency)}
              </div>
              <div className="text-sm text-blue-100">
                12-month projection
              </div>
            </div>

            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Currency</span>
              </div>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-blue-100 mt-1">
                Real-time rates
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              {results.explanation}
            </p>
          </div>
        </div>

        {/* Margin Protection */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Margin Protection Strategies</h3>
              <p className="text-sm text-slate-600">Actionable ways to maintain profitability</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div className="text-sm font-bold text-blue-700">Smart Pricing</div>
              </div>
              <p className="text-sm text-blue-800">{results.marginProtection.priceIncrease}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-green-600" />
                <div className="text-sm font-bold text-green-700">Cost Optimization</div>
              </div>
              <p className="text-sm text-green-800">{results.marginProtection.costSavings}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-amber-600" />
                <div className="text-sm font-bold text-amber-700">Strategic Timing</div>
              </div>
              <p className="text-sm text-amber-800">{results.marginProtection.inventoryStrategy}</p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">AI Recommendations</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  AI Analysis
                </span>
                <span className="text-xs text-slate-500">
                  Based on {formData.imports} from {formData.countries.join(', ')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {results.aiRecommendations.map((rec: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      rec.priority === 'High Impact' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'Easy Win' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-slate-900">{rec.action}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      rec.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 font-semibold mb-1">{rec.benefit}</p>
                  <p className="text-xs text-slate-600">{rec.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis - Progressive Disclosure */}
        <div className="space-y-4">
          
          {/* Cost Breakdown */}
          <Collapsible open={showDetailedBreakdown} onOpenChange={setShowDetailedBreakdown}>
            <CollapsibleTrigger className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium w-full">
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetailedBreakdown ? 'rotate-180' : ''}`} />
              Cost Breakdown
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="p-6 border-0 shadow-lg mt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-slate-600 font-medium">Component</th>
                        <th className="text-right py-3 text-slate-600 font-medium">Current</th>
                        <th className="text-right py-3 text-slate-600 font-medium">After Tariffs</th>
                        <th className="text-right py-3 text-slate-600 font-medium">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-4 font-medium">Product Cost</td>
                        <td className="text-right py-4">{formatCurrency(results.currentMonthlyCost * 0.85, selectedCurrency)}</td>
                        <td className="text-right py-4">{formatCurrency(results.currentMonthlyCost * 0.85, selectedCurrency)}</td>
                        <td className="text-right py-4 text-green-600">No change</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-4 font-medium">Shipping</td>
                        <td className="text-right py-4">{formatCurrency(results.currentMonthlyCost * 0.15, selectedCurrency)}</td>
                        <td className="text-right py-4">{formatCurrency(results.currentMonthlyCost * 0.15, selectedCurrency)}</td>
                        <td className="text-right py-4 text-green-600">No change</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-4 font-medium">Tariffs</td>
                        <td className="text-right py-4">{formatCurrency(0, selectedCurrency)}</td>
                        <td className="text-right py-4 font-semibold text-red-600">{formatCurrency(results.monthlyTariffCost, selectedCurrency)}</td>
                        <td className="text-right py-4 text-red-600 font-bold">
                          +{formatCurrency(results.monthlyTariffCost, selectedCurrency)}
                        </td>
                      </tr>
                      <tr className="border-t-2 border-slate-300 bg-slate-50">
                        <td className="py-4 font-bold">Total Monthly</td>
                        <td className="text-right py-4 font-bold">{formatCurrency(results.currentMonthlyCost, selectedCurrency)}</td>
                        <td className="text-right py-4 font-bold">{formatCurrency(results.newMonthlyCost, selectedCurrency)}</td>
                        <td className="text-right py-4 text-red-600 font-bold">
                          +{results.percentageIncrease.toFixed(1)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Timeline Analysis */}
          <Collapsible open={showTimelineAnalysis} onOpenChange={setShowTimelineAnalysis}>
            <CollapsibleTrigger className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium w-full">
              <ChevronDown className={`w-4 h-4 transition-transform ${showTimelineAnalysis ? 'rotate-180' : ''}`} />
              Timeline Impact
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="p-6 border-0 shadow-lg mt-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-3">Before August 1st, 2025</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly cost:</span>
                        <span className="font-medium">{formatCurrency(results.currentMonthlyCost, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tariff rate:</span>
                        <span className="font-medium text-green-600">0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">Current rates</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-3">After August 1st, 2025</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly cost:</span>
                        <span className="font-medium">{formatCurrency(results.newMonthlyCost, selectedCurrency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tariff rate:</span>
                        <span className="font-medium text-red-600">{results.percentageIncrease.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-red-600">New tariffs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Supplier Risk Analysis */}
          <Collapsible open={showSupplierAnalysis} onOpenChange={setShowSupplierAnalysis}>
            <CollapsibleTrigger className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium w-full">
              <ChevronDown className={`w-4 h-4 transition-transform ${showSupplierAnalysis ? 'rotate-180' : ''}`} />
              Supplier Analysis
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="p-6 border-0 shadow-lg mt-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold">Risk Assessment: {results.riskLevel}</span>
                  </div>
                  {results.selectedCountries.map((country: any) => (
                    <div key={country.name} className="p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{country.flag} {country.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          country.risk === 'High' ? 'bg-red-100 text-red-700' :
                          country.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {country.risk} Risk
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">{country.note}</div>
                      <div className="text-sm">
                        <span className="text-slate-500">Tariff impact: </span>
                        <span className="font-semibold text-red-600">+{country.tariff}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Button 
            onClick={resetCalculator}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Calculate another scenario
          </Button>
        </div>

        {/* Simplified Legal Disclaimer */}
        <div className="border-t border-slate-200 pt-6 mt-8">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              <strong>Disclaimer:</strong> Estimates based on USTR.gov tariff schedules (July 2025). For planning purposes only. 
              Consult trade professionals for compliance decisions. No data stored. Calculations happen in your browser.
            </p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-2xl"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            
            {/* Premium Currency Selector */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Display currency:</span>
              </div>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-32 border-2 border-blue-200 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          
            {/* Enhanced Empty State */}
            {isFormEmpty && (
              <div className="text-center py-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Optimize Your Imports?</h3>
                  <p className="text-slate-600">Select your import countries to see potential savings</p>
                </div>
                <Button 
                  onClick={loadSampleData}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Try with sample data
                </Button>
              </div>
            )}
          
          {/* What do you import? */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-slate-700">
                What do you import?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">List the main products you import. Examples work fine if you&apos;re unsure of exact items.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="text"
              placeholder="e.g., electronics, auto parts, textiles"
              value={formData.imports}
              onChange={(e) => setFormData(prev => ({ ...prev, imports: e.target.value }))}
              className="h-12 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-0"
            />
          </div>

          {/* From which countries? */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-slate-700">
                From which countries?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select your main import sources. If you import from multiple countries, choose the most significant ones.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Contextual note when user selects first country */}
            {selectedCountryNote && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700 font-medium">{selectedCountryNote}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {countries.map((country) => (
                <div key={country.name} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors">
                  <Checkbox
                    id={country.name}
                    checked={formData.countries.includes(country.name)}
                    onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                    className="w-5 h-5"
                  />
                  <label 
                    htmlFor={country.name}
                    className="flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-700">
                      {country.flag} {country.name}
                    </span>
                    <span className="text-sm text-red-600 font-bold">
                      {country.tariff}%
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly import value? */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-slate-700">
                Monthly import value?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Choose the range that best matches your typical monthly import spending. Estimates are fine.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* High value warning */}
            {formData.monthlyValue && parseInt(formData.monthlyValue) > 600000 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-amber-700 font-medium">
                  💡 Consider pre-ordering inventory before the August 1st deadline
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {valueRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setFormData(prev => ({ ...prev, monthlyValue: range.value }))}
                  className={`p-4 rounded-lg border-2 font-medium transition-all text-left ${
                    formData.monthlyValue === range.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-semibold">{range.display}</div>
                  <div className="text-xs text-slate-500 mt-1">{range.context}</div>
                </button>
              ))}
            </div>
          </div>

            {/* Premium Calculate Button */}
            <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                <Button
                  onClick={calculateImpact}
                  disabled={!isFormValid || isCalculating}
                  className={`relative w-full h-16 rounded-lg font-bold text-lg transition-all transform ${
                    isFormValid && !isCalculating
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl hover:scale-105'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Your Business Impact...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Brain className="w-6 h-6" />
                      <span>Calculate My Business Impact</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SimpleTariffCalculator;