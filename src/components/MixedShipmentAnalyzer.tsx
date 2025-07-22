import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Package, Calculator, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  value: number;
  country: string;
  htsCode: string;
  tariffRate: number;
  quantity: number;
  unit: string;
}

interface MixedShipmentAnalyzerProps {
  onAnalyze?: (products: Product[]) => void;
}

const countries = [
  { name: 'China', tariff: 30 },
  { name: 'Germany', tariff: 40 },
  { name: 'Mexico', tariff: 25 },
  { name: 'India', tariff: 20 },
  { name: 'Vietnam', tariff: 15 },
  { name: 'Thailand', tariff: 18 },
  { name: 'Other', tariff: 25 }
];

const MixedShipmentAnalyzer: React.FC<MixedShipmentAnalyzerProps> = ({ onAnalyze }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: '',
      value: 0,
      country: '',
      htsCode: '',
      tariffRate: 0,
      quantity: 1,
      unit: 'pieces'
    }
  ]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      value: 0,
      country: '',
      htsCode: '',
      tariffRate: 0,
      quantity: 1,
      unit: 'pieces'
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const updated = { ...p, [field]: value };
        
        // Auto-update tariff rate when country changes
        if (field === 'country') {
          const country = countries.find(c => c.name === value);
          updated.tariffRate = country?.tariff || 0;
        }
        
        return updated;
      }
      return p;
    }));
  };

  const analyzeShipment = () => {
    const validProducts = products.filter(p => p.name && p.value > 0 && p.country);
    
    if (validProducts.length === 0) {
      return;
    }

    const totalValue = validProducts.reduce((sum, p) => sum + (p.value * p.quantity), 0);
    const totalTariff = validProducts.reduce((sum, p) => sum + (p.value * p.quantity * p.tariffRate / 100), 0);
    const averageTariffRate = (totalTariff / totalValue) * 100;

    const countryBreakdown = validProducts.reduce((acc, p) => {
      const country = p.country;
      if (!acc[country]) {
        acc[country] = { value: 0, tariff: 0, products: 0 };
      }
      acc[country].value += p.value * p.quantity;
      acc[country].tariff += (p.value * p.quantity * p.tariffRate / 100);
      acc[country].products += 1;
      return acc;
    }, {} as Record<string, { value: number; tariff: number; products: number }>);

    const analysisResult = {
      totalValue,
      totalTariff,
      averageTariffRate,
      productCount: validProducts.length,
      countryBreakdown,
      products: validProducts,
      savings: {
        bestCase: totalTariff * 0.3, // If moved to lowest tariff country
        worstCase: totalTariff * 1.5  // If all from highest tariff country
      }
    };

    setAnalysis(analysisResult);
    onAnalyze?.(validProducts);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
          Analyze Shipment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Mixed Shipment Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Entry */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Products in Shipment</h3>
              <Button onClick={addProduct} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {products.map((product, index) => (
              <Card key={product.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <Input
                      placeholder="e.g., LED Displays"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Unit Value ($)</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={product.value || ''}
                      onChange={(e) => updateProduct(product.id, 'value', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={product.quantity || ''}
                      onChange={(e) => updateProduct(product.id, 'quantity', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Country of Origin</label>
                    <Select value={product.country} onValueChange={(value) => updateProduct(product.id, 'country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.name} value={country.name}>
                            {country.name} ({country.tariff}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">HTS Code</label>
                    <Input
                      placeholder="8528.72.64"
                      value={product.htsCode}
                      onChange={(e) => updateProduct(product.id, 'htsCode', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {product.tariffRate}% tariff
                    </Badge>
                    {products.length > 1 && (
                      <Button
                        onClick={() => removeProduct(product.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Analysis Button */}
          <div className="flex justify-center">
            <Button onClick={analyzeShipment} className="bg-blue-600 hover:bg-blue-700">
              <Calculator className="w-4 h-4 mr-2" />
              Analyze Mixed Shipment
            </Button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Shipment Analysis Results
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">
                    ${analysis.totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Shipment Value</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-red-600">
                    ${analysis.totalTariff.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Tariff Cost</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysis.averageTariffRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Weighted Avg Rate</div>
                </div>
              </div>

              {/* Country Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold">Breakdown by Country:</h4>
                {Object.entries(analysis.countryBreakdown).map(([country, data]: [string, any]) => (
                  <div key={country} className="flex justify-between items-center p-3 bg-white rounded border">
                    <div>
                      <span className="font-medium">{country}</span>
                      <span className="text-sm text-gray-600 ml-2">({data.products} products)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${data.value.toLocaleString()}</div>
                      <div className="text-sm text-red-600">Tariff: ${data.tariff.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optimization Suggestions */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Optimization Opportunities:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Potential savings: ${analysis.savings.bestCase.toLocaleString()} by sourcing from lower-tariff countries</li>
                  <li>• Consider consolidating products from the same country to optimize shipping</li>
                  <li>• Review HTS codes to ensure accurate classification</li>
                </ul>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MixedShipmentAnalyzer;