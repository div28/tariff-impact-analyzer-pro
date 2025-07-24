import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { DollarSign, TrendingUp, Users, BarChart3 } from 'lucide-react';

interface BusinessModelData {
  sellingPrice: string;
  profitMargin: number;
  priceSensitivity: string;
  annualVolume: string;
  monthlyRevenue: string;
}

interface BusinessModelStepProps {
  data: BusinessModelData;
  onUpdate: (data: Partial<BusinessModelData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
  productCost: number;
}

const priceSensitivities = [
  {
    value: 'high',
    label: 'High sensitivity',
    description: 'Luxury/discretionary items - customers easily switch to alternatives',
    icon: '🔴'
  },
  {
    value: 'medium',
    label: 'Medium sensitivity', 
    description: 'Standard business products - some price flexibility',
    icon: '🟡'
  },
  {
    value: 'low',
    label: 'Low sensitivity',
    description: 'Essential/unique items - customers will absorb price increases',
    icon: '🟢'
  }
];

const BusinessModelStep: React.FC<BusinessModelStepProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onPrevious, 
  isValid,
  productCost 
}) => {
  const sellingPrice = parseFloat(data.sellingPrice || '0');
  const profitPerUnit = sellingPrice - productCost;
  const calculatedMargin = sellingPrice > 0 ? ((profitPerUnit / sellingPrice) * 100) : 0;
  const monthlyRevenue = parseFloat(data.monthlyRevenue || '0');
  const annualRevenue = monthlyRevenue * 12;

  // Update profit margin when selling price changes
  React.useEffect(() => {
    if (sellingPrice > productCost) {
      onUpdate({ profitMargin: calculatedMargin });
    }
  }, [sellingPrice, productCost, calculatedMargin, onUpdate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Left Column - Form */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Current Business Model
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Selling Price */}
          <div className="space-y-2">
            <Label className="font-medium">Current selling price per unit</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={data.sellingPrice}
                onChange={(e) => onUpdate({ sellingPrice: e.target.value })}
                className="pl-10 h-12"
                step="0.01"
              />
            </div>
          </div>

          {/* Profit Margin Slider */}
          <div className="space-y-4">
            <Label className="font-medium">Current profit margin: {calculatedMargin.toFixed(1)}%</Label>
            <div className="px-3">
              <Slider
                value={[calculatedMargin]}
                max={80}
                min={10}
                step={1}
                className="w-full"
                disabled
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>10%</span>
                <span>45%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* Price Sensitivity */}
          <div className="space-y-4">
            <Label className="font-medium">Customer price sensitivity</Label>
            <RadioGroup 
              value={data.priceSensitivity}
              onValueChange={(value) => onUpdate({ priceSensitivity: value })}
              className="space-y-3"
            >
              {priceSensitivities.map((sensitivity) => (
                <div key={sensitivity.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={sensitivity.value} id={sensitivity.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={sensitivity.value} className="font-medium cursor-pointer flex items-center gap-2">
                      <span>{sensitivity.icon}</span>
                      {sensitivity.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sensitivity.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Annual Sales Volume */}
          <div className="space-y-2">
            <Label className="font-medium">Annual sales volume estimate</Label>
            <Input
              type="number"
              placeholder="12000"
              value={data.annualVolume}
              onChange={(e) => onUpdate({ annualVolume: e.target.value })}
              className="h-12"
            />
          </div>

          {/* Monthly Revenue */}
          <div className="space-y-2">
            <Label className="font-medium">Current monthly revenue from this product</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={data.monthlyRevenue}
                onChange={(e) => onUpdate({ monthlyRevenue: e.target.value })}
                className="pl-10 h-12"
                step="0.01"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrevious} size="lg">
              Previous
            </Button>
            <Button 
              onClick={onNext}
              disabled={!isValid}
              size="lg"
              className="btn-primary"
            >
              Calculate Tariff Impact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Business Metrics Preview */}
      <Card className="card-shadow bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Business Metrics Preview
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Profit Margin */}
          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-medium">Current profit margin</span>
            </div>
            <div className="text-3xl font-bold text-primary">
              {calculatedMargin.toFixed(1)}%
            </div>
          </div>

          {/* Profit Per Unit */}
          {profitPerUnit > 0 && (
            <div className="p-4 bg-success/10 rounded-lg border border-success">
              <div className="text-sm text-success-foreground mb-1">Profit per unit</div>
              <div className="text-2xl font-bold text-success">
                ${profitPerUnit.toFixed(2)}
              </div>
            </div>
          )}

          {/* Monthly Revenue */}
          {monthlyRevenue > 0 && (
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Monthly revenue</div>
              <div className="text-2xl font-bold text-primary">
                ${monthlyRevenue.toLocaleString()}
              </div>
            </div>
          )}

          {/* Annual Revenue */}
          {annualRevenue > 0 && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary">
              <div className="text-sm text-primary-foreground mb-1">Annual revenue projection</div>
              <div className="text-2xl font-bold text-primary">
                ${annualRevenue.toLocaleString()}
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            These metrics help calculate your tariff impact scenarios
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModelStep;