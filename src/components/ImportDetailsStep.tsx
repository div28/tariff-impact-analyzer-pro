import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Package, MapPin, DollarSign, HelpCircle, TrendingUp } from 'lucide-react';

interface ImportDetailsData {
  productCost: string;
  quantity: string;
  countryOfOrigin: string;
  shippingCost: string;
  productWeight: string;
}

interface ImportDetailsStepProps {
  data: ImportDetailsData;
  onUpdate: (data: Partial<ImportDetailsData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
}

const countries = [
  { code: 'CN', name: 'China', tariffRate: 25, flag: '🇨🇳' },
  { code: 'MX', name: 'Mexico', tariffRate: 0, flag: '🇲🇽' },
  { code: 'VN', name: 'Vietnam', tariffRate: 10, flag: '🇻🇳' },
  { code: 'IN', name: 'India', tariffRate: 15, flag: '🇮🇳' },
  { code: 'TW', name: 'Taiwan', tariffRate: 20, flag: '🇹🇼' },
  { code: 'KR', name: 'South Korea', tariffRate: 8, flag: '🇰🇷' },
  { code: 'TH', name: 'Thailand', tariffRate: 12, flag: '🇹🇭' },
  { code: 'DE', name: 'Germany', tariffRate: 5, flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', tariffRate: 3, flag: '🇯🇵' },
  { code: 'IT', name: 'Italy', tariffRate: 6, flag: '🇮🇹' }
];

const ImportDetailsStep: React.FC<ImportDetailsStepProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onPrevious, 
  isValid 
}) => {
  const selectedCountry = countries.find(c => c.code === data.countryOfOrigin);
  const totalShipmentValue = parseFloat(data.productCost || '0') * parseFloat(data.quantity || '0');
  const estimatedTariff = selectedCountry ? (totalShipmentValue * selectedCountry.tariffRate / 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Left Column - Form */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Package className="h-6 w-6" />
            Import & Product Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Product Cost */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="font-medium">Product cost per unit</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price your supplier charges before shipping</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={data.productCost}
                onChange={(e) => onUpdate({ productCost: e.target.value })}
                className="pl-10 h-12"
                step="0.01"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="font-medium">Quantity importing</Label>
            <Input
              type="number"
              placeholder="1000"
              value={data.quantity}
              onChange={(e) => onUpdate({ quantity: e.target.value })}
              className="h-12"
            />
          </div>

          {/* Country of Origin */}
          <div className="space-y-2">
            <Label className="font-medium">Country of origin</Label>
            <Select 
              value={data.countryOfOrigin} 
              onValueChange={(value) => onUpdate({ countryOfOrigin: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-muted-foreground text-sm">
                        ({country.tariffRate}% tariff)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shipping Cost */}
          <div className="space-y-2">
            <Label className="font-medium">Shipping cost (optional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={data.shippingCost}
                onChange={(e) => onUpdate({ shippingCost: e.target.value })}
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
              Next: Business Impact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Live Preview */}
      <Card className="card-shadow bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Live Preview
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {selectedCountry && (
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Selected Country</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCountry.flag}</span>
                <div>
                  <div className="font-semibold">{selectedCountry.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Estimated tariff rate: {selectedCountry.tariffRate}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {totalShipmentValue > 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">Total shipment value</div>
                <div className="text-2xl font-bold text-primary">
                  ${totalShipmentValue.toLocaleString()}
                </div>
              </div>

              {estimatedTariff > 0 && (
                <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                  <div className="text-sm text-accent-foreground mb-1">Projected tariff cost</div>
                  <div className="text-2xl font-bold text-accent">
                    ${estimatedTariff.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ${(estimatedTariff / parseFloat(data.quantity || '1')).toFixed(2)} per unit
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Updates automatically as you enter information
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportDetailsStep;