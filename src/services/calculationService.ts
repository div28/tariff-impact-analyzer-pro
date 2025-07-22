import { 
  CalculationInput, 
  TariffCalculationResult, 
  BulkAnalysisInput, 
  BulkAnalysisResult,
  APIResponse 
} from '@/types/trade';
import { TariffService } from './tariffService';
import { ExchangeRateService } from './exchangeRateService';

export class CalculationService {
  private tariffService: TariffService;
  private exchangeService: ExchangeRateService;

  constructor() {
    this.tariffService = new TariffService();
    this.exchangeService = new ExchangeRateService();
  }

  async calculateTariffImpact(input: CalculationInput): Promise<APIResponse<TariffCalculationResult>> {
    try {
      // Get tariff data
      const tariffResponse = await this.tariffService.getTariffData(input.hs_code);
      if (!tariffResponse.success) {
        throw new Error(`Failed to get tariff data: ${tariffResponse.error}`);
      }

      const tariffData = tariffResponse.data;
      const countryData = tariffData.countries[input.origin_country];
      
      if (!countryData) {
        throw new Error(`No tariff data available for country: ${input.origin_country}`);
      }

      // Get exchange rate if currency conversion needed
      let convertedValue = input.import_value;
      let exchangeRate = 1;
      
      if (input.currency !== 'USD') {
        exchangeRate = await this.exchangeService.convertCurrency(1, input.currency, 'USD');
        convertedValue = input.import_value * exchangeRate;
      }

      // Calculate tariff
      const tariffRate = countryData.rates.general?.rate || 0;
      const tariffAmount = (convertedValue * tariffRate) / 100;

      // Calculate total landed cost
      const shippingCost = input.shipping_cost || 0;
      const insuranceCost = input.insurance_cost || 0;
      const warehousingCost = input.warehousing_cost || 0;
      
      const totalLandedCost = convertedValue + tariffAmount + shippingCost + insuranceCost + warehousingCost;
      const effectiveRate = ((totalLandedCost - convertedValue) / convertedValue) * 100;

      // Calculate monthly and annual impacts
      const monthlyImpact = tariffAmount;
      const annualImpact = tariffAmount * 12;
      const percentageIncrease = (tariffAmount / convertedValue) * 100;

      // Determine confidence level
      let confidenceLevel: 'high' | 'medium' | 'low' = 'high';
      if (tariffResponse.data.data_source.includes('Mock') || tariffResponse.data.data_source.includes('Generated')) {
        confidenceLevel = 'low';
      } else if (!tariffResponse.success) {
        confidenceLevel = 'medium';
      }

      const result: TariffCalculationResult = {
        input,
        tariff_rate: tariffRate,
        tariff_amount: tariffAmount,
        total_landed_cost: totalLandedCost,
        effective_rate: effectiveRate,
        monthly_impact: monthlyImpact,
        annual_impact: annualImpact,
        percentage_increase: percentageIncrease,
        exchange_rate_used: exchangeRate,
        calculation_timestamp: new Date().toISOString(),
        data_sources: [tariffData.data_source, 'exchangerate-api.com'],
        confidence_level: confidenceLevel
      };

      return {
        data: result,
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        data: this.createFallbackResult(input),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async calculateBulkAnalysis(input: BulkAnalysisInput): Promise<APIResponse<BulkAnalysisResult>> {
    try {
      const results: TariffCalculationResult[] = [];
      let totalImportValue = 0;
      let totalTariffCost = 0;
      let mostImpactedProduct = '';
      let highestTariffRate = 0;
      let highestImpact = 0;

      // Process each product
      for (const product of input.products) {
        const calculationResponse = await this.calculateTariffImpact(product);
        
        if (calculationResponse.success) {
          const result = calculationResponse.data;
          results.push(result);
          
          totalImportValue += result.input.import_value;
          totalTariffCost += result.tariff_amount;
          
          if (result.tariff_rate > highestTariffRate) {
            highestTariffRate = result.tariff_rate;
          }
          
          if (result.tariff_amount > highestImpact) {
            highestImpact = result.tariff_amount;
            mostImpactedProduct = `${result.input.hs_code} (${result.tariff_amount.toFixed(2)})`;
          }
        }
      }

      const averageEffectiveRate = totalImportValue > 0 ? (totalTariffCost / totalImportValue) * 100 : 0;

      const bulkResult: BulkAnalysisResult = {
        scenario_name: input.scenario_name || `Analysis ${new Date().toLocaleDateString()}`,
        total_tariff_impact: totalTariffCost,
        products: results,
        summary: {
          total_import_value: totalImportValue,
          total_tariff_cost: totalTariffCost,
          average_effective_rate: averageEffectiveRate,
          most_impacted_product: mostImpactedProduct,
          highest_tariff_rate: highestTariffRate
        },
        generated_at: new Date().toISOString()
      };

      return {
        data: bulkResult,
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        data: {
          scenario_name: input.scenario_name || 'Failed Analysis',
          total_tariff_impact: 0,
          products: [],
          summary: {
            total_import_value: 0,
            total_tariff_cost: 0,
            average_effective_rate: 0,
            most_impacted_product: 'N/A',
            highest_tariff_rate: 0
          },
          generated_at: new Date().toISOString()
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  private createFallbackResult(input: CalculationInput): TariffCalculationResult {
    // Create a basic fallback calculation
    const fallbackRate = 10; // 10% default tariff
    const tariffAmount = (input.import_value * fallbackRate) / 100;
    
    return {
      input,
      tariff_rate: fallbackRate,
      tariff_amount: tariffAmount,
      total_landed_cost: input.import_value + tariffAmount,
      effective_rate: fallbackRate,
      monthly_impact: tariffAmount,
      annual_impact: tariffAmount * 12,
      percentage_increase: fallbackRate,
      exchange_rate_used: 1,
      calculation_timestamp: new Date().toISOString(),
      data_sources: ['Fallback calculation'],
      confidence_level: 'low'
    };
  }
}