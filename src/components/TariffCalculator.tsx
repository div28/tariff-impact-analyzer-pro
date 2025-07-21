import React, { useState, useEffect } from 'react';
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
import { TimelineAwareness, TariffSurvivalScore, CurrencyConverter, CostOffsetCalculator } from '@/components/EnterpriseFeatures';
import { TariffInsuranceCalculator, ProfessionalExportTools, LegalDisclaimer } from '@/components/AdvancedFeatures';
import { SmartRecommendationsEngine, AdvancedAnalyticsDashboard } from '@/components/IntelligentFeatures';
import { QuickCalculateMode, BusinessProfileManager, CalculationHistory } from '@/components/UserExperienceFeatures';

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
  const [showStickyDemo, setShowStickyDemo] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [expandedHelp, setExpandedHelp] = useState<{[key: string]: boolean}>({});
  const [currentStep, setCurrentStep] = useState(1);

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

  // Progress calculation
  const calculateProgress = () => {
    let completed = 0;
    if (formData.businessType) completed++;
    if (formData.monthlyImport) completed++;
    if (formData.countries.length > 0) completed++;
    return Math.round((completed / 3) * 100);
  };

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
    
    // Extended loading with encouraging messages
    const loadingMessages = [
      "Analyzing your tariff exposure...",
      "Calculating cost impacts...",
      "Finding alternative suppliers...",
      "Generating recommendations...",
      "Almost ready!"
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 600);
    
    // Simulate comprehensive analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(messageInterval);

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

  const handleQuickCalculate = (quickData: any) => {
    setFormData(quickData);
    toast({
      title: "Quick Scenario Loaded",
      description: `${quickData.businessType} scenario has been applied.`,
    });
  };

  const handleLoadProfile = (profile: any) => {
    setFormData({
      businessType: profile.businessType,
      monthlyImport: profile.monthlyImport,
      countries: profile.countries,
      products: profile.products
    });
    toast({
      title: "Profile Loaded",
      description: `Business profile "${profile.name}" has been loaded.`,
    });
  };

  const emailResults = () => {
    const subject = encodeURIComponent('Tariff Impact Analysis Results');
    const body = encodeURIComponent(`Here are my tariff impact results:\n\nMonthly Additional Cost: ${formatCurrency(results.monthlyTariffCost)}\nYearly Additional Cost: ${formatCurrency(results.yearlyTariffCost)}\nPercentage Increase: ${results.percentageIncrease.toFixed(1)}%\n\nCalculated using: ${window.location.href}\n\nBest regards`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(`Just calculated my business tariff impact: ${formatCurrency(results.monthlyTariffCost)} additional monthly costs! Every importer should check their exposure.`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
  };

  const downloadSummary = () => {
    const summaryText = `TARIFF IMPACT ANALYSIS SUMMARY\n\nBusiness Type: ${formData.businessType}\nMonthly Import Value: ${formData.monthlyImport}\nImport Countries: ${formData.countries.join(', ')}\nProducts: ${formData.products}\n\nIMPACT ANALYSIS:\nMonthly Additional Cost: ${formatCurrency(results.monthlyTariffCost)}\nYearly Additional Cost: ${formatCurrency(results.yearlyTariffCost)}\nPercentage Increase: ${results.percentageIncrease.toFixed(1)}%\n\nGenerated: ${new Date().toLocaleDateString()}\nCalculator: ${window.location.href}\n\nDisclaimer: This analysis is for planning purposes. Consult trade professionals for compliance decisions.`;
    
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

  const handleQuickDemo = () => {
    const demoData = {
      businessType: "Technology/Electronics",
      monthlyImport: "$50K-$200K",
      countries: ["China", "Germany"],
      products: "Computer accessories, electronic components, LED displays, networking equipment"
    };
    
    setFormData(demoData);
    setResults(null);
    
    toast({
      title: "Demo Loaded",
      description: "Electronics retailer scenario loaded - click Calculate to see results!",
    });
    
    // Auto-calculate after a brief delay to show the demo
    setTimeout(() => {
      calculateImpact();
    }, 1000);
  };

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Header Section with Progress */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professional Impact Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Enterprise-grade tariff calculations with intelligent recommendations
          </p>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of 3</span>
              <span>{calculateProgress()}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span className={currentStep >= 1 ? 'text-primary font-medium' : ''}>Business Info</span>
              <span className={currentStep >= 2 ? 'text-primary font-medium' : ''}>Countries</span>
              <span className={currentStep >= 3 ? 'text-primary font-medium' : ''}>Calculate</span>
            </div>
          </div>
        
        {/* Quick Demo Button */}
        <div className="mb-8">
          <Button
            onClick={handleQuickDemo}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 px-8 py-4 text-lg sm:text-xl transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="mr-2 h-6 w-6" />
            See Sample Results First →
            <span className="ml-2 text-sm bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">Electronics Demo</span>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Not sure where to start? Try our pre-filled example first
          </p>
        </div>
      </div>

      {/* Sticky Demo Button for Mobile */}
      {showStickyDemo && !results && (
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <Button
            onClick={handleQuickDemo}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg rounded-full px-6 py-3 text-base font-semibold"
          >
            <Zap className="mr-2 h-5 w-5" />
            Try Demo
          </Button>
        </div>
      )}

      {/* What You'll Discover Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800 shadow-lg mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-green-800 dark:text-green-200">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
              <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            What You'll Discover
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-lg">📈</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Exact Financial Impact</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Precise cost increases in dollars and percentages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🌍</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Alternative Suppliers</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Countries with lower tariff rates for your products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📅</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Strategic Timing</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Should you order before Aug 1st deadline?</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-lg">💰</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Money-Saving Strategies</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Custom recommendations for your business type</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📄</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Shareable Summary</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">Professional report for your team or investors</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Realistic Example */}
          <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">📊 Sample Analysis:</h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>$100K monthly imports from China</strong> = $30K additional annual cost (30% tariff).<br />
              <strong>Alternative: Vietnam at 20%</strong> saves $10K/year.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-12 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Is this calculator really free?</h4>
                <p className="text-muted-foreground text-sm">
                  Yes! Built to help small businesses navigate tariff uncertainty. No hidden fees or sign-ups required.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">How accurate are the calculations?</h4>
                <p className="text-muted-foreground text-sm">
                  Based on official Trump administration tariff announcements from July 2025. Always consult trade professionals for final compliance decisions.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">What if I don't know my exact import amounts?</h4>
                <p className="text-muted-foreground text-sm">
                  Rough estimates work great for planning! The calculator is designed to give you helpful insights even with approximate numbers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Do you store my business information?</h4>
                <p className="text-muted-foreground text-sm">
                  No. All calculations happen in your browser. We don't collect, store, or share your data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Features */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <QuickCalculateMode onQuickCalculate={handleQuickCalculate} />
        <BusinessProfileManager currentProfile={formData} onLoadProfile={handleLoadProfile} />
        <CalculationHistory />
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
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2 text-lg font-semibold">
                  <Building2 className="h-5 w-5 text-primary" />
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
                <SelectTrigger className="h-16 text-lg border-2 hover:border-primary/50 transition-colors touch-manipulation">
                  <SelectValue placeholder="Select your industry sector" />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 shadow-lg z-50">
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-lg py-4 touch-manipulation">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>💡 Choose the closest match - we'll adjust recommendations</span>
              </div>
              
              <Collapsible open={expandedHelp.businessType} onOpenChange={() => toggleHelp('businessType')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="text-sm text-primary hover:text-primary/80 p-0 h-auto">
                    <span>What's my business type?</span>
                    {expandedHelp.businessType ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm mb-3">Examples for each category:</h4>
                    {Object.entries(businessTypeExamples).map(([type, example]) => (
                      <div key={type} className="border-l-2 border-primary/30 pl-3">
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
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Approximate Monthly Imports (rough estimates work fine!)
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                      onClick={() => toggleHelp('importValue')}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn how to estimate your import value</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <Select value={formData.monthlyImport} onValueChange={(value) => setFormData(prev => ({...prev, monthlyImport: value}))}>
                <SelectTrigger className="h-16 text-lg border-2 hover:border-primary/50 transition-colors touch-manipulation">
                  <SelectValue placeholder="Select your import range" />
                </SelectTrigger>
                <SelectContent className="bg-background border-2 shadow-lg z-50">
                  {importRanges.map(range => (
                    <SelectItem key={range} value={range} className="text-lg py-4 touch-manipulation">{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>💡 Include product costs + shipping - estimates are perfectly fine</span>
              </div>
              
              <Collapsible open={expandedHelp.importValue} onOpenChange={() => toggleHelp('importValue')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="text-sm text-primary hover:text-primary/80 p-0 h-auto">
                    <span>How to estimate import value?</span>
                    {expandedHelp.importValue ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm mb-3">What to include in your estimate:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Product costs:</strong> What you pay suppliers</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Shipping:</strong> International freight costs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Insurance:</strong> If applicable</span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded border-l-2 border-blue-300">
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <strong>Industry benchmarks:</strong> Electronics importers: $50K-$500K monthly • Automotive: $100K-$1M+ • Textiles: $20K-$200K
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Import Countries - Premium Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Globe className="h-5 w-5 text-primary" />
                Import Countries & Tariff Rates
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                    onClick={() => toggleHelp('countries')}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>See which countries have the highest tariff impact</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>💡 Select all countries you currently import from</span>
            </div>
            
            <Collapsible open={expandedHelp.countries} onOpenChange={() => toggleHelp('countries')}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="text-sm text-primary hover:text-primary/80 p-0 h-auto mb-4">
                  <span>Which countries matter most?</span>
                  {expandedHelp.countries ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mb-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-3">Top tariff-affected countries:</h4>
                  <div className="space-y-2">
                    {topTariffCountries.map(country => (
                      <div key={country.name} className="flex justify-between items-center p-2 bg-background rounded border">
                        <div>
                          <span className="font-medium">{country.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({country.note})</span>
                        </div>
                        <span className={`font-bold ${
                          parseFloat(country.rate) >= 30 ? 'text-destructive' : 
                          parseFloat(country.rate) >= 25 ? 'text-warning' : 'text-success'
                        }`}>{country.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {countries.map(country => (
                <div 
                  key={country.name} 
                  className={`group relative p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer touch-manipulation min-h-[80px] flex items-center
                    ${formData.countries.includes(country.name) 
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  onClick={() => handleCountryChange(country.name, !formData.countries.includes(country.name))}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <Checkbox
                      id={country.name}
                      checked={formData.countries.includes(country.name)}
                      onCheckedChange={(checked) => handleCountryChange(country.name, checked as boolean)}
                      className="scale-150"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-xl">{country.name}</div>
                      <div className={`text-base font-medium ${
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
            
            {/* Instant Preview Warnings */}
            {formData.countries.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.countries.includes('China') && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      ⚠️ China imports face 30% tariffs starting Aug 1st
                    </span>
                  </div>
                )}
                {formData.countries.includes('Germany') && (
                  <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">
                      ⚠️ Germany imports face 40% tariffs
                    </span>
                  </div>
                )}
                {formData.countries.includes('Mexico') && (
                  <div className="flex items-center gap-2 p-3 bg-orange-100 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      ⚠️ Mexico imports face 25% tariffs
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary Products */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-2 text-lg font-semibold">
                <Package className="h-5 w-5 text-primary" />
                Primary Products
                <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
              </Label>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary h-auto p-1"
                onClick={() => setFormData(prev => ({...prev, products: ''}))}
              >
                Skip this field
              </Button>
            </div>
            
            <Input
              id="products"
              placeholder="e.g., consumer electronics, automotive components, textiles"
              value={formData.products}
              onChange={(e) => setFormData(prev => ({...prev, products: e.target.value}))}
              className="h-16 text-lg border-2 hover:border-primary/50 transition-colors touch-manipulation"
              inputMode="text"
              autoComplete="off"
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>💡 Examples: electronics, car parts, clothing, raw materials</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <strong>Why we ask:</strong> Helps us provide more specific supplier alternatives and industry recommendations
            </p>
          </div>

          {/* Quick Preview */}
          {formData.businessType && formData.monthlyImport && formData.countries.length > 0 && (
            <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-800 dark:text-blue-200 text-lg">Quick Preview</span>
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-base">
                Your scenario could mean approximately <strong className="text-xl">${(getImportValue(formData.monthlyImport) * (countries.filter(c => formData.countries.includes(c.name)).reduce((sum, country) => sum + country.tariff, 0) / formData.countries.length) / 100).toLocaleString()}</strong> additional monthly costs
              </p>
            </div>
          )}

          {/* Calculate Button - Mobile Optimized */}
          <div className="pt-8">
            {isCalculating ? (
              <div className="w-full text-center py-8">
                <div className="inline-flex items-center gap-3 px-8 py-6 bg-primary/10 rounded-2xl">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-left">
                    <div className="text-xl font-semibold text-primary">Calculating your tariff impact...</div>
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
              <>
                <Button 
                  onClick={calculateImpact}
                  variant="premium" 
                  size="lg" 
                  className="w-full text-xl sm:text-2xl px-8 py-8 relative overflow-hidden group touch-manipulation"
                  disabled={!formData.businessType || !formData.monthlyImport || formData.countries.length === 0}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Calculator className="mr-3 h-7 w-7" />
                  Show Me My Results →
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-base text-muted-foreground mt-3">
                  Get detailed breakdown + money-saving recommendations
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section - Premium Analysis */}
      {results && (
        <div className="space-y-8">
          {/* Celebration Element */}
          {showCelebration && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="bg-background border-2 border-primary rounded-2xl p-8 mx-4 text-center shadow-2xl animate-scale-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Analysis Complete!</h3>
                <p className="text-muted-foreground">📊 Here's your personalized tariff analysis!</p>
              </div>
            </div>
          )}

          {/* Social Proof Banner */}
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border border-green-200 dark:border-green-800 rounded-full">
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Join 1,200+ businesses who've used this calculator
              </span>
            </div>
          </div>

          {/* Impact Summary Header */}
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-destructive/5 via-warning/5 to-orange-50">
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-warning/10"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-destructive">
                <div className="p-3 rounded-xl bg-gradient-to-r from-destructive to-warning">
                  <Sparkles className="text-white h-6 w-6" />
                </div>
                📊 Your Personalized Tariff Analysis
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
              
              {/* Professional Action Buttons */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-lg">Share & Export</h4>
                  <div className="space-y-3">
                    <Button 
                      onClick={emailResults}
                      variant="outline" 
                      className="w-full text-left justify-start"
                    >
                      <Mail className="mr-3 h-4 w-4" />
                      Email Results to My Team
                    </Button>
                    <Button 
                      onClick={shareToLinkedIn}
                      variant="outline" 
                      className="w-full text-left justify-start"
                    >
                      <Linkedin className="mr-3 h-4 w-4" />
                      Share on LinkedIn
                    </Button>
                    <Button 
                      onClick={downloadSummary}
                      variant="outline" 
                      className="w-full text-left justify-start"
                    >
                      <Download className="mr-3 h-4 w-4" />
                      Download Summary
                    </Button>
                    <div className="border-t pt-3 mt-4">
                      <Button 
                        onClick={resetCalculator}
                        variant="ghost" 
                        className="w-full text-left justify-start"
                      >
                        <RefreshCw className="mr-3 h-4 w-4" />
                        Start Over
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/30 border border-muted-foreground/20 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              <strong>Disclaimer:</strong> This analysis is for planning purposes. Consult trade professionals for compliance decisions.
            </p>
          </div>

          {/* Advanced Enterprise Features */}
          <TariffInsuranceCalculator results={results} formData={formData} />
          
          {/* Intelligent Features */}
          <SmartRecommendationsEngine results={results} formData={formData} />
          <AdvancedAnalyticsDashboard results={results} formData={formData} />
          
          <ProfessionalExportTools results={results} formData={formData} />
          <LegalDisclaimer />
        </div>
      )}
    </div>
    </TooltipProvider>
  );
};

export default TariffCalculator;