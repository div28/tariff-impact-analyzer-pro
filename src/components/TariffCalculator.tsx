import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface Country {
  name: string;
  tariff: number;
}

interface FormData {
  businessType: string;
  monthlyImport: string;
  countries: string[];
  products: string;
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

const countries: Country[] = [
  { name: 'China', tariff: 30 },
  { name: 'Mexico', tariff: 25 },
  { name: 'Germany', tariff: 40 },
  { name: 'Japan', tariff: 24 },
  { name: 'South Korea', tariff: 35 },
  { name: 'Other', tariff: 20 }
];

const TariffCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    monthlyImport: '',
    countries: [],
    products: ''
  });
  
  const [results, setResults] = useState<any>(null);

  const handleCountryChange = (countryName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      countries: checked 
        ? [...prev.countries, countryName]
        : prev.countries.filter(c => c !== countryName)
    }));
  };

  const calculateImpact = () => {
    if (!formData.businessType || !formData.monthlyImport || formData.countries.length === 0) {
      return;
    }

    // Convert import range to average value
    const importValue = getImportValue(formData.monthlyImport);
    
    // Calculate weighted average tariff
    const selectedCountries = countries.filter(c => formData.countries.includes(c.name));
    const avgTariff = selectedCountries.reduce((sum, country) => sum + country.tariff, 0) / selectedCountries.length;
    
    // Calculate impact
    const monthlyTariffCost = (importValue * avgTariff) / 100;
    const yearlyTariffCost = monthlyTariffCost * 12;
    const percentageIncrease = avgTariff;

    setResults({
      monthlyTariffCost,
      yearlyTariffCost,
      percentageIncrease,
      avgTariff,
      importValue,
      selectedCountries: selectedCountries.map(c => c.name).join(', ')
    });
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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Form Section */}
      <Card className="shadow-xl border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="text-primary" />
            Calculate Your Tariff Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-base font-semibold">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({...prev, businessType: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Import Value */}
            <div className="space-y-2">
              <Label htmlFor="monthlyImport" className="text-base font-semibold">Monthly Import Value</Label>
              <Select value={formData.monthlyImport} onValueChange={(value) => setFormData(prev => ({...prev, monthlyImport: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select import range" />
                </SelectTrigger>
                <SelectContent>
                  {importRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Import Countries */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Import Countries (with proposed tariff rates)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {countries.map(country => (
                <div key={country.name} className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={country.name}
                    checked={formData.countries.includes(country.name)}
                    onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                  />
                  <Label htmlFor={country.name} className="cursor-pointer flex-1">
                    {country.name} ({country.tariff}%)
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Products */}
          <div className="space-y-2">
            <Label htmlFor="products" className="text-base font-semibold">Primary Products</Label>
            <Input
              id="products"
              placeholder="e.g., electronics, car parts, clothing"
              value={formData.products}
              onChange={(e) => setFormData(prev => ({...prev, products: e.target.value}))}
              className="text-base"
            />
          </div>

          <Button 
            onClick={calculateImpact}
            variant="hero" 
            size="lg" 
            className="w-full md:w-auto text-lg px-8 py-6"
          >
            <Calculator className="mr-2" />
            Calculate Impact
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <Card className="shadow-xl border-l-4 border-l-warning bg-gradient-to-r from-red-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-destructive">
              <AlertTriangle className="text-warning" />
              Your Tariff Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Monthly Cost */}
              <Card className="text-center p-4 bg-white shadow-lg">
                <div className="flex justify-center mb-2">
                  <DollarSign className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-3xl font-bold text-destructive mb-1">
                  {formatCurrency(results.monthlyTariffCost)}
                </div>
                <div className="text-sm text-muted-foreground">Additional Monthly Cost</div>
              </Card>

              {/* Yearly Cost */}
              <Card className="text-center p-4 bg-white shadow-lg">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-3xl font-bold text-destructive mb-1">
                  {formatCurrency(results.yearlyTariffCost)}
                </div>
                <div className="text-sm text-muted-foreground">Additional Yearly Cost</div>
              </Card>

              {/* Percentage Increase */}
              <Card className="text-center p-4 bg-white shadow-lg">
                <div className="flex justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
                <div className="text-3xl font-bold text-warning mb-1">
                  {results.percentageIncrease.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Cost Increase</div>
              </Card>
            </div>

            {/* Details */}
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2">Calculation Details:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Business Type: {formData.businessType}</li>
                <li>• Monthly Import Range: {formData.monthlyImport}</li>
                <li>• Import Countries: {results.selectedCountries}</li>
                <li>• Average Tariff Rate: {results.avgTariff.toFixed(1)}%</li>
                <li>• Products: {formData.products || 'Not specified'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TariffCalculator;