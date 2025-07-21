import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

interface FormData {
  businessType: string;
  monthlyImport: string;
  countries: string[];
}

const businessTypes = [
  'Manufacturing',
  'Retail/E-commerce', 
  'Technology/Electronics',
  'Automotive',
  'Textiles/Clothing',
  'Food & Beverage',
  'Other'
];

const importRanges = [
  'Under $10K',
  '$10K-$50K', 
  '$50K-$200K',
  '$200K-$1M',
  'Over $1M'
];

const countries = [
  { name: 'China', tariff: 30 },
  { name: 'Mexico', tariff: 25 },
  { name: 'Germany', tariff: 40 },
  { name: 'Japan', tariff: 24 },
  { name: 'South Korea', tariff: 35 }
];

const SimpleTariffCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    monthlyImport: '',
    countries: []
  });
  
  const [results, setResults] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const getImportValue = (range: string): number => {
    switch (range) {
      case 'Under $10K': return 5000;
      case '$10K-$50K': return 30000;
      case '$50K-$200K': return 125000;
      case '$200K-$1M': return 600000;
      case 'Over $1M': return 2000000;
      default: return 0;
    }
  };

  const calculatePreview = () => {
    if (!formData.monthlyImport || formData.countries.length === 0) {
      setShowPreview(false);
      return;
    }

    const importValue = getImportValue(formData.monthlyImport);
    const selectedCountries = countries.filter(c => formData.countries.includes(c.name));
    const weightedTariff = selectedCountries.reduce((sum, country) => sum + country.tariff, 0) / selectedCountries.length;
    
    const monthlyTariffCost = importValue * (weightedTariff / 100);
    
    setResults({
      monthlyTariffCost,
      annualTariffCost: monthlyTariffCost * 12,
      weightedTariff,
      importValue,
      isPreview: true
    });
    
    setShowPreview(true);
  };

  const calculateFinal = () => {
    setResults(prev => ({ ...prev, isPreview: false }));
  };

  // Real-time preview calculation
  useEffect(() => {
    calculatePreview();
  }, [formData.monthlyImport, formData.countries]);

  const isFormValid = formData.businessType && formData.monthlyImport && formData.countries.length > 0;
  const showResults = results && !results.isPreview;
  const showQuickPreview = showPreview && results?.isPreview;

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Tariff Impact</h2>
              <p className="text-slate-600">Based on {formData.businessType} importing from {formData.countries.join(', ')}</p>
            </div>

            {/* Key Numbers */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  ${results.monthlyTariffCost.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-red-700 mb-1">Additional Monthly Cost</div>
                <div className="text-xs text-slate-600">Due to tariffs</div>
              </div>
              
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  ${results.annualTariffCost.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-red-700 mb-1">Additional Annual Cost</div>
                <div className="text-xs text-slate-600">Over 12 months</div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monthly imports:</span>
                  <span className="font-medium">{formData.monthlyImport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Average tariff rate:</span>
                  <span className="font-medium">{results.weightedTariff.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Import countries:</span>
                  <span className="font-medium">{formData.countries.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="text-center">
              <button 
                onClick={() => setResults(null)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                ← Calculate for different scenario
              </button>
            </div>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <div className="space-y-6">
            
            {/* Business Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Business Type</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Import Countries */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Import Countries</label>
              <div className="space-y-3">
                {countries.map((country) => (
                  <div key={country.name} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <Checkbox
                      id={country.name}
                      checked={formData.countries.includes(country.name)}
                      onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                    />
                    <label 
                      htmlFor={country.name}
                      className="flex-1 cursor-pointer flex justify-between items-center"
                    >
                      <span className="font-medium">{country.name}</span>
                      <span className="text-sm text-red-600 font-semibold">{country.tariff}% tariff</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Import Value */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Monthly Import Value</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyImport: value }))}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Select your monthly import value" />
                </SelectTrigger>
                <SelectContent>
                  {importRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quick Preview */}
            {showQuickPreview && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Quick Preview</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ~${results.monthlyTariffCost.toLocaleString()}/month
                </div>
                <div className="text-sm text-blue-600">
                  Additional cost due to tariffs
                </div>
              </div>
            )}

            {/* Calculate Button */}
            {isFormValid && (
              <div className="pt-4">
                <button 
                  onClick={calculateFinal}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  See Full Impact Analysis
                </button>
              </div>
            )}

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleTariffCalculator;