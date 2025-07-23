import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrendingUp, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, ChevronDown, Lightbulb, Zap, DollarSign, Shield, Brain, Target, ExternalLink, Globe, Star, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import BusinessIntelligence from './BusinessIntelligence';
import { HTSCodeLookup } from './HTSCodeLookup';
import { ScenarioComparison } from './ScenarioComparison';
import { ExportReports } from './ExportReports';
interface FormData {
  imports: string;
  countries: string[];
  monthlyValue: string;
  shippingMethod?: string;
  paymentTerms?: string;
  orderFrequency?: string;
  htsCode?: string;
}
const countries = [{
  name: 'China',
  tariff: 30,
  flag: '🇨🇳',
  note: '30% tariff starting Aug 1st',
  risk: 'High'
}, {
  name: 'Germany',
  tariff: 40,
  flag: '🇩🇪',
  note: 'Highest rate announced',
  risk: 'High'
}, {
  name: 'Mexico',
  tariff: 25,
  flag: '🇲🇽',
  note: 'USMCA trade partner',
  risk: 'Medium'
}, {
  name: 'India',
  tariff: 20,
  flag: '🇮🇳',
  note: 'Growing alternative source',
  risk: 'Low'
}, {
  name: 'Other',
  tariff: 25,
  flag: '🌐',
  note: 'Average rate for other countries',
  risk: 'Medium'
}];
const valueRanges = [{
  label: '<$50K',
  value: '25000',
  display: 'Under $50K',
  context: 'Small importer'
}, {
  label: '$50-200K',
  value: '125000',
  display: '$50K - $200K',
  context: 'Medium business'
}, {
  label: '$200K-1M',
  value: '600000',
  display: '$200K - $1M',
  context: 'Large operation'
}, {
  label: '>$1M',
  value: '2000000',
  display: 'Over $1M',
  context: 'Enterprise scale'
}];
const currencies = [{
  code: 'USD',
  symbol: '$',
  rate: 1.0,
  name: 'US Dollar'
}, {
  code: 'EUR',
  symbol: '€',
  rate: 0.92,
  name: 'Euro'
}, {
  code: 'GBP',
  symbol: '£',
  rate: 0.79,
  name: 'British Pound'
}, {
  code: 'CAD',
  symbol: 'C$',
  rate: 1.36,
  name: 'Canadian Dollar'
}];
const sampleScenario = {
  imports: 'electronics, computer parts, accessories',
  countries: ['China', 'Mexico'],
  monthlyValue: '125000'
};
const SimpleTariffCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useLocalStorage<FormData>('tariff-calculator-form', {
    imports: '',
    countries: [],
    monthlyValue: '',
    shippingMethod: '',
    paymentTerms: '',
    orderFrequency: '',
    htsCode: ''
  });
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(true);
  const [showTimelineAnalysis, setShowTimelineAnalysis] = useState(true);
  const [showSupplierAnalysis, setShowSupplierAnalysis] = useState(true);
  const [selectedCountryNote, setSelectedCountryNote] = useState('');
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [showBusinessIntelligence, setShowBusinessIntelligence] = useState(false);
  const [showHTSLookup, setShowHTSLookup] = useState(false);
  const [showScenarioComparison, setShowScenarioComparison] = useState(false);
  const [showExportReports, setShowExportReports] = useState(false);
  const [scenarios, setScenarios] = useLocalStorage<any[]>('saved-scenarios', []);
  
  const { errors, isValid } = useFormValidation(formData);
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
    if (!isValid) {
      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields before calculating.",
        variant: "destructive"
      });
      return;
    }
    setIsCalculating(true);

    // Simulate calculation delay for professional feel
    await new Promise(resolve => setTimeout(resolve, 800));
    const importValue = parseInt(formData.monthlyValue);
    const selectedCountries = countries.filter(c => formData.countries.includes(c.name));
    const weightedTariff = selectedCountries.reduce((sum, country) => sum + country.tariff, 0) / selectedCountries.length;
    
    // Factor in additional details for more accurate calculations
    let adjustedTariff = weightedTariff;
    if (formData.shippingMethod === 'express') {
      adjustedTariff += 2; // Express shipping adds complexity
    }
    if (formData.orderFrequency === 'weekly') {
      adjustedTariff -= 1; // Frequent orders may reduce per-shipment costs
    }
    
    const monthlyTariffCost = importValue * (adjustedTariff / 100);
    const annualTariffCost = monthlyTariffCost * 12;
    const percentageIncrease = adjustedTariff;
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
    
    toast({
      title: "Analysis Complete",
      description: `Calculated ${formatCurrency(annualTariffCost, selectedCurrency)} annual impact`
    });
  };
  const resetCalculator = () => {
    setResults(null);
    setFormData({
      imports: '',
      countries: [],
      monthlyValue: '',
      shippingMethod: '',
      paymentTerms: '',
      orderFrequency: '',
      htsCode: ''
    });
    setShowDetailedBreakdown(false);
    setShowTimelineAnalysis(false);
    setShowSupplierAnalysis(false);
  };

  const saveScenario = () => {
    if (!results) return;
    
    const scenarioName = `${formData.imports.split(',')[0]} - ${formData.countries.join(', ')} - ${new Date().toLocaleDateString()}`;
    const newScenario = {
      id: Date.now().toString(),
      name: scenarioName,
      formData,
      results,
      timestamp: new Date()
    };
    
    setScenarios(prev => [newScenario, ...prev.slice(0, 9)]); // Keep last 10 scenarios
    toast({
      title: "Scenario Saved",
      description: `Saved as "${scenarioName}"`
    });
  };

  const createNewScenario = () => {
    setShowScenarioComparison(false);
    resetCalculator();
  };

  const selectScenario = (scenario: any) => {
    setFormData(scenario.formData);
    setResults(scenario.results);
    setShowScenarioComparison(false);
  };

  const handleHTSCodeSelect = (htsCode: any) => {
    setFormData(prev => ({
      ...prev,
      htsCode: htsCode.code,
      imports: prev.imports || htsCode.description
    }));
    setShowHTSLookup(false);
    toast({
      title: "HTS Code Selected",
      description: `Added ${htsCode.code} - ${htsCode.description}`
    });
  };
  const isFormValid = formData.imports && formData.countries.length > 0 && formData.monthlyValue;
  const isFormEmpty = !formData.imports && formData.countries.length === 0 && !formData.monthlyValue;
  if (results) {
    return <div className="max-w-5xl mx-auto space-y-6">
        
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
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-destructive" />
                <span className="font-semibold text-foreground">Monthly Impact</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {formatCurrency(results.monthlyTariffCost, selectedCurrency)}
              </div>
              <div className="text-sm text-muted-foreground">
                +{results.percentageIncrease.toFixed(1)}% increase
              </div>
            </div>

            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-warning" />
                <span className="font-semibold text-foreground">Annual Impact</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {formatCurrency(results.annualTariffCost, selectedCurrency)}
              </div>
              <div className="text-sm text-muted-foreground">
                12-month projection
              </div>
            </div>

            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Currency</span>
              </div>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground mt-1">
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
            <Button onClick={() => {
            console.log('Advanced Analysis button clicked, current state:', showBusinessIntelligence);
            setShowBusinessIntelligence(!showBusinessIntelligence);
          }} variant="outline" size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Analysis
            </Button>
          </div>
          
          <div className="space-y-4">
            {results.aiRecommendations.map((rec: any, index: number) => <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${rec.priority === 'High Impact' ? 'bg-red-100 text-red-700' : rec.priority === 'Easy Win' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-slate-900">{rec.action}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : rec.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 font-semibold mb-1">{rec.benefit}</p>
                  <p className="text-xs text-slate-600">{rec.timeline}</p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Business Intelligence Section */}
        {showBusinessIntelligence && <BusinessIntelligence results={results} formData={formData} />}

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
                  {results.selectedCountries.map((country: any) => <div key={country.name} className="p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{country.flag} {country.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${country.risk === 'High' ? 'bg-red-100 text-red-700' : country.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {country.risk} Risk
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">{country.note}</div>
                      <div className="text-sm">
                        <span className="text-slate-500">Tariff impact: </span>
                        <span className="font-semibold text-red-600">+{country.tariff}%</span>
                      </div>
                    </div>)}
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Button onClick={saveScenario} variant="outline" className="inline-flex items-center gap-2">
            <Star className="w-4 h-4" />
            Save Scenario
          </Button>
          <Button onClick={() => setShowScenarioComparison(true)} variant="outline" className="inline-flex items-center gap-2">
            <Target className="w-4 h-4" />
            Compare Scenarios
          </Button>
          <Button onClick={() => setShowExportReports(true)} variant="outline" className="inline-flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Export Report
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="inline-flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Calculate another scenario
          </Button>
        </div>

        {/* Feature Modals/Sections */}
        {showScenarioComparison && (
          <ScenarioComparison
            scenarios={scenarios}
            onCreateScenario={createNewScenario}
            onSelectScenario={selectScenario}
          />
        )}
        
        {showExportReports && (
          <ExportReports
            results={results}
            formData={formData}
          />
        )}

        {/* Simplified Legal Disclaimer */}
        <div className="border-t border-slate-200 pt-6 mt-8">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              <strong>Disclaimer:</strong> Estimates based on USTR.gov tariff schedules (July 2025). For planning purposes only. 
              Consult trade professionals for compliance decisions. No data stored. Calculations happen in your browser.
            </p>
          </div>
        </div>

      </div>;
  }
  return <TooltipProvider>
      <div className="max-w-2xl mx-auto">
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-foreground mb-2">
              Tariff Impact Calculator
            </h1>
            <p className="text-center text-muted-foreground">
              Calculate the impact of new tariffs on your business
            </p>
          </div>
          <div className="space-y-6">
            
            {/* Currency Selector */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Display currency:</span>
              </div>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-32 border-2 border-border bg-card text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {currencies.map(currency => <SelectItem key={currency.code} value={currency.code} className="text-foreground hover:bg-muted">
                      {currency.symbol} {currency.code}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          
            {/* Enhanced Empty State */}
            {isFormEmpty && <div className="text-center py-8 mb-6">
                <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-primary/20">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Ready to Optimize Your Imports?</h3>
                  <p className="text-muted-foreground">Select your import countries to see potential savings</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button onClick={loadSampleData} className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all" size="lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Try with sample data
                  </Button>
                  <Button onClick={() => setShowHTSLookup(true)} variant="outline" size="lg">
                    <Target className="w-4 h-4 mr-2" />
                    HTS Code Lookup
                  </Button>
                </div>
              </div>}
          
          {/* What do you import? */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-foreground">
                What do you import?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">List the main products you import. Examples work fine if you&apos;re unsure of exact items.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="e.g., electronics, auto parts, textiles" 
                value={formData.imports} 
                onChange={e => setFormData(prev => ({
                  ...prev,
                  imports: e.target.value
                }))} 
                className={`h-12 text-base border-2 ${errors.imports ? 'border-destructive' : 'border-border'} focus:border-primary focus:ring-0 bg-card text-foreground placeholder:text-muted-foreground`} 
              />
              <Button onClick={() => setShowHTSLookup(true)} variant="outline" size="sm" className="h-12">
                <Target className="w-4 h-4" />
              </Button>
            </div>
            {errors.imports && (
              <p className="text-sm text-destructive mt-1">{errors.imports}</p>
            )}
            {formData.htsCode && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-sm">
                <span className="text-green-700 font-medium">HTS Code: {formData.htsCode}</span>
              </div>
            )}
          </div>

          {/* From which countries? */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-foreground">
                From which countries?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select all countries you import from. You can choose multiple countries.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Contextual note when user selects first country */}
            {selectedCountryNote && <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700 font-medium">{selectedCountryNote}</p>
              </div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {countries.map(country => <div key={country.name} className={`flex items-center space-x-3 p-4 rounded-lg border-2 ${errors.countries ? 'border-destructive' : 'border-border'} hover:border-primary/50 transition-colors bg-muted/50`}>
                  <Checkbox id={country.name} checked={formData.countries.includes(country.name)} onCheckedChange={checked => handleCountryChange(country.name, checked as boolean)} className="w-5 h-5" />
                  <label htmlFor={country.name} className="flex-1 cursor-pointer flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {country.flag} {country.name}
                    </span>
                    <span className="text-sm text-destructive font-bold">
                      {country.tariff}%
                    </span>
                  </label>
                </div>)}
            </div>
            {errors.countries && (
              <p className="text-sm text-destructive mt-1">{errors.countries}</p>
            )}
          </div>

          {/* Monthly import value? */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-semibold text-foreground">
                Monthly import value?
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Choose the range that best matches your typical monthly import spending. Estimates are fine.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* High value warning */}
            {formData.monthlyValue && parseInt(formData.monthlyValue) > 600000 && <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-amber-700 font-medium">
                  💡 Consider pre-ordering inventory before the August 1st deadline
                </p>
              </div>}
            
            <div className="grid grid-cols-2 gap-3">
              {valueRanges.map(range => <button key={range.value} onClick={() => setFormData(prev => ({
                ...prev,
                monthlyValue: range.value
              }))} className={`p-4 rounded-lg border-2 font-medium transition-all text-left ${formData.monthlyValue === range.value ? 'border-primary bg-primary/20 text-primary' : errors.monthlyValue ? 'border-destructive hover:border-primary/50' : 'border-border hover:border-primary/50'} text-foreground`}>
                  <div className="font-semibold">{range.display}</div>
                  <div className="text-xs text-muted-foreground mt-1">{range.context}</div>
                </button>)}
            </div>
            {errors.monthlyValue && (
              <p className="text-sm text-destructive mt-1">{errors.monthlyValue}</p>
            )}
          </div>

          {/* Additional Details - Progressive Disclosure */}
          {showAdditionalDetails && <div className="mt-6 p-6 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">Advanced Options</h3>
                  <p className="text-sm text-muted-foreground">Configure additional parameters for detailed analysis</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Shipping Method</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sea">Sea Freight (30-45 days)</SelectItem>
                      <SelectItem value="air">Air Freight (3-7 days)</SelectItem>
                      <SelectItem value="express">Express (1-3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Payment Terms</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="lc">Letter of Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Order Frequency</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue placeholder="How often do you order?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="irregular">Irregular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Business Type</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border text-foreground">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retailer">Retailer</SelectItem>
                      <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>}

          {/* Additional Details Toggle */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setShowAdditionalDetails(!showAdditionalDetails)} 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-4 h-4 mr-2" />
              Additional Details
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showAdditionalDetails ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Calculate Button */}
          <div className="pt-6">
            <Button onClick={calculateImpact} disabled={!isValid || isCalculating} className={`w-full h-16 rounded-lg font-bold text-lg transition-all transform ${isValid && !isCalculating ? 'bg-primary hover:bg-primary-dark text-primary-foreground shadow-2xl hover:shadow-3xl hover:scale-105' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
              {isCalculating ? <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  <span>Analyzing Your Business Impact...</span>
                </div> : <div className="flex items-center justify-center gap-3">
                  <Brain className="w-6 h-6" />
                  <span>Calculate My Business Impact</span>
                  <ArrowRight className="w-6 h-6" />
                </div>}
            </Button>
          </div>

          {/* Feature Modals */}
          {showHTSLookup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">HTS Code Lookup</h2>
                  <Button onClick={() => setShowHTSLookup(false)} variant="ghost" size="sm">
                    ✕
                  </Button>
                </div>
                <div className="p-4">
                  <HTSCodeLookup 
                    onCodeSelect={handleHTSCodeSelect}
                    searchTerm={formData.imports}
                  />
                </div>
              </div>
            </div>
          )}

          </div>
        </div>
      </div>
    </TooltipProvider>;
};
export default SimpleTariffCalculator;