import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Brain, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Shield, 
  Target,
  ChevronDown,
  ArrowRight,
  Calculator,
  Lightbulb,
  BarChart3,
  Users,
  Zap,
  Globe,
  Package,
  Truck,
  Building,
  ChevronRight
} from 'lucide-react';

interface BusinessIntelligenceProps {
  results: any;
  formData: any;
}

const BusinessIntelligence: React.FC<BusinessIntelligenceProps> = ({ results, formData }) => {
  const [activeScenario, setActiveScenario] = useState<string>('');
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Business Scenario Questions
  const scenarioQuestions = [
    {
      id: 'concern',
      question: "What's your biggest concern about the tariff impact?",
      options: [
        { value: 'cost_increase', label: 'Cost increase hurting margins', icon: TrendingUp },
        { value: 'supply_disruption', label: 'Supply chain disruption', icon: AlertTriangle },
        { value: 'competition', label: 'Competitors gaining advantage', icon: Users },
        { value: 'cash_flow', label: 'Cash flow and working capital', icon: DollarSign }
      ]
    },
    {
      id: 'timeline',
      question: "What's your timeline flexibility?",
      options: [
        { value: 'must_ship_now', label: 'Must ship current orders immediately', icon: Clock },
        { value: 'can_wait_3months', label: 'Can delay up to 3 months', icon: Package },
        { value: 'very_flexible', label: 'Very flexible timing', icon: Target }
      ]
    },
    {
      id: 'risk_tolerance',
      question: "What's your risk tolerance for supply chain changes?",
      options: [
        { value: 'conservative', label: 'Conservative - stick with proven suppliers', icon: Shield },
        { value: 'moderate', label: 'Moderate - willing to test new suppliers', icon: BarChart3 },
        { value: 'aggressive', label: 'Aggressive - major supply chain overhaul', icon: Zap }
      ]
    }
  ];

  // Edge Case Scenarios
  const edgeCaseScenarios = [
    {
      id: 'payment_terms',
      title: 'Payment Terms Strategy',
      question: 'My supplier offers 60-day payment terms - should I order now and pay later?',
      analysis: (data: any) => {
        const financingCost = data.monthlyTariffCost * 0.05; // 5% annual rate
        const tariffSavings = data.monthlyTariffCost;
        const netBenefit = tariffSavings - financingCost;
        return {
          recommendation: netBenefit > 0 ? 'Order Now' : 'Wait',
          reasoning: `Financing cost: $${financingCost.toLocaleString()} vs Tariff savings: $${tariffSavings.toLocaleString()}`,
          netBenefit: `Net benefit: $${netBenefit.toLocaleString()}`,
          action: netBenefit > 0 ? 'Place order immediately with 60-day terms' : 'Better to wait and pay tariffs'
        };
      }
    },
    {
      id: 'shipping_method',
      title: 'Shipping Method Optimization',
      question: 'What if I change from sea to air freight to beat the deadline?',
      analysis: (data: any) => {
        const airFreightPremium = data.importValue * 0.15; // 15% premium for air
        const tariffSavings = data.monthlyTariffCost;
        const timeSavings = '3-4 weeks faster delivery';
        return {
          recommendation: airFreightPremium < tariffSavings ? 'Switch to Air' : 'Keep Sea Freight',
          reasoning: `Air freight premium: $${airFreightPremium.toLocaleString()} vs Tariff cost: $${tariffSavings.toLocaleString()}`,
          additionalBenefit: timeSavings,
          action: airFreightPremium < tariffSavings ? 'Switch high-value items to air freight' : 'Maintain sea freight and accept tariffs'
        };
      }
    },
    {
      id: 'origin_rules',
      title: 'Country of Origin Calculator',
      question: 'My product is 70% made in Vietnam, 30% in China - which rate applies?',
      analysis: (data: any) => {
        const vietnamRate = 15; // Assumed Vietnam rate
        const chinaRate = 30;
        const blendedRate = (vietnamRate * 0.7) + (chinaRate * 0.3);
        return {
          recommendation: 'Vietnam Rate Applies',
          reasoning: `Substantial transformation rule: >50% value from Vietnam qualifies for Vietnam rate`,
          actualRate: `${vietnamRate}% (Vietnam rate) vs ${chinaRate}% (China rate)`,
          savings: `Save ${(chinaRate - vietnamRate).toFixed(1)}% on tariff rate`
        };
      }
    },
    {
      id: 'inventory_choice',
      title: 'Inventory Optimization',
      question: 'Should I stockpile raw materials or finished goods?',
      analysis: (data: any) => {
        const rawMaterialCost = data.importValue * 0.4;
        const carryingCost = data.importValue * 0.2; // 20% annual carrying cost
        const finishedGoodsRisk = 'Higher obsolescence risk';
        return {
          recommendation: 'Raw Materials',
          reasoning: 'Lower carrying costs and less obsolescence risk',
          costComparison: `Raw materials: $${rawMaterialCost.toLocaleString()} vs Finished goods: $${data.importValue.toLocaleString()}`,
          riskFactor: 'Raw materials have 60% lower carrying cost and obsolescence risk'
        };
      }
    }
  ];

  const renderWizardQuestion = (questionIndex: number) => {
    const question = scenarioQuestions[questionIndex];
    if (!question) return null;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">{question.question}</h3>
          <p className="text-blue-100">Step {questionIndex + 1} of {scenarioQuestions.length}</p>
        </div>
        
        <RadioGroup 
          value={wizardAnswers[question.id] || ''} 
          onValueChange={(value) => setWizardAnswers(prev => ({ ...prev, [question.id]: value }))}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
              <RadioGroupItem value={option.value} id={option.value} className="border-white text-white" />
              <option.icon className="w-5 h-5 text-blue-200" />
              <Label htmlFor={option.value} className="text-white font-medium cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setWizardStep(prev => Math.max(0, prev - 1))}
            disabled={questionIndex === 0}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Previous
          </Button>
          <Button 
            onClick={() => setWizardStep(prev => prev + 1)}
            disabled={!wizardAnswers[question.id]}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            {questionIndex === scenarioQuestions.length - 1 ? 'Get Recommendations' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const generatePersonalizedRecommendations = () => {
    const { concern, timeline, risk_tolerance } = wizardAnswers;
    const recommendations = [];

    // Concern-based recommendations
    if (concern === 'cost_increase') {
      recommendations.push({
        title: 'Immediate Cost Mitigation',
        priority: 'High',
        actions: ['Negotiate extended payment terms', 'Lock in current pricing with 6-month contracts', 'Implement value engineering to reduce product costs'],
        timeframe: '1-2 months'
      });
    } else if (concern === 'supply_disruption') {
      recommendations.push({
        title: 'Supply Chain Resilience',
        priority: 'Critical',
        actions: ['Identify backup suppliers in non-tariff countries', 'Build strategic inventory buffer', 'Diversify supplier base geographically'],
        timeframe: '3-6 months'
      });
    }

    // Timeline-based recommendations
    if (timeline === 'must_ship_now') {
      recommendations.push({
        title: 'Emergency Shipping Strategy',
        priority: 'Urgent',
        actions: ['Expedite current orders via air freight', 'Secure bonded warehouse storage', 'Pre-pay tariffs to avoid delays'],
        timeframe: 'Immediate'
      });
    } else if (timeline === 'very_flexible') {
      recommendations.push({
        title: 'Strategic Optimization',
        priority: 'Medium',
        actions: ['Complete supplier audit and transition', 'Renegotiate all contracts with new terms', 'Implement lean inventory management'],
        timeframe: '6-12 months'
      });
    }

    // Risk tolerance based recommendations
    if (risk_tolerance === 'aggressive') {
      recommendations.push({
        title: 'Supply Chain Revolution',
        priority: 'High Impact',
        actions: ['Complete supplier base overhaul', 'Invest in supply chain technology', 'Consider vertical integration opportunities'],
        timeframe: '12-18 months'
      });
    }

    return recommendations;
  };

  return (
    <div className="space-y-6">
      
      {/* Business Scenario Wizard */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-blue-200" />
          <div>
            <h2 className="text-xl font-bold text-white">Business Scenario Wizard</h2>
            <p className="text-sm text-blue-100">Get personalized recommendations based on your specific situation</p>
          </div>
        </div>

        {wizardStep < scenarioQuestions.length ? (
          renderWizardQuestion(wizardStep)
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Your Personalized Action Plan</h3>
            </div>
            
            <div className="space-y-4">
              {generatePersonalizedRecommendations().map((rec, index) => (
                <div key={index} className="p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">{rec.title}</h4>
                    <Badge variant="secondary" className="bg-blue-500 text-white">
                      {rec.priority}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {rec.actions.map((action, i) => (
                      <li key={i} className="flex items-center gap-2 text-blue-100">
                        <ChevronRight className="w-4 h-4" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-blue-200 mt-2">Timeline: {rec.timeframe}</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => { setWizardStep(0); setWizardAnswers({}); }}
              variant="outline"
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Start Over
            </Button>
          </div>
        )}
      </Card>

      {/* Ask the Expert - Edge Cases */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Ask the Expert</h2>
            <p className="text-sm text-blue-100">Complex scenarios solved with AI-powered analysis</p>
          </div>
        </div>

        <div className="space-y-4">
          {edgeCaseScenarios.map((scenario) => (
            <Collapsible 
              key={scenario.id}
              open={expandedSections[scenario.id]} 
              onOpenChange={() => toggleSection(scenario.id)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium text-white text-left">{scenario.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${expandedSections[scenario.id] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30">
                  {(() => {
                    const analysis = scenario.analysis(results);
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-green-400" />
                          <span className="font-bold text-white">Recommendation: {analysis.recommendation}</span>
                        </div>
                        <p className="text-blue-100">{analysis.reasoning}</p>
                        {'netBenefit' in analysis && <p className="text-green-200 font-medium">{analysis.netBenefit}</p>}
                        {'additionalBenefit' in analysis && <p className="text-blue-200">{analysis.additionalBenefit}</p>}
                        {'actualRate' in analysis && <p className="text-yellow-200">{analysis.actualRate}</p>}
                        {'savings' in analysis && <p className="text-green-200">{analysis.savings}</p>}
                        {'costComparison' in analysis && <p className="text-blue-200">{analysis.costComparison}</p>}
                        {'riskFactor' in analysis && <p className="text-amber-200">{analysis.riskFactor}</p>}
                        {'action' in analysis && (
                          <div className="mt-3 p-3 bg-white/10 rounded border border-white/20">
                            <span className="font-medium text-white">Action: </span>
                            <span className="text-blue-100">{analysis.action}</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Card>

      {/* Advanced Features Tabs */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
        <Tabs defaultValue="classification" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="classification" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Package className="w-4 h-4 mr-2" />
              Classification
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Calculator className="w-4 h-4 mr-2" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="supply-chain" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
              <Truck className="w-4 h-4 mr-2" />
              Supply Chain
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classification" className="space-y-4">
            <h3 className="text-lg font-bold text-white">Product Classification Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">Mixed Shipment Analysis</h4>
                <p className="text-blue-100 text-sm">Calculate tariffs for containers with multiple product types</p>
                <Button size="sm" className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
                  Analyze Shipment
                </Button>
              </div>
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">HTS Code Assistant</h4>
                <p className="text-blue-100 text-sm">AI-powered tariff code identification and verification</p>
                <Button size="sm" className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
                  Find HTS Code
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <h3 className="text-lg font-bold text-white">Timeline Complexity Solver</h3>
            <div className="space-y-3">
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">Transit Time Calculator</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Ship Date" className="bg-white/20 border-white/30 text-white placeholder:text-blue-200" />
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Port" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shanghai">Shanghai</SelectItem>
                      <SelectItem value="shenzhen">Shenzhen</SelectItem>
                      <SelectItem value="qingdao">Qingdao</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">Calculate</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <h3 className="text-lg font-bold text-white">Financial Sophistication</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">Cash Flow Stress Test</h4>
                <p className="text-blue-100 text-sm mb-3">Can your business survive 6 months of higher costs?</p>
                <div className="space-y-2">
                  <Input placeholder="Monthly Operating Cash" className="bg-white/20 border-white/30 text-white placeholder:text-blue-200" />
                  <Input placeholder="Available Credit Line" className="bg-white/20 border-white/30 text-white placeholder:text-blue-200" />
                </div>
                <Button size="sm" className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
                  Run Stress Test
                </Button>
              </div>
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">Financing vs Pre-ordering</h4>
                <p className="text-blue-100 text-sm mb-3">Cost of capital vs tariff avoidance analysis</p>
                <div className="space-y-2">
                  <Input placeholder="Interest Rate %" className="bg-white/20 border-white/30 text-white placeholder:text-blue-200" />
                  <Input placeholder="Order Size" className="bg-white/20 border-white/30 text-white placeholder:text-blue-200" />
                </div>
                <Button size="sm" className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
                  Compare Options
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="supply-chain" className="space-y-4">
            <h3 className="text-lg font-bold text-white">Supply Chain Scenario Planning</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="font-semibold text-white mb-2">Supplier Diversification Planner</h4>
                <p className="text-blue-100 text-sm mb-3">Optimal country mix with risk/cost trade-offs</p>
                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Current Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="vietnam">Vietnam</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Risk Tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-2 bg-white text-blue-600 hover:bg-blue-50">
                  Generate Diversification Plan
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default BusinessIntelligence;