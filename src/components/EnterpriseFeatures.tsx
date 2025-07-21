import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { differenceInDays, isAfter, parseISO } from 'date-fns';
import { Clock, AlertTriangle, Shield, Target, TrendingUp, DollarSign, Globe } from 'lucide-react';

interface EnterpriseFeatureProps {
  results: any;
  formData: any;
}

// Currency rates (in production, fetch from API)
const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CAD: 1.35
};

export const TimelineAwareness = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const tariffDate = parseISO('2025-08-01');
  const isActive = isAfter(currentTime, tariffDate);
  const daysUntil = differenceInDays(tariffDate, currentTime);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="relative overflow-hidden shadow-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent">
            <Clock className="text-white h-6 w-6" />
          </div>
          Tariff Implementation Status
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        {!isActive ? (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-warning">
              {daysUntil > 0 ? daysUntil : 0} Days
            </div>
            <p className="text-lg text-muted-foreground">
              Until tariffs take effect (August 1, 2025)
            </p>
            <Badge className="text-lg px-4 py-2 bg-warning text-warning-foreground">
              ⏰ Preparation Phase - Plan Now
            </Badge>
            <div className="mt-4 p-4 bg-warning/10 rounded-xl border border-warning/20">
              <p className="text-sm font-medium text-warning">
                💡 Strategic Window: Use this time to diversify suppliers, build inventory, or negotiate contracts
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-destructive">
              ACTIVE
            </div>
            <p className="text-lg text-muted-foreground">
              Tariffs are now in effect
            </p>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              🚨 Current Impact - Calculate Now
            </Badge>
            <div className="mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <p className="text-sm font-medium text-destructive">
                ⚠️ Active Phase: Focus on cost optimization and margin management strategies
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TariffSurvivalScore: React.FC<EnterpriseFeatureProps> = ({ results, formData }) => {
  if (!results) return null;

  // Calculate survival score based on multiple factors
  const calculateSurvivalScore = () => {
    let score = 100;
    
    // Tariff rate impact (0-40 points deducted)
    const avgTariff = results.avgTariff;
    score -= Math.min(avgTariff * 1.2, 40);
    
    // Volume impact (0-25 points deducted)
    const volumeDeduction = {
      'Under $10K': 5,
      '$10K-$50K': 10,
      '$50K-$200K': 15,
      '$200K-$1M': 20,
      'Over $1M': 25
    }[formData.monthlyImport] || 0;
    score -= volumeDeduction;
    
    // Country diversification bonus (0-15 points added)
    const diversificationBonus = Math.min(formData.countries.length * 3, 15);
    score += diversificationBonus;
    
    // Industry risk (0-20 points deducted)
    const industryRisk = {
      'Technology/Electronics': 20,
      'Manufacturing': 15,
      'Automotive': 18,
      'Textiles/Clothing': 12,
      'Retail/E-commerce': 10,
      'Food & Beverage': 8,
      'Other': 10
    }[formData.businessType] || 10;
    score -= industryRisk;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = calculateSurvivalScore();
  
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' };
    if (score >= 60) return { level: 'Moderate Risk', color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning/20' };
    if (score >= 40) return { level: 'High Risk', color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-200' };
    return { level: 'Critical Risk', color: 'text-destructive', bgColor: 'bg-destructive/10', borderColor: 'border-destructive/20' };
  };

  const risk = getRiskLevel(score);

  return (
    <Card className={`relative overflow-hidden shadow-xl border-2 ${risk.borderColor} ${risk.bgColor}`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent">
            <Shield className="text-white h-6 w-6" />
          </div>
          Tariff Survival Score
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6">
        <div className="text-center">
          <div className="text-6xl font-bold mb-2" style={{ color: risk.color.replace('text-', '') }}>
            {score}
          </div>
          <div className="text-lg font-semibold mb-4" style={{ color: risk.color.replace('text-', '') }}>
            {risk.level}
          </div>
          <Progress value={score} className="h-4 mb-4" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{formData.countries.length}</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary">{results.avgTariff.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Avg. Tariff</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Score Factors:</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• Tariff exposure: {results.avgTariff.toFixed(1)}% impact</div>
            <div>• Volume risk: {formData.monthlyImport}</div>
            <div>• Supplier diversity: {formData.countries.length} countries</div>
            <div>• Industry vulnerability: {formData.businessType}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CurrencyConverter: React.FC<EnterpriseFeatureProps> = ({ results }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  if (!results) return null;

  const convertAmount = (amount: number) => {
    return (amount / CURRENCY_RATES[selectedCurrency as keyof typeof CURRENCY_RATES]);
  };

  const formatCurrency = (amount: number) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$' };
    const symbol = symbols[selectedCurrency as keyof typeof symbols];
    return `${symbol}${convertAmount(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Card className="shadow-xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-accent to-primary">
            <Globe className="text-white h-5 w-5" />
          </div>
          Multi-Currency Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Currency:</span>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">🇺🇸 USD</SelectItem>
              <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
              <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
              <SelectItem value="CAD">🇨🇦 CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(results.monthlyTariffCost)}
            </div>
            <div className="text-sm text-muted-foreground">Monthly Cost</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-warning">
              {formatCurrency(results.yearlyTariffCost)}
            </div>
            <div className="text-sm text-muted-foreground">Annual Cost</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CostOffsetCalculator: React.FC<EnterpriseFeatureProps> = ({ results }) => {
  if (!results) return null;

  const priceIncrease = ((results.monthlyTariffCost / results.importValue) * 100);
  const costSavingsNeeded = results.monthlyTariffCost;

  return (
    <Card className="shadow-xl border-2 border-warning/20 bg-gradient-to-br from-warning/5 to-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-warning to-orange-500">
            <Target className="text-white h-5 w-5" />
          </div>
          Margin Protection Strategy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">To maintain current margins, you need to:</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="text-2xl font-bold text-primary mb-1">
              {priceIncrease.toFixed(1)}%
            </div>
            <div className="text-sm font-medium text-muted-foreground">Price Increase</div>
            <div className="text-xs text-muted-foreground mt-1">Pass costs to customers</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-success/10 to-emerald-100 border border-success/20">
            <div className="text-2xl font-bold text-success mb-1">
              ${costSavingsNeeded.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-muted-foreground">Cost Savings</div>
            <div className="text-xs text-muted-foreground mt-1">Find operational efficiencies</div>
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">💡 Recommended Actions:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Negotiate volume discounts with existing suppliers</li>
            <li>• Optimize logistics and shipping costs</li>
            <li>• Consider long-term supplier contracts</li>
            <li>• Explore automation to reduce labor costs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};