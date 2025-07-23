// Trade Intelligence Data Types

export interface TariffRate {
  rate: number;
  type: 'mfn' | 'additional' | 'antidumping' | 'countervailing';
  effective_date: string;
  trade_agreement?: string;
  notes?: string;
}

export interface CountryTariffData {
  country_code: string;
  country_name: string;
  rates: Record<string, TariffRate>;
  import_volume?: number;
  avg_unit_value?: number;
  trade_agreement?: string;
}

export interface HSCodeData {
  hs_code: string;
  description: string;
  category: string;
  unit_of_measure: string;
  countries: Record<string, CountryTariffData>;
  last_updated: string;
  data_source: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  last_updated: string;
  source: string;
}

export interface CalculationInput {
  hs_code: string;
  origin_country: string;
  import_value: number;
  currency: string;
  quantity?: number;
  shipping_cost?: number;
  insurance_cost?: number;
  warehousing_cost?: number;
}

export interface TariffCalculationResult {
  input: CalculationInput;
  tariff_rate: number;
  tariff_amount: number;
  total_landed_cost: number;
  effective_rate: number;
  monthly_impact: number;
  annual_impact: number;
  percentage_increase: number;
  exchange_rate_used: number;
  calculation_timestamp: string;
  data_sources: string[];
  confidence_level: 'high' | 'medium' | 'low';
}

export interface BulkAnalysisInput {
  products: CalculationInput[];
  base_currency: string;
  scenario_name?: string;
}

export interface BulkAnalysisResult {
  scenario_name: string;
  total_tariff_impact: number;
  products: TariffCalculationResult[];
  summary: {
    total_import_value: number;
    total_tariff_cost: number;
    average_effective_rate: number;
    most_impacted_product: string;
    highest_tariff_rate: number;
  };
  generated_at: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: string;
  rate_limit?: {
    remaining: number;
    reset_time: string;
  };
}

export interface DataSource {
  name: string;
  url: string;
  last_updated: string;
  reliability_score: number;
}