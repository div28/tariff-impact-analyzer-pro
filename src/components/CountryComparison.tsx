import React, { useState } from 'react';
import { Globe, Plus, X, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalculationService } from '@/services/calculationService';
import { CalculationInput, TariffCalculationResult } from '@/types/trade';
import { useToast } from '@/hooks/use-toast';

interface CountryScenario {
  country: string;
  shippingCost: number;
  additionalCosts: number;
  tradeAgreement?: string;
}

function CountryComparison() {
  const [hsCode, setHsCode] = useState('');
  const [productName, setProductName] = useState('');
  const [importValue, setImportValue] = useState<number>(0);
  const [currency, setCurrency] = useState('USD');
  const [countries, setCountries] = useState<CountryScenario[]>([
    { country: 'China', shippingCost: 0, additionalCosts: 0 },
    { country: 'Vietnam', shippingCost: 0, additionalCosts: 0 }
  ]);
  const [results, setResults] = useState<TariffCalculationResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const calculationService = new CalculationService();

  const addCountry = () => {
    setCountries([...countries, { country: '', shippingCost: 0, additionalCosts: 0 }]);
  };

  const updateCountry = (index: number, field: keyof CountryScenario, value: string | number) => {
    const updated = [...countries];
    updated[index] = { ...updated[index], [field]: value };
    setCountries(updated);
  };

  const removeCountry = (index: number) => {
    if (countries.length > 1) {
      setCountries(countries.filter((_, i) => i !== index));
    }
  };

  const runComparison = async () => {
    if (!hsCode || importValue <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please provide HS code and import value",
        variant: "destructive"
      });
      return;
    }

    const validCountries = countries.filter(c => c.country.trim() !== '');
    if (validCountries.length < 2) {
      toast({
        title: "Need More Countries",
        description: "Please select at least 2 countries to compare",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    const comparisonResults: TariffCalculationResult[] = [];

    try {
      for (const countryScenario of validCountries) {
        const input: CalculationInput = {
          hs_code: hsCode,
          product_name: productName || undefined,
          origin_country: countryScenario.country,
          import_value: importValue,
          currency,
          shipping_cost: countryScenario.shippingCost,
          insurance_cost: countryScenario.additionalCosts * 0.3, // 30% of additional costs
          warehousing_cost: countryScenario.additionalCosts * 0.7  // 70% of additional costs
        };

        const response = await calculationService.calculateTariffImpact(input);
        if (response.success) {
          comparisonResults.push(response.data);
        }
      }

      setResults(comparisonResults);
      toast({
        title: "Comparison Complete",
        description: `Analyzed ${comparisonResults.length} countries successfully`
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Prepare chart data
  const chartData = results.map(result => ({
    country: result.input.origin_country,
    tariffRate: result.tariff_rate,
    tariffCost: result.tariff_amount,
    totalCost: result.total_landed_cost,
    effectiveRate: result.effective_rate,
    savings: results.length > 0 ? Math.max(...results.map(r => r.total_landed_cost)) - result.total_landed_cost : 0
  }));

  const bestOption = chartData.reduce((best, current) => 
    current.totalCost < best.totalCost ? current : best, 
    chartData[0] || { country: '', totalCost: Infinity, savings: 0 }
  );

  const commonCountries = [
    'China', 'Vietnam', 'Mexico', 'India', 'Thailand', 'Malaysia', 'South Korea',
    'Taiwan', 'Philippines', 'Indonesia', 'Bangladesh', 'Turkey', 'Brazil',
    'Germany', 'Italy', 'Japan', 'Canada'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Country Sourcing Comparison
        </h2>
        <p className="text-muted-foreground">
          Compare tariff impacts and total costs across different sourcing countries
        </p>
      </div>

      {/* Product Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter the product information for comparison analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hs-code">HS Code *</Label>
              <Input
                id="hs-code"
                value={hsCode}
                onChange={(e) => setHsCode(e.target.value)}
                placeholder="e.g., 8471.30.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Laptop Computer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="import-value">Import Value *</Label>
              <Input
                id="import-value"
                type="number"
                value={importValue}
                onChange={(e) => setImportValue(parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Country Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Country Scenarios
            <Button onClick={addCountry} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>
          </CardTitle>
          <CardDescription>
            Configure the countries and associated costs for comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {countries.map((country, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Scenario {index + 1}</Badge>
                  {countries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCountry(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`country-${index}`}>Country *</Label>
                    <Select
                      value={country.country}
                      onValueChange={(value) => updateCountry(index, 'country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonCountries.map(countryName => (
                          <SelectItem key={countryName} value={countryName}>
                            {countryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`shipping-${index}`}>Shipping Cost ({currency})</Label>
                    <Input
                      id={`shipping-${index}`}
                      type="number"
                      value={country.shippingCost}
                      onChange={(e) => updateCountry(index, 'shippingCost', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`additional-${index}`}>Additional Costs ({currency})</Label>
                    <Input
                      id={`additional-${index}`}
                      type="number"
                      value={country.additionalCosts}
                      onChange={(e) => updateCountry(index, 'additionalCosts', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Action */}
      <div className="flex justify-center">
        <Button
          onClick={runComparison}
          disabled={isAnalyzing}
          size="lg"
          className="min-w-48"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Compare Countries'}
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <Separator />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Best Option</CardDescription>
                <CardTitle className="text-xl font-bold text-primary">
                  {bestOption.country}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Total Cost: ${bestOption.totalCost?.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Maximum Savings</CardDescription>
                <CardTitle className="text-xl font-bold text-green-600">
                  ${Math.max(...chartData.map(d => d.savings)).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  vs. highest cost option
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Countries Compared</CardDescription>
                <CardTitle className="text-xl font-bold">
                  {results.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  sourcing scenarios analyzed
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Landed Cost Comparison</CardTitle>
              <CardDescription>
                Complete cost breakdown including tariffs, shipping, and additional costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="country" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`, 
                      name === 'totalCost' ? 'Total Landed Cost' : 'Tariff Cost'
                    ]}
                  />
                  <Bar dataKey="totalCost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tariffCost" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison Results</CardTitle>
              <CardDescription>
                Side-by-side analysis of all cost components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Country</th>
                      <th className="text-right p-2">Tariff Rate</th>
                      <th className="text-right p-2">Tariff Cost</th>
                      <th className="text-right p-2">Shipping</th>
                      <th className="text-right p-2">Other Costs</th>
                      <th className="text-right p-2">Total Cost</th>
                      <th className="text-right p-2">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => {
                      const data = chartData[index];
                      const isLowest = data.totalCost === bestOption.totalCost;
                      return (
                        <tr key={index} className={`border-b ${isLowest ? 'bg-green-50 dark:bg-green-950' : ''}`}>
                          <td className="p-2 font-medium">
                            {result.input.origin_country}
                            {isLowest && <Badge className="ml-2" variant="default">Best</Badge>}
                          </td>
                          <td className="text-right p-2">{result.tariff_rate.toFixed(1)}%</td>
                          <td className="text-right p-2">${result.tariff_amount.toLocaleString()}</td>
                          <td className="text-right p-2">${(result.input.shipping_cost || 0).toLocaleString()}</td>
                          <td className="text-right p-2">
                            ${((result.input.insurance_cost || 0) + (result.input.warehousing_cost || 0)).toLocaleString()}
                          </td>
                          <td className="text-right p-2 font-bold">
                            ${result.total_landed_cost.toLocaleString()}
                          </td>
                          <td className="text-right p-2 text-green-600">
                            ${data.savings.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CountryComparison;