import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Users,
  MapPin,
  FileText,
  RotateCcw,
  Download
} from 'lucide-react';

interface ResultsData {
  productCost: number;
  sellingPrice: number;
  quantity: number;
  tariffRate: number;
  countryName: string;
  profitMargin: number;
  priceSensitivity: string;
  monthlyRevenue: number;
}

interface ResultsDashboardProps {
  data: ResultsData;
  onRestart: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onRestart }) => {
  const [activeTab, setActiveTab] = useState('absorb');

  // Calculations
  const tariffCostPerUnit = data.productCost * (data.tariffRate / 100);
  const newUnitCost = data.productCost + tariffCostPerUnit;
  const currentProfitPerUnit = data.sellingPrice - data.productCost;
  const newProfitPerUnit = data.sellingPrice - newUnitCost;
  const newProfitMargin = data.sellingPrice > 0 ? (newProfitPerUnit / data.sellingPrice) * 100 : 0;
  const profitMarginDrop = data.profitMargin - newProfitMargin;

  // Scenario calculations
  const requiredPriceIncrease = tariffCostPerUnit;
  const newSellingPrice = data.sellingPrice + requiredPriceIncrease;
  const priceIncreasePercentage = (requiredPriceIncrease / data.sellingPrice) * 100;

  // Customer retention estimates based on sensitivity
  const getRetentionRate = () => {
    switch (data.priceSensitivity) {
      case 'high': return 60;
      case 'medium': return 80;
      case 'low': return 95;
      default: return 80;
    }
  };

  const retentionRate = getRetentionRate();
  const expectedRevenueLoss = data.monthlyRevenue * ((100 - retentionRate) / 100);
  const adjustedMonthlyRevenue = data.monthlyRevenue - expectedRevenueLoss;

  // Risk assessment
  const getRiskLevel = () => {
    if (profitMarginDrop > 10) return { level: 'High', color: 'destructive' };
    if (profitMarginDrop > 5) return { level: 'Medium', color: 'warning' };
    return { level: 'Low', color: 'success' };
  };

  const riskAssessment = getRiskLevel();

  // Alternative countries data
  const alternativeCountries = [
    { name: 'Vietnam', tariffRate: 10, flag: '🇻🇳', shipping: '+2 weeks', quality: 'High' },
    { name: 'Mexico', tariffRate: 0, flag: '🇲🇽', shipping: '+1 week', quality: 'High' },
    { name: 'India', tariffRate: 15, flag: '🇮🇳', shipping: '+3 weeks', quality: 'Medium' },
    { name: 'Taiwan', tariffRate: 20, flag: '🇹🇼', shipping: '+2 weeks', quality: 'High' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tariff Cost Impact */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Tariff Cost Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">
              ${tariffCostPerUnit.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">per unit</div>
            <div className="mt-2">
              <Badge variant="secondary">
                +{data.tariffRate}% cost increase
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* New Unit Cost */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              New Unit Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              ${newUnitCost.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              was ${data.productCost.toFixed(2)}
            </div>
            <div className="mt-2">
              <Progress value={(tariffCostPerUnit / newUnitCost) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Profit Margin Impact */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              Profit Margin Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-2">
              {newProfitMargin.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              was {data.profitMargin.toFixed(1)}%
            </div>
            <div className="mt-2">
              <Badge variant={riskAssessment.color as any}>
                {riskAssessment.level} Risk
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Analysis */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Scenario Analysis
          </CardTitle>
          <p className="text-muted-foreground">
            Explore different strategies to handle tariff impact
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="absorb">Absorb Costs</TabsTrigger>
              <TabsTrigger value="pass">Pass to Customers</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid Strategy</TabsTrigger>
              <TabsTrigger value="sourcing">Alternative Sourcing</TabsTrigger>
            </TabsList>

            <TabsContent value="absorb" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Absorb All Tariff Costs</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Revenue impact:</span>
                      <span className="font-medium">No change (${data.monthlyRevenue.toLocaleString()}/mo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit impact:</span>
                      <span className="font-medium text-destructive">-${(profitMarginDrop * data.monthlyRevenue / 100).toFixed(0)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New profit margin:</span>
                      <span className="font-medium">{newProfitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Customer retention: 100%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Profit margin reduction: {profitMarginDrop.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pass" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pass Costs to Customers</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Required price increase:</span>
                      <span className="font-medium text-accent">+{priceIncreasePercentage.toFixed(1)}% (${requiredPriceIncrease.toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New selling price:</span>
                      <span className="font-medium">${newSellingPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected retention:</span>
                      <span className="font-medium">{retentionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adjusted revenue:</span>
                      <span className="font-medium">${adjustedMonthlyRevenue.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Competitive Risk</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Customer loss: {100 - retentionRate}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm">Revenue at risk: ${expectedRevenueLoss.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hybrid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Balanced Approach</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Absorb:</span>
                      <span className="font-medium">50% of tariff cost</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pass to customers:</span>
                      <span className="font-medium">50% of tariff cost</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price increase:</span>
                      <span className="font-medium">+{(priceIncreasePercentage / 2).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margin reduction:</span>
                      <span className="font-medium">{(profitMarginDrop / 2).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border border-success">
                  <h4 className="font-medium mb-2 text-success">Balanced Outcome</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="text-sm">Lower customer impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Manageable margin impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sourcing" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Alternative Sourcing Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alternativeCountries.map((country) => (
                    <Card key={country.name} className="border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          {country.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Tariff rate:</span>
                            <Badge variant={country.tariffRate < data.tariffRate ? 'success' : 'secondary'}>
                              {country.tariffRate}%
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Lead time:</span>
                            <span className="text-sm">{country.shipping}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quality:</span>
                            <span className="text-sm">{country.quality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Savings:</span>
                            <span className="font-medium text-success">
                              ${((data.tariffRate - country.tariffRate) * data.productCost / 100).toFixed(2)}/unit
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          Find Suppliers
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          <RotateCcw className="h-4 w-4 mr-2" />
          Calculate Another Product
        </Button>
        <Button size="lg" className="btn-secondary">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button size="lg" className="btn-accent">
          <FileText className="h-4 w-4 mr-2" />
          Get Expert Consultation
        </Button>
      </div>
    </div>
  );
};

export default ResultsDashboard;