import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TrendingUp, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';

interface FormData {
  imports: string;
  countries: string[];
  monthlyValue: string;
}

const countries = [
  { name: 'China', tariff: 30, flag: '🇨🇳' },
  { name: 'Germany', tariff: 40, flag: '🇩🇪' },
  { name: 'Mexico', tariff: 25, flag: '🇲🇽' },
  { name: 'India', tariff: 20, flag: '🇮🇳' },
  { name: 'Other', tariff: 25, flag: '🌐' }
];

const valueRanges = [
  { label: '<$50K', value: '25000', display: 'Under $50K' },
  { label: '$50-200K', value: '125000', display: '$50K - $200K' },
  { label: '$200K-1M', value: '600000', display: '$200K - $1M' },
  { label: '>$1M', value: '2000000', display: 'Over $1M' }
];

const SimpleTariffCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    imports: '',
    countries: [],
    monthlyValue: ''
  });
  
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCountryChange = (countryName: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        countries: [...prev.countries, countryName]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        countries: prev.countries.filter(c => c !== countryName)
      }));
    }
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

    // Generate recommendations
    const recommendations = [
      `Switch to Vietnam suppliers (save $${Math.round(annualTariffCost * 0.25).toLocaleString()}/year)`,
      `Order 6 months inventory before Aug 1st`,
      `Increase product prices by ${Math.round(percentageIncrease * 0.25)}% to maintain margins`
    ];

    setResults({
      monthlyTariffCost,
      annualTariffCost,
      percentageIncrease,
      importValue,
      selectedCountries,
      recommendations,
      currentMonthlyCost: importValue,
      newMonthlyCost: importValue + monthlyTariffCost
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
  };

  const isFormValid = formData.imports && formData.countries.length > 0 && formData.monthlyValue;

  if (results) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Section - The Number That Matters */}
        <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-red-600" />
              <span className="text-lg font-semibold text-red-700">Impact Analysis</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold text-red-600">
                ${results.annualTariffCost.toLocaleString()}
              </div>
              <div className="text-xl text-red-700 font-medium">
                additional cost per year
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="text-red-600 font-semibold">
                {results.percentageIncrease.toFixed(1)}% increase
              </div>
              <div className="text-slate-600">
                Starting August 1st, 2025
              </div>
            </div>
          </div>
        </Card>

        {/* Middle Section - Comparison Table */}
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Cost Breakdown</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-600 font-medium">Source</th>
                  <th className="text-right py-3 text-slate-600 font-medium">Current Cost</th>
                  <th className="text-right py-3 text-slate-600 font-medium">New Cost</th>
                  <th className="text-right py-3 text-slate-600 font-medium">Increase</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
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
                    <td className="text-right py-3 text-sm text-slate-600">-</td>
                    <td className="text-right py-3 text-sm text-slate-600">-</td>
                    <td className="text-right py-3 text-sm text-red-600 font-medium">
                      +{country.tariff}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bottom Section - Top 3 Actions */}
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recommended Actions</h3>
          
          <div className="space-y-4">
            {results.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 font-medium">{rec}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 mt-1" />
              </div>
            ))}
          </div>
        </Card>

        {/* Action Button */}
        <div className="text-center pt-6">
          <button 
            onClick={resetCalculator}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Calculate another scenario
          </button>
        </div>

      </div>
    );
  }

  return (
    <Card className="p-8 border-0 shadow-xl">
      <div className="space-y-8">
        
        {/* What do you import? */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            What do you import?
          </label>
          <Input
            type="text"
            placeholder="electronics, clothing, machinery"
            value={formData.imports}
            onChange={(e) => setFormData(prev => ({ ...prev, imports: e.target.value }))}
            className="h-12 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-0"
          />
        </div>

        {/* From which countries? */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            From which countries?
          </label>
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
          <label className="block text-sm font-semibold text-slate-700">
            Monthly import value?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {valueRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setFormData(prev => ({ ...prev, monthlyValue: range.value }))}
                className={`p-4 rounded-lg border-2 font-medium transition-all ${
                  formData.monthlyValue === range.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {range.display}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="pt-4">
          <button
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
          </button>
        </div>

      </div>
    </Card>
  );
};

export default SimpleTariffCalculator;