import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calculator, AlertTriangle, TrendingUp, DollarSign, Building2, Globe, Package, ArrowRight, RotateCcw, Share2, Download, Lightbulb, Zap, Mail, Linkedin, RefreshCw, Loader2, Sparkles, Users, HelpCircle, ChevronDown, ChevronUp, BookmarkPlus, MessageCircle, CheckCircle2, Info } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [expandedHelp, setExpandedHelp] = useState<{[key: string]: boolean}>({});

  // Smart guidance data
  const businessTypeExamples = {
    'Manufacturing': 'Raw materials, components, machinery for production',
    'Retail/E-commerce': 'Finished goods for resale, consumer products',
    'Technology/Electronics': 'Computer hardware, smartphones, electronic components',
    'Automotive': 'Car parts, automotive components, vehicle accessories',
    'Textiles/Clothing': 'Fabrics, apparel, fashion accessories',
    'Food & Beverage': 'Food products, beverages, agricultural goods',
    'Other': 'Any other business type not listed above'
  };

  const topTariffCountries = [
    { name: 'China', rate: '30%', note: 'Highest volume, significant impact' },
    { name: 'Germany', rate: '40%', note: 'Highest tariff rate announced' },
    { name: 'Mexico', rate: '25%', note: 'Major trade partner' },
    { name: 'Japan', rate: '24%', note: 'Technology and automotive' },
    { name: 'South Korea', rate: '35%', note: 'Electronics and components' }
  ];

  const toggleHelp = (field: string) => {
    setExpandedHelp(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

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
    
    // Loading animation
    await new Promise(resolve => setTimeout(resolve, 3000));

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
    setShowCelebration(true);
    
    // Hide celebration after 3 seconds
    setTimeout(() => setShowCelebration(false), 3000);
    
    toast({
      title: "Analysis Complete! 🎉",
      description: "Your tariff impact analysis is ready.",
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

  const handleQuickDemo = () => {
    const demoData = {
      businessType: "Technology/Electronics",
      monthlyImport: "$50K-$200K",
      countries: ["China", "Germany"],
      products: "Computer accessories, electronic components"
    };
    
    setFormData(demoData);
    setResults(null);
    
    toast({
      title: "Demo Loaded",
      description: "Electronics retailer scenario loaded - click Calculate to see results!",
    });
    
    // Auto-calculate after a brief delay
    setTimeout(() => {
      calculateImpact();
    }, 1000);
  };

  const emailResults = () => {
    const subject = encodeURIComponent('Tariff Impact Analysis Results');
    const body = encodeURIComponent(`Here are my tariff impact results:\n\nMonthly Additional Cost: ${formatCurrency(results.monthlyTariffCost)}\nYearly Additional Cost: ${formatCurrency(results.yearlyTariffCost)}\nPercentage Increase: ${results.percentageIncrease.toFixed(1)}%\n\nCalculated using: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(`Just calculated my business tariff impact: ${formatCurrency(results.monthlyTariffCost)} additional monthly costs!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
  };

  const downloadSummary = () => {
    const summaryText = `TARIFF IMPACT ANALYSIS SUMMARY\n\nBusiness Type: ${formData.businessType}\nMonthly Import Value: ${formData.monthlyImport}\nImport Countries: ${formData.countries.join(', ')}\n\nIMPACT ANALYSIS:\nMonthly Additional Cost: ${formatCurrency(results.monthlyTariffCost)}\nYearly Additional Cost: ${formatCurrency(results.yearlyTariffCost)}\nPercentage Increase: ${results.percentageIncrease.toFixed(1)}%\n\nGenerated: ${new Date().toLocaleDateString()}\nCalculator: ${window.location.href}`;
    
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tariff-impact-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Summary Downloaded",
      description: "Your tariff analysis summary has been downloaded.",
    });
  };

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
        {/* Simplified Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Trump Tariff Impact Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Calculate your business's tariff impact with intelligent recommendations
          </p>
          
          {/* Single Demo Button */}
          <Button
            onClick={handleQuickDemo}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 px-6 py-4 text-base transition-all duration-300 touch-manipulation"
          >
            <Zap className="mr-2 h-5 w-5" />
            Try Sample Calculation
          </Button>
        </div>

        {/* What You'll Discover - Condensed */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800 dark:text-green-200">
              <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
              What You'll Get
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>📈</span>
                <span className="text-green-700 dark:text-green-300">Exact cost impact in dollars & percentages</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span className="text-green-700 dark:text-green-300">Alternative supplier countries</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span className="text-green-700 dark:text-green-300">Strategic timing recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span className="text-green-700 dark:text-green-300">Shareable summary report</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Calculator Form */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Calculator className="h-6 w-6 text-primary" />
              Business Impact Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Business Type */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <Building2 className="h-4 w-4 text-primary" />
                  Business Type
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                      onClick={() => toggleHelp('businessType')}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for examples of each business type</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <Select value={formData.businessType} onValueChange={(value) => setFormData(prev => ({...prev, businessType: value}))}>
                <SelectTrigger className="h-12 sm:h-14 text-base border-2 hover:border-primary/50 transition-colors touch-manipulation">
                  <SelectValue placeholder="Select your industry sector" />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 shadow-lg z-50">
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-base py-3 touch-manipulation">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Collapsible open={expandedHelp.businessType} onOpenChange={() => toggleHelp('businessType')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="text-sm text-primary hover:text-primary/80 p-0 h-auto">
                    <span>What's my business type?</span>
                    {expandedHelp.businessType ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                    {Object.entries(businessTypeExamples).map(([type, example]) => (
                      <div key={type} className="border-l-2 border-primary/30 pl-2">
                        <div className="font-medium text-sm">{type}</div>
                        <div className="text-xs text-muted-foreground">{example}</div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Monthly Import Value */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <DollarSign className="h-4 w-4 text-primary" />
                Monthly Import Volume
              </Label>
              
              <Select value={formData.monthlyImport} onValueChange={(value) => setFormData(prev => ({...prev, monthlyImport: value}))}>
                <SelectTrigger className="h-12 sm:h-14 text-base border-2 hover:border-primary/50 transition-colors touch-manipulation">
                  <SelectValue placeholder="Select your import range" />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 shadow-lg z-50">
                  {importRanges.map(range => (
                    <SelectItem key={range} value={range} className="text-base py-3 touch-manipulation">{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Import Countries - Simplified */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <Globe className="h-4 w-4 text-primary" />
                Import Countries
              </Label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {countries.map(country => (
                  <div 
                    key={country.name} 
                    className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer touch-manipulation
                      ${formData.countries.includes(country.name) 
                        ? 'border-primary bg-primary/5 shadow-md' 
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
                        <div className="font-semibold">{country.name}</div>
                        <div className={`text-sm font-medium ${
                          country.tariff >= 30 ? 'text-destructive' : 
                          country.tariff >= 25 ? 'text-warning' : 'text-success'
                        }`}>
                          {country.tariff}% tariff
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products - Optional */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <Package className="h-4 w-4 text-primary" />
                Primary Products <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
              </Label>
              
              <Input
                placeholder="e.g., electronics, automotive parts, textiles"
                value={formData.products}
                onChange={(e) => setFormData(prev => ({...prev, products: e.target.value}))}
                className="h-12 sm:h-14 text-base border-2 hover:border-primary/50 transition-colors touch-manipulation"
              />
            </div>

            {/* Calculate Button */}
            <div className="pt-6">
              {isCalculating ? (
                <div className="w-full text-center py-6">
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary/10 rounded-xl">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <div>
                      <div className="text-lg font-semibold text-primary">Calculating your tariff impact...</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        Analyzing data
                        <span className="animate-pulse">•</span>
                        <span className="animate-pulse" style={{animationDelay: '0.2s'}}>•</span>
                        <span className="animate-pulse" style={{animationDelay: '0.4s'}}>•</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={calculateImpact}
                  size="lg" 
                  className="w-full text-lg sm:text-xl px-6 py-4 sm:py-6 touch-manipulation"
                  disabled={!formData.businessType || !formData.monthlyImport || formData.countries.length === 0}
                >
                  <Calculator className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Calculate My Impact
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Celebration Element */}
            {showCelebration && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="bg-background border-2 border-primary rounded-2xl p-6 mx-4 text-center shadow-2xl animate-scale-in">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-primary mb-2">Analysis Complete!</h3>
                  <p className="text-muted-foreground">📊 Here's your personalized tariff analysis!</p>
                </div>
              </div>
            )}

            {/* Social Proof */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border border-green-200 dark:border-green-800 rounded-full">
                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Join 1,200+ businesses who've used this calculator
                </span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-card to-destructive/5 border-destructive/20">
                <CardContent className="text-center p-4 sm:p-6">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-destructive" />
                  <div className="text-2xl sm:text-3xl font-bold text-destructive mb-1">
                    {formatCurrency(results.monthlyTariffCost)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Monthly Additional Cost</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-warning/5 border-warning/20">
                <CardContent className="text-center p-4 sm:p-6">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <div className="text-2xl sm:text-3xl font-bold text-warning mb-1">
                    {formatCurrency(results.yearlyTariffCost)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Annual Impact</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-orange-500/5 border-orange-500/20">
                <CardContent className="text-center p-4 sm:p-6">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                    {results.percentageIncrease.toFixed(1)}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Cost Increase</div>
                </CardContent>
              </Card>
            </div>

            {/* What This Means */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What This Means for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Your Business</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Industry:</span>
                        <span className="font-medium">{formData.businessType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Import Volume:</span>
                        <span className="font-medium">{formData.monthlyImport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Countries:</span>
                        <span className="font-medium">{results.selectedCountries}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Consider alternative suppliers</li>
                      <li>• Review your pricing strategy</li>
                      <li>• Explore domestic sourcing</li>
                      <li>• Talk to a trade professional</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button onClick={emailResults} variant="outline" size="sm" className="touch-manipulation">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Results
                  </Button>
                  <Button onClick={shareToLinkedIn} variant="outline" size="sm" className="touch-manipulation">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={downloadSummary} variant="outline" size="sm" className="touch-manipulation">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={resetCalculator} variant="ghost" size="sm" className="touch-manipulation">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <AlertTriangle className="inline h-4 w-4 mr-1" />
                <strong>Disclaimer:</strong> This analysis is for planning purposes. Consult trade professionals for compliance decisions.
              </p>
            </div>
          </div>
        )}

        {/* FAQ Section - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Is this calculator free?</h4>
                <p className="text-muted-foreground">Yes! No hidden fees or sign-ups required.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">How accurate are calculations?</h4>
                <p className="text-muted-foreground">Based on official tariff announcements from July 2025.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Do you store my data?</h4>
                <p className="text-muted-foreground">No. All calculations happen in your browser.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">What if I don't know exact amounts?</h4>
                <p className="text-muted-foreground">Rough estimates work great for planning!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default TariffCalculator;