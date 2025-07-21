import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Globe,
  Calendar
} from 'lucide-react';

interface SmartRecommendationProps {
  results: any;
  formData: any;
}

// Simulated AI recommendation engine
const generateSmartRecommendations = (formData: any, results: any) => {
  const recommendations = [];

  // Country-specific supplier alternatives
  const supplierAlternatives: { [key: string]: Array<{country: string, tariff: number, advantage: string}> } = {
    'China': [
      { country: 'Vietnam', tariff: 15, advantage: 'Lower labor costs, growing manufacturing base' },
      { country: 'India', tariff: 10, advantage: 'Large-scale production capacity, English-speaking workforce' },
      { country: 'Thailand', tariff: 12, advantage: 'Advanced infrastructure, automotive expertise' }
    ],
    'Germany': [
      { country: 'Czech Republic', tariff: 8, advantage: 'EU access, skilled workforce, proximity to Germany' },
      { country: 'Poland', tariff: 6, advantage: 'Growing manufacturing, cost-effective production' }
    ],
    'Mexico': [
      { country: 'Colombia', tariff: 18, advantage: 'Trade agreements with US, growing manufacturing' },
      { country: 'Costa Rica', tariff: 14, advantage: 'Skilled workforce, stable political environment' }
    ]
  };

  // Generate supplier recommendations
  formData.countries.forEach((country: string) => {
    if (supplierAlternatives[country]) {
      supplierAlternatives[country].forEach(alt => {
        recommendations.push({
          type: 'supplier',
          priority: 'high',
          title: `Consider ${alt.country} as ${country} Alternative`,
          description: `${alt.tariff}% tariff vs ${results.avgTariff}% current rate. ${alt.advantage}`,
          savings: Math.round((results.avgTariff - alt.tariff) / 100 * results.importValue),
          timeline: '3-6 months',
          complexity: alt.tariff < 15 ? 'Medium' : 'High',
          icon: <MapPin className="h-5 w-5" />
        });
      });
    }
  });

  // Industry-specific recommendations
  const industryRecommendations: { [key: string]: any } = {
    'Technology/Electronics': [
      {
        type: 'strategy',
        priority: 'high',
        title: 'Domestic Assembly Strategy',
        description: 'Import components, assemble domestically to reduce finished goods tariffs',
        savings: Math.round(results.monthlyTariffCost * 0.4),
        timeline: '6-12 months',
        complexity: 'High',
        icon: <Target className="h-5 w-5" />
      }
    ],
    'Manufacturing': [
      {
        type: 'diversification',
        priority: 'medium',
        title: 'Multi-Source Supply Chain',
        description: 'Split sourcing across 3+ countries to reduce single-country risk',
        savings: Math.round(results.monthlyTariffCost * 0.25),
        timeline: '4-8 months',
        complexity: 'Medium',
        icon: <Globe className="h-5 w-5" />
      }
    ],
    'Textiles/Clothing': [
      {
        type: 'timing',
        priority: 'high',
        title: 'Seasonal Optimization',
        description: 'Shift orders to Q1/Q2 when shipping costs are lower and capacity higher',
        savings: Math.round(results.monthlyTariffCost * 0.15),
        timeline: '1-3 months',
        complexity: 'Low',
        icon: <Calendar className="h-5 w-5" />
      }
    ]
  };

  if (industryRecommendations[formData.businessType]) {
    recommendations.push(...industryRecommendations[formData.businessType]);
  }

  // Pricing strategy recommendations
  if (results.percentageIncrease > 20) {
    recommendations.push({
      type: 'pricing',
      priority: 'high',
      title: 'Gradual Price Increase Strategy',
      description: 'Implement 3-phase pricing: +8% immediately, +7% in 3 months, +5% in 6 months',
      savings: 0,
      timeline: '6 months',
      complexity: 'Low',
      icon: <TrendingUp className="h-5 w-5" />
    });
  }

  return recommendations.slice(0, 6); // Top 6 recommendations
};

export const SmartRecommendationsEngine: React.FC<SmartRecommendationProps> = ({ results, formData }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  useEffect(() => {
    if (results && formData) {
      const smartRecs = generateSmartRecommendations(formData, results);
      setRecommendations(smartRecs);
    }
  }, [results, formData]);

  if (!results || recommendations.length === 0) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
            <Brain className="text-white h-6 w-6" />
          </div>
          AI-Powered Smart Recommendations
        </CardTitle>
        <p className="text-muted-foreground">Intelligent strategies tailored to your business profile</p>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recommendations List */}
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedRecommendation?.title === rec.title 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 bg-white hover:border-primary/50'
                }`}
                onClick={() => setSelectedRecommendation(rec)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <Badge className={`text-xs px-2 py-1 ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      {rec.savings > 0 && (
                        <span className="text-green-600 font-medium">
                          Save ${rec.savings.toLocaleString()}/mo
                        </span>
                      )}
                      <span className="text-blue-600">{rec.timeline}</span>
                      <span className="text-gray-600">{rec.complexity} complexity</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          <div className="lg:pl-6">
            {selectedRecommendation ? (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {selectedRecommendation.icon}
                    {selectedRecommendation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedRecommendation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${selectedRecommendation.savings.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Monthly Savings</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedRecommendation.timeline}
                      </div>
                      <div className="text-xs text-muted-foreground">Implementation</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">Implementation Steps:</h5>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Research and validate new suppliers/markets
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Conduct pilot orders and quality testing
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Negotiate contracts and pricing terms
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Implement gradual transition plan
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="premium">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Get Detailed Implementation Guide
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a recommendation to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdvancedAnalyticsDashboard: React.FC<SmartRecommendationProps> = ({ results, formData }) => {
  if (!results) return null;

  const generateScenarioData = (tariffIncrease: number) => {
    const baseCost = results.monthlyTariffCost;
    const newCost = (results.importValue * tariffIncrease) / 100;
    return {
      monthly: newCost,
      yearly: newCost * 12,
      increase: ((newCost - baseCost) / baseCost) * 100
    };
  };

  const scenarios = [
    { name: 'Current', tariff: results.avgTariff, data: results },
    { name: '50% Tariff', tariff: 50, data: generateScenarioData(50) },
    { name: '75% Tariff', tariff: 75, data: generateScenarioData(75) },
    { name: '100% Tariff', tariff: 100, data: generateScenarioData(100) }
  ];

  return (
    <Card className="shadow-xl border-2 border-accent/20 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
            <BarChart3 className="text-white h-6 w-6" />
          </div>
          Advanced Analytics Dashboard
        </CardTitle>
        <p className="text-muted-foreground">Scenario modeling and vulnerability analysis</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scenarios">Scenario Modeling</TabsTrigger>
            <TabsTrigger value="timeline">Impact Timeline</TabsTrigger>
            <TabsTrigger value="vulnerability">Risk Heat Map</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario, index) => (
                <Card key={index} className={`border-2 ${index === 0 ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold mb-2">{scenario.name}</h4>
                    <div className="text-2xl font-bold text-destructive mb-1">
                      ${scenario.data.monthly?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Cost</div>
                    <div className="text-lg font-semibold text-warning mt-2">
                      {scenario.tariff}% Tariff
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">12-Month Impact Projection</h4>
              {[...Array(12)].map((_, month) => {
                const monthlyImpact = results.monthlyTariffCost * (1 + (month * 0.02)); // 2% monthly increase
                const cumulative = monthlyImpact * (month + 1);
                return (
                  <div key={month} className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                    <div className="w-20 text-sm font-medium">
                      Month {month + 1}
                    </div>
                    <div className="flex-1">
                      <Progress value={(month + 1) * 8.33} className="h-2" />
                    </div>
                    <div className="w-32 text-right">
                      <div className="font-semibold">${monthlyImpact.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        ${cumulative.toLocaleString()} total
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="vulnerability" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Supply Chain Risk Assessment</h4>
                {formData.countries.map((country: string, index: number) => {
                  const countryTariff = {
                    'China': 30, 'Mexico': 25, 'Germany': 40, 
                    'Japan': 24, 'South Korea': 35, 'Other': 20
                  }[country] || 20;
                  
                  const riskLevel = countryTariff > 30 ? 'High' : countryTariff > 25 ? 'Medium' : 'Low';
                  const riskColor = riskLevel === 'High' ? 'bg-red-500' : 
                                   riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500';
                  
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                      <div className={`w-4 h-4 rounded-full ${riskColor}`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{country}</div>
                        <div className="text-sm text-muted-foreground">{countryTariff}% tariff rate</div>
                      </div>
                      <Badge variant={riskLevel === 'High' ? 'destructive' : 'secondary'}>
                        {riskLevel} Risk
                      </Badge>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Industry Vulnerability</h4>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{formData.businessType}</span>
                    <span className="text-sm text-muted-foreground">vs Industry Average</span>
                  </div>
                  <Progress value={75} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    Your {results.percentageIncrease.toFixed(1)}% vs 18% industry average
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};