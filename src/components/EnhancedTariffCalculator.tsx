import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  RefreshCw, 
  Clock,
  Database,
  Wifi,
  WifiOff,
  Search,
  FileUp,
  Download,
  BarChart3
} from 'lucide-react';
import { CalculationService } from '@/services/calculationService';
import { ExchangeRateService } from '@/services/exchangeRateService';
import { TariffService } from '@/services/tariffService';
import { CalculationInput, TariffCalculationResult, ExchangeRate } from '@/types/trade';
import { toast } from '@/hooks/use-toast';

interface FormData {
  hsCode: string;
  originCountry: string;
  importValue: number;
  currency: string;
  shippingCost?: number;
  insuranceCost?: number;
  warehousingCost?: number;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

const countries = [
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
];

const EnhancedTariffCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    hsCode: '',
    originCountry: '',
    importValue: 0,
    currency: 'USD',
  });

  const [results, setResults] = useState<TariffCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, ExchangeRate>>({});
  const [hsCodeSuggestions, setHsCodeSuggestions] = useState<any[]>([]);
  const [dataFreshness, setDataFreshness] = useState<{
    tariffs: string;
    exchange: string;
    status: 'fresh' | 'stale' | 'offline';
  }>({
    tariffs: '',
    exchange: '',
    status: 'fresh'
  });

  const calculationService = new CalculationService();
  const exchangeService = new ExchangeRateService();
  const tariffService = new TariffService();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load exchange rates
      const ratesResponse = await exchangeService.getExchangeRates('USD');
      if (ratesResponse.success) {
        setExchangeRates(ratesResponse.data);
        setDataFreshness(prev => ({
          ...prev,
          exchange: ratesResponse.timestamp,
          status: 'fresh'
        }));
      } else {
        setDataFreshness(prev => ({ ...prev, status: 'offline' }));
        toast({
          title: "Using Offline Data",
          description: "Exchange rates unavailable, using fallback rates",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setDataFreshness(prev => ({ ...prev, status: 'offline' }));
    }
  };

  const searchHSCodes = async (query: string) => {
    if (query.length < 3) {
      setHsCodeSuggestions([]);
      return;
    }

    try {
      const response = await tariffService.searchHSCodes(query);
      if (response.success) {
        setHsCodeSuggestions(response.data);
      }
    } catch (error) {
      console.error('Failed to search HS codes:', error);
    }
  };

  const calculateTariffImpact = async () => {
    if (!formData.hsCode || !formData.originCountry || !formData.importValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsCalculating(true);

    try {
      const input: CalculationInput = {
        hs_code: formData.hsCode,
        origin_country: formData.originCountry,
        import_value: formData.importValue,
        currency: formData.currency,
        shipping_cost: formData.shippingCost,
        insurance_cost: formData.insuranceCost,
        warehousing_cost: formData.warehousingCost,
      };

      const response = await calculationService.calculateTariffImpact(input);
      
      if (response.success) {
        setResults(response.data);
        setDataFreshness(prev => ({
          ...prev,
          tariffs: response.timestamp
        }));
        
        toast({
          title: "Calculation Complete",
          description: `Confidence level: ${response.data.confidence_level}`,
        });
      } else {
        toast({
          title: "Calculation Failed",
          description: response.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "System Error",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const refreshData = async () => {
    setIsCalculating(true);
    await loadInitialData();
    if (results) {
      await calculateTariffImpact();
    }
    setIsCalculating(false);
  };

  const formatCurrency = (amount: number, currencyCode: string = 'USD') => {
    const currency = currencies.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header with Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Enhanced Tariff Calculator</CardTitle>
                <CardDescription>Real-time trade impact analysis with live data</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                {/* Data Status Indicator */}
                <div className="flex items-center gap-2">
                  {dataFreshness.status === 'fresh' ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {dataFreshness.status === 'fresh' ? 'Live Data' : 'Offline Mode'}
                  </span>
                </div>
                
                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  disabled={isCalculating}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isCalculating ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            
            {/* Currency Selection */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Label>Display Currency:</Label>
              </div>
              <Select 
                value={formData.currency} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Left Column - Input Form */}
              <div className="space-y-4">
                
                {/* HS Code Input with Search */}
                <div className="space-y-2">
                  <Label htmlFor="hsCode">HS Code *</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="hsCode"
                      placeholder="e.g., 8471.30.01"
                      value={formData.hsCode}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, hsCode: e.target.value }));
                        searchHSCodes(e.target.value);
                      }}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* HS Code Suggestions */}
                  {hsCodeSuggestions.length > 0 && (
                    <div className="border rounded-md p-2 bg-card max-h-32 overflow-y-auto">
                      {hsCodeSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-muted cursor-pointer rounded text-sm"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, hsCode: suggestion.hs_code }));
                            setHsCodeSuggestions([]);
                          }}
                        >
                          <div className="font-medium">{suggestion.hs_code}</div>
                          <div className="text-muted-foreground text-xs">{suggestion.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Origin Country */}
                <div className="space-y-2">
                  <Label htmlFor="originCountry">Origin Country *</Label>
                  <Select 
                    value={formData.originCountry} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, originCountry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country of origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Import Value */}
                <div className="space-y-2">
                  <Label htmlFor="importValue">Import Value *</Label>
                  <Input
                    id="importValue"
                    type="number"
                    placeholder="100000"
                    value={formData.importValue || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      importValue: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>

                {/* Additional Costs (Optional) */}
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <Label className="font-medium">Additional Costs (Optional)</Label>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="shipping" className="text-sm">Shipping Cost</Label>
                      <Input
                        id="shipping"
                        type="number"
                        placeholder="5000"
                        value={formData.shippingCost || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          shippingCost: parseFloat(e.target.value) || undefined 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="insurance" className="text-sm">Insurance Cost</Label>
                      <Input
                        id="insurance"
                        type="number"
                        placeholder="1000"
                        value={formData.insuranceCost || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          insuranceCost: parseFloat(e.target.value) || undefined 
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="warehousing" className="text-sm">Warehousing Cost</Label>
                      <Input
                        id="warehousing"
                        type="number"
                        placeholder="2000"
                        value={formData.warehousingCost || ''}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          warehousingCost: parseFloat(e.target.value) || undefined 
                        }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculateTariffImpact} 
                  disabled={isCalculating || !formData.hsCode || !formData.originCountry || !formData.importValue}
                  className="w-full"
                  size="lg"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Calculate Impact
                    </>
                  )}
                </Button>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-4">
                {results ? (
                  <>
                    {/* Confidence Badge */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Analysis Results</h3>
                      <Badge className={getConfidenceColor(results.confidence_level)}>
                        {results.confidence_level.toUpperCase()} CONFIDENCE
                      </Badge>
                    </div>

                    {/* Primary Metrics */}
                    <div className="space-y-3">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-destructive" />
                            <span className="font-medium">Tariff Rate</span>
                          </div>
                          <span className="text-lg font-bold text-destructive">
                            {results.tariff_rate}%
                          </span>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-medium">Tariff Amount</span>
                          </div>
                          <span className="text-lg font-bold">
                            {formatCurrency(results.tariff_amount, formData.currency)}
                          </span>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-warning" />
                            <span className="font-medium">Total Landed Cost</span>
                          </div>
                          <span className="text-lg font-bold">
                            {formatCurrency(results.total_landed_cost, formData.currency)}
                          </span>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Annual Impact</span>
                          </div>
                          <span className="text-lg font-bold text-destructive">
                            {formatCurrency(results.annual_impact, formData.currency)}
                          </span>
                        </div>
                      </Card>
                    </div>

                    {/* Data Sources */}
                    <Alert>
                      <Database className="w-4 h-4" />
                      <AlertDescription className="text-xs">
                        <div className="space-y-1">
                          <div><strong>Data Sources:</strong></div>
                          {results.data_sources.map((source, index) => (
                            <div key={index}>• {source}</div>
                          ))}
                          <div className="mt-2 text-muted-foreground">
                            Last updated: {new Date(results.calculation_timestamp).toLocaleString()}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your trade details to see the tariff impact analysis</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Freshness Footer */}
        {Object.keys(exchangeRates).length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Exchange rates updated: {new Date(dataFreshness.exchange).toLocaleString()}</span>
                  </div>
                  {dataFreshness.tariffs && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Tariff data updated: {new Date(dataFreshness.tariffs).toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={refreshData}>
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default EnhancedTariffCalculator;