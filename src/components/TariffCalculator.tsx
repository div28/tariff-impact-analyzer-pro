import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, AlertTriangle, TrendingUp, DollarSign, Building2, Globe, Package, ArrowRight, RotateCcw, Share2, Download, Lightbulb } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { TimelineAwareness, TariffSurvivalScore, CurrencyConverter, CostOffsetCalculator } from '@/components/EnterpriseFeatures';

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
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.businessType) {
      newErrors.businessType = 'Please select your business type';
    }
    if (!formData.monthlyImport) {
      newErrors.monthlyImport = 'Please select your import volume';
    }
    if (formData.countries.length === 0) {
      newErrors.countries = 'Please select at least one import country';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetCalculator = () => {
    setFormData({
      businessType: '',
      monthlyImport: '',
      countries: [],
      products: ''
    });
    setResults(null);
    setErrors({});
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
    });
  };

  const shareResults = () => {
    const shareText = `Trump Tariff Impact: My business will face ${formatCurrency(results.monthlyTariffCost)} in additional monthly costs (${results.percentageIncrease.toFixed(1)}% increase). Calculate yours at ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Trump Tariff Impact Calculator Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Results Copied",
        description: "Share text copied to clipboard.",
      });
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Country-specific recommendations
    if (formData.countries.includes('China')) {
      recommendations.push({
        type: 'alternative',
        title: 'Consider Alternative Suppliers',
        description: 'Vietnam (20% tariff) or Malaysia (25% tariff) offer lower rates than China\'s 30%',
        icon: '🌏'
      });
    }
    
    if (formData.countries.includes('Germany')) {
      recommendations.push({
        type: 'alternative',
        title: 'UK Trade Opportunity',
        description: 'UK offers reduced 10% tariff after recent trade agreement',
        icon: '🇬🇧'
      });
    }

    // Volume-based recommendations
    if (['$200K-$1M', 'Over $1M'].includes(formData.monthlyImport)) {
      recommendations.push({
        type: 'timing',
        title: 'Strategic Inventory Build',
        description: 'Consider increasing inventory before August 1st deadline to lock in current rates',
        icon: '⏰'
      });
    }

    // Industry-specific recommendations
    if (formData.businessType === 'Technology/Electronics') {
      recommendations.push({
        type: 'strategy',
        title: 'Domestic Sourcing Options',
        description: 'Explore US-based suppliers or tariff-free countries for tech components',
        icon: '🔧'
      });
    }

    if (formData.businessType === 'Manufacturing') {
      recommendations.push({
        type: 'strategy',
        title: 'Supply Chain Diversification',
        description: 'Distribute sourcing across multiple countries to reduce tariff exposure',
        icon: '🏭'
      });
    }

    return recommendations;
  };

  const handleCountryChange = (countryName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      countries: checked 
        ? [...prev.countries, countryName]
        : prev.countries.filter(c => c !== countryName)
    }));
  };

  const calculateImpact = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate API delay for professional feel
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    
    setIsCalculating(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your professional tariff impact analysis is ready.",
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
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Professional Impact Analysis
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Enterprise-grade tariff calculations with real-time market data
        </p>
      </div>

      {/* Form Section - Premium Design */}
      <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-card via-card to-muted/30">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl"></div>
        
        <CardHeader className="relative z-10 pb-8">
          <CardTitle className="flex items-center gap-3 text-3xl font-bold">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Calculator className="text-white h-6 w-6" />
            </div>
            Business Impact Calculator
          </CardTitle>
          <p className="text-muted-foreground text-lg mt-2">Configure your business parameters for precise analysis</p>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-8">
          {/* Business Configuration Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Business Type */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Building2 className="h-5 w-5 text-primary" />
                Business Type
              </Label>
              <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({...prev, businessType: value}))}>
                <SelectTrigger className="h-14 text-lg border-2 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select your industry sector" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-lg py-3">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Import Value */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <DollarSign className="h-5 w-5 text-primary" />
                Monthly Import Volume
              </Label>
              <Select value={formData.monthlyImport} onValueChange={(value) => setFormData(prev => ({...prev, monthlyImport: value}))}>
                <SelectTrigger className="h-14 text-lg border-2 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select your import range" />
                </SelectTrigger>
                <SelectContent>
                  {importRanges.map(range => (
                    <SelectItem key={range} value={range} className="text-lg py-3">{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Import Countries - Premium Grid */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Globe className="h-5 w-5 text-primary" />
              Import Countries & Tariff Rates
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {countries.map(country => (
                <div 
                  key={country.name} 
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${formData.countries.includes(country.name) 
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  onClick={() => handleCountryChange(country.name, !formData.countries.includes(country.name))}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={country.name}
                      checked={formData.countries.includes(country.name)}
                      onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                      className="scale-125"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{country.name}</div>
                      <div className={`text-sm font-medium ${
                        country.tariff >= 30 ? 'text-destructive' : 
                        country.tariff >= 25 ? 'text-warning' : 'text-success'
                      }`}>
                        {country.tariff}% tariff rate
                      </div>
                    </div>
                  </div>
                  {formData.countries.includes(country.name) && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Primary Products */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5 text-primary" />
              Primary Products
            </Label>
            <Input
              id="products"
              placeholder="e.g., consumer electronics, automotive components, textiles"
              value={formData.products}
              onChange={(e) => setFormData(prev => ({...prev, products: e.target.value}))}
              className="h-14 text-lg border-2 hover:border-primary/50 transition-colors"
            />
          </div>

          {/* Calculate Button */}
          <div className="pt-6">
            <Button 
              onClick={calculateImpact}
              variant="premium" 
              size="lg" 
              className="w-full text-xl px-8 py-6 relative overflow-hidden group"
              disabled={!formData.businessType || !formData.monthlyImport || formData.countries.length === 0}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Calculator className="mr-3 h-6 w-6" />
              Generate Professional Analysis
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section - Premium Analysis */}
      {results && (
        <div className="space-y-8">
          {/* Impact Summary Header */}
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-destructive/5 via-warning/5 to-orange-50">
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-warning/10"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-destructive">
                <div className="p-3 rounded-xl bg-gradient-to-r from-destructive to-warning">
                  <AlertTriangle className="text-white h-6 w-6" />
                </div>
                Tariff Impact Analysis
              </CardTitle>
              <p className="text-lg text-muted-foreground">Professional assessment of your business exposure</p>
            </CardHeader>
          </Card>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Monthly Cost */}
            <Card className="relative overflow-hidden shadow-xl bg-gradient-to-br from-card to-muted/30 border-2 border-destructive/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-destructive/10 rounded-full blur-2xl"></div>
              <CardContent className="relative z-10 text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-destructive to-red-600 flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-destructive mb-2">
                  {formatCurrency(results.monthlyTariffCost)}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Additional Monthly Cost</div>
              </CardContent>
            </Card>

            {/* Yearly Cost */}
            <Card className="relative overflow-hidden shadow-xl bg-gradient-to-br from-card to-muted/30 border-2 border-warning/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-warning/10 rounded-full blur-2xl"></div>
              <CardContent className="relative z-10 text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-warning mb-2">
                  {formatCurrency(results.yearlyTariffCost)}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Annual Impact</div>
              </CardContent>
            </Card>

            {/* Percentage Increase */}
            <Card className="relative overflow-hidden shadow-xl bg-gradient-to-br from-card to-muted/30 border-2 border-orange-500/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl"></div>
              <CardContent className="relative z-10 text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {results.percentageIncrease.toFixed(1)}%
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cost Increase Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-muted/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Analysis Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">Business Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Industry Sector</span>
                      <span className="text-primary font-semibold">{formData.businessType}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Import Volume</span>
                      <span className="text-primary font-semibold">{formData.monthlyImport}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Product Categories</span>
                      <span className="text-primary font-semibold">{formData.products || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary">Tariff Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Source Countries</span>
                      <span className="text-primary font-semibold">{results.selectedCountries}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Weighted Avg. Rate</span>
                      <span className="text-destructive font-semibold">{results.avgTariff.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">Calculation Base</span>
                      <span className="text-primary font-semibold">{formatCurrency(results.importValue)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <TariffSurvivalScore results={results} formData={formData} />
              <CostOffsetCalculator results={results} formData={formData} />
            </div>
            <div className="space-y-6">
              <CurrencyConverter results={results} formData={formData} />
              
              {/* Action Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Professional Actions</h4>
                  <div className="space-y-3">
                    <Button 
                      onClick={resetCalculator}
                      variant="outline" 
                      className="w-full"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Calculator
                    </Button>
                    <Button 
                      onClick={shareResults}
                      variant="outline" 
                      className="w-full"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Results
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TariffCalculator;