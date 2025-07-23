import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitCompare, TrendingUp, TrendingDown, AlertTriangle, Copy, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Scenario {
  id: string;
  name: string;
  formData: any;
  results: any;
  timestamp: Date;
}

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  onCreateScenario: () => void;
  onSelectScenario: (scenario: Scenario) => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  scenarios,
  onCreateScenario,
  onSelectScenario
}) => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const toggleScenarioSelection = (scenarioId: string) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else if (prev.length < 3) {
        return [...prev, scenarioId];
      } else {
        toast({
          title: "Selection Limit",
          description: "You can compare up to 3 scenarios at once.",
          variant: "destructive"
        });
        return prev;
      }
    });
  };

  const shareScenario = async (scenario: Scenario) => {
    const shareData = {
      title: `Tariff Impact Scenario: ${scenario.name}`,
      text: `Annual tariff impact: ${formatCurrency(scenario.results.annualTariffCost)} (+${scenario.results.percentageIncrease.toFixed(1)}%)`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(JSON.stringify(shareData));
        toast({
          title: "Copied to clipboard",
          description: "Scenario data copied to clipboard"
        });
      }
    } else {
      navigator.clipboard.writeText(JSON.stringify(shareData));
      toast({
        title: "Copied to clipboard",
        description: "Scenario data copied to clipboard"
      });
    }
  };

  const selectedScenarioData = selectedScenarios.map(id => 
    scenarios.find(s => s.id === id)
  ).filter(Boolean) as Scenario[];

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GitCompare className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-semibold text-foreground">Scenario Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare different import scenarios</p>
          </div>
        </div>
        <Button onClick={onCreateScenario} variant="outline">
          Create New Scenario
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Scenarios</TabsTrigger>
          <TabsTrigger value="compare">Compare Selected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {scenarios.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No scenarios saved yet. Create your first scenario to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                    selectedScenarios.includes(scenario.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => toggleScenarioSelection(scenario.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">{scenario.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {scenario.formData.countries.join(', ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {scenario.formData.imports}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-destructive" />
                          <span className="text-foreground">
                            {formatCurrency(scenario.results.annualTariffCost)}/year
                          </span>
                        </div>
                        <div className="text-destructive font-medium">
                          +{scenario.results.percentageIncrease.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareScenario(scenario);
                        }}
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectScenario(scenario);
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare" className="space-y-4">
          {selectedScenarioData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select 2-3 scenarios from the "All Scenarios" tab to compare them.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {selectedScenarioData.map((scenario) => (
                  <Card key={scenario.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{scenario.name}</h4>
                      <Badge variant="outline">
                        {scenario.formData.countries.join(', ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Monthly Impact</div>
                        <div className="font-semibold text-foreground">
                          {formatCurrency(scenario.results.monthlyTariffCost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Annual Impact</div>
                        <div className="font-semibold text-foreground">
                          {formatCurrency(scenario.results.annualTariffCost)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Increase</div>
                        <div className="font-semibold text-destructive">
                          +{scenario.results.percentageIncrease.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedScenarioData.length >= 2 && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Comparison Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Best case scenario:</span>
                      <span className="font-semibold text-blue-900">
                        {selectedScenarioData.reduce((best, current) => 
                          current.results.annualTariffCost < best.results.annualTariffCost ? current : best
                        ).name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Worst case scenario:</span>
                      <span className="font-semibold text-blue-900">
                        {selectedScenarioData.reduce((worst, current) => 
                          current.results.annualTariffCost > worst.results.annualTariffCost ? current : worst
                        ).name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Potential savings:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(
                          Math.max(...selectedScenarioData.map(s => s.results.annualTariffCost)) -
                          Math.min(...selectedScenarioData.map(s => s.results.annualTariffCost))
                        )}
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};