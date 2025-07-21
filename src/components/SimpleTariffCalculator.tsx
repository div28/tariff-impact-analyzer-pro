import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, DollarSign } from 'lucide-react';

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

  const calculateImpact = () => {
    if (!formData.businessType || !formData.monthlyImport || formData.countries.length === 0) {
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const importValue = getImportValue(formData.monthlyImport);
      const selectedCountries = countries.filter(c => formData.countries.includes(c.name));
      const weightedTariff = selectedCountries.reduce((sum, country) => sum + country.tariff, 0) / selectedCountries.length;
      
      const monthlyTariffCost = importValue * (weightedTariff / 100);
      const annualTariffCost = monthlyTariffCost * 12;

      setResults({
        monthlyTariffCost,
        annualTariffCost,
        weightedTariff,
        importValue
      });
      
      setIsCalculating(false);
    }, 1000);
  };

  const isFormValid = formData.businessType && formData.monthlyImport && formData.countries.length > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <div className="space-y-8">
            
            {/* Business Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Business Type</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}>
                <SelectTrigger className="w-full">
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
              <div className="grid grid-cols-1 gap-3">
                {countries.map((country) => (
                  <div key={country.name} className="flex items-center space-x-3">
                    <Checkbox
                      id={country.name}
                      checked={formData.countries.includes(country.name)}
                      onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                    />
                    <label 
                      htmlFor={country.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                    >
                      {country.name} ({country.tariff}% tariff)
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Import Value */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Monthly Import Value</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, monthlyImport: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your monthly import value" />
                </SelectTrigger>
                <SelectContent>
                  {importRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={calculateImpact}
              disabled={!isFormValid || isCalculating}
              className="w-full py-6 text-lg"
              size="lg"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Impact
                </>
              )}
            </Button>

            {/* Results */}
            {results && (
              <div className="mt-8 space-y-4 p-6 bg-slate-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Tariff Impact</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-red-600">
                      ${results.monthlyTariffCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Monthly Cost</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-red-600">
                      ${results.annualTariffCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">Annual Cost</div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-slate-600">
                    Based on {results.weightedTariff.toFixed(1)}% average tariff rate
                  </p>
                </div>
              </div>
            )}

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleTariffCalculator;