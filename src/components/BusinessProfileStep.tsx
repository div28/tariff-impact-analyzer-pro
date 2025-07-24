import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Building2, Package, Target } from 'lucide-react';

interface BusinessProfileData {
  businessType: string;
  productCategory: string;
  primaryConcern: string;
}

interface BusinessProfileStepProps {
  data: BusinessProfileData;
  onUpdate: (data: Partial<BusinessProfileData>) => void;
  onNext: () => void;
  isValid: boolean;
}

const businessTypes = [
  'Retailer',
  'Wholesaler', 
  'Manufacturer',
  'E-commerce',
  'Distributor',
  'Other'
];

const productCategories = [
  'Electronics',
  'Textiles',
  'Automotive Parts',
  'Home & Garden',
  'Toys',
  'Machinery',
  'Chemicals',
  'Food Products',
  'Medical Devices',
  'Other'
];

const primaryConcerns = [
  { 
    value: 'profit-margin', 
    label: 'Profit margin impact',
    description: 'How tariffs will affect my profit margins'
  },
  { 
    value: 'pricing-strategy', 
    label: 'Pricing strategy',
    description: 'How to adjust pricing for customers'
  },
  { 
    value: 'supplier-alternatives', 
    label: 'Supplier alternatives',
    description: 'Finding alternative supply sources'
  },
  { 
    value: 'cost-planning', 
    label: 'Cost planning',
    description: 'Long-term cost planning and budgeting'
  }
];

const BusinessProfileStep: React.FC<BusinessProfileStepProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  isValid 
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto card-shadow">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Building2 className="h-6 w-6" />
          Tell Us About Your Business
        </CardTitle>
        <p className="text-muted-foreground">
          Help us customize your tariff analysis
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Business Type */}
        <div className="space-y-3">
          <Label className="text-lg font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            What type of business are you?
          </Label>
          <Select 
            value={data.businessType} 
            onValueChange={(value) => onUpdate({ businessType: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Category */}
        <div className="space-y-3">
          <Label className="text-lg font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            What products do you primarily import?
          </Label>
          <Select 
            value={data.productCategory} 
            onValueChange={(value) => onUpdate({ productCategory: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your product category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Primary Concern */}
        <div className="space-y-4">
          <Label className="text-lg font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            What's your primary concern about tariffs?
          </Label>
          <RadioGroup 
            value={data.primaryConcern}
            onValueChange={(value) => onUpdate({ primaryConcern: value })}
            className="space-y-3"
          >
            {primaryConcerns.map((concern) => (
              <div key={concern.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={concern.value} id={concern.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={concern.value} className="font-medium cursor-pointer">
                    {concern.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {concern.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onNext}
            disabled={!isValid}
            size="lg"
            className="btn-primary px-8"
          >
            Next: Import Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessProfileStep;