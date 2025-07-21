import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrendingUp, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, ChevronDown, Lightbulb, Zap } from 'lucide-react';

interface FormData {
  imports: string;
  countries: string[];
  monthlyValue: string;
}

const countries = [
  { name: 'China', tariff: 30, flag: '🇨🇳', note: '30% tariff starting Aug 1st' },
  { name: 'Germany', tariff: 40, flag: '🇩🇪', note: 'Highest rate announced' },
  { name: 'Mexico', tariff: 25, flag: '🇲🇽', note: 'Major trade partner' },
  { name: 'India', tariff: 20, flag: '🇮🇳', note: 'Growing alternative source' },
  { name: 'Other', tariff: 25, flag: '🌐', note: 'Average rate for other countries' }
];

const valueRanges = [
  { label: '<$50K', value: '25000', display: 'Under $50K', context: 'Small importer' },
  { label: '$50-200K', value: '125000', display: '$50K - $200K', context: 'Medium business' },
  { label: '$200K-1M', value: '600000', display: '$200K - $1M', context: 'Large operation' },
  { label: '>$1M', value: '2000000', display: 'Over $1M', context: 'Enterprise scale' }
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
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
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

    // Generate smart recommendations
    const hasChina = formData.countries.includes('China');
    const hasHighValueImports = importValue > 500000;
    
    const recommendations = [
      hasChina 
        ? `Switch to Vietnam suppliers (save $${Math.round(annualTariffCost * 0.3).toLocaleString()}/year)`
        : `Diversify suppliers to reduce risk`,
      hasHighValueImports
        ? `Order 6+ months inventory before Aug 1st`
        : `Consider pre-ordering 3 months inventory`,
      `Increase product prices by ${Math.round(percentageIncrease * 0.3)}% to maintain margins`
    ];

    setResults({
      monthlyTariffCost,
      annualTariffCost,
      percentageIncrease,
      importValue,
      selectedCountries,
      recommendations,
      currentMonthlyCost: importValue,
      newMonthlyCost: importValue + monthlyTariffCost,
      deadlineDate: 'August 1st, 2025',
      explanation: `Your costs increase ${percentageIncrease.toFixed(1)}% due to new tariff rates on imports from ${formData.countries.join(' and ')}.`
    });
    
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
  };

  const isFormValid = formData.imports && formData.countries.length > 0 && formData.monthlyValue;
  const isFormEmpty = !formData.imports && formData.countries.length === 0 && !formData.monthlyValue;

  if (results) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Section - The Number That Matters */}
        <Card className="p-6 md:p-8 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold text-red-700">Your Impact Analysis</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-red-600">
                ${results.annualTariffCost.toLocaleString()}
              </div>
              <div className="text-lg text-red-700 font-medium">
                additional cost per year
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-base">
              <div className="text-red-600 font-semibold">
                {results.percentageIncrease.toFixed(1)}% increase
              </div>
              <div className="hidden sm:block text-slate-400">•</div>
              <div className="text-slate-600">
                Starting {results.deadlineDate}
              </div>
            </div>

            {/* What This Means - For Newcomers */}
            <div className="bg-white/70 rounded-lg p-4 mt-6">
              <p className="text-sm text-slate-700">
                <strong>What this means:</strong> {results.explanation}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Primary */}
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Recommended Actions</h3>
          
          <div className="space-y-3">
            {results.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 font-medium">{rec}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Breakdown - Progressive Disclosure */}
        <div>
          <Collapsible open={showDetailedBreakdown} onOpenChange={setShowDetailedBreakdown}>
            <CollapsibleTrigger className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium mx-auto">
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetailedBreakdown ? 'rotate-180' : ''}`} />
              See detailed breakdown
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="p-6 border-0 shadow-lg mt-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cost Breakdown</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 text-slate-600 font-medium">Source</th>
                        <th className="text-right py-3 text-slate-600 font-medium">Current</th>
                        <th className="text-right py-3 text-slate-600 font-medium">After Tariffs</th>
                        <th className="text-right py-3 text-slate-600 font-medium">Increase</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-4 font-medium">Monthly Total</td>
                        <td className="text-right py-4">${results.currentMonthlyCost.toLocaleString()}</td>
                        <td className="text-right py-4 font-semibold">${results.newMonthlyCost.toLocaleString()}</td>
                        <td className="text-right py-4 text-red-600 font-bold">
                          +${results.monthlyTariffCost.toLocaleString()}
                        </td>
                      </tr>
                      {results.selectedCountries.map((country: any) => (
                        <tr key={country.name} className="border-b border-slate-50">
                          <td className="py-3 text-sm text-slate-600">
                            {country.flag} {country.name}
                          </td>
                          <td className="text-right py-3 text-sm text-slate-600">—</td>
                          <td className="text-right py-3 text-sm text-slate-600">—</td>
                          <td className="text-right py-3 text-sm text-red-600 font-medium">
                            +{country.tariff}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Educational Content */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2">Why this happens:</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Trump&apos;s 2025 tariff policy adds taxes on imports to protect domestic industries and generate revenue.
                  </p>
                  <h4 className="font-semibold text-slate-900 mb-2">What successful importers do:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Diversify supplier base to lower-tariff countries</li>
                    <li>• Build inventory before tariff deadlines</li>
                    <li>• Negotiate price adjustments with customers</li>
                    <li>• Explore domestic sourcing alternatives</li>
                  </ul>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Action Buttons */}
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

      </div>
    );
  }

  return (
    <TooltipProvider>
      <Card className="p-6 md:p-8 border-0 shadow-xl">
        <div className="space-y-6">
          
          {/* Empty State Guidance */}
          {isFormEmpty && (
            <div className="text-center py-4 mb-6">
              <div className="inline-flex items-center gap-2 text-slate-500 mb-3">
                <Lightbulb className="w-5 h-5" />
                <span>Select your import countries to see impact</span>
              </div>
              <Button 
                onClick={loadSampleData}
                variant="outline"
                size="sm"
                className="inline-flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
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

          {/* Calculate Button */}
          <div className="pt-4">
            <Button
              onClick={calculateImpact}
              disabled={!isFormValid || isCalculating}
              className={`w-full h-14 rounded-lg font-semibold text-lg transition-all ${
                isFormValid && !isCalculating
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-300 border-t-white rounded-full animate-spin" />
                  Calculating Impact...
                </div>
              ) : (
                'Calculate Impact'
              )}
            </Button>
          </div>

        </div>
      </Card>
    </TooltipProvider>
  );
};

export default SimpleTariffCalculator;