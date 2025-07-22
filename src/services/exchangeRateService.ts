import { ExchangeRate, APIResponse } from '@/types/trade';

const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';
const FALLBACK_RATES: Record<string, number> = {
  'USD': 1.0,
  'EUR': 0.85,
  'GBP': 0.73,
  'JPY': 110.0,
  'CAD': 1.25,
  'AUD': 1.35,
  'CHF': 0.92,
  'CNY': 6.45,
  'MXN': 20.5,
};

export class ExchangeRateService {
  private cache: Map<string, { rates: Record<string, number>, timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  async getExchangeRates(baseCurrency: string = 'USD'): Promise<APIResponse<Record<string, ExchangeRate>>> {
    try {
      // Check cache first
      const cacheKey = baseCurrency;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return {
          data: this.formatRates(cached.rates, baseCurrency, 'cache'),
          success: true,
          timestamp: new Date().toISOString()
        };
      }

      // Fetch fresh rates
      const response = await fetch(`${EXCHANGE_API_BASE}/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the results
      this.cache.set(cacheKey, {
        rates: data.rates,
        timestamp: Date.now()
      });

      return {
        data: this.formatRates(data.rates, baseCurrency, 'api'),
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.warn('Exchange rate API failed, using fallback rates:', error);
      
      // Return fallback rates
      return {
        data: this.formatRates(FALLBACK_RATES, baseCurrency, 'fallback'),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) return amount;

    const ratesResponse = await this.getExchangeRates(fromCurrency);
    const rates = ratesResponse.data;

    if (!rates[toCurrency]) {
      throw new Error(`Exchange rate not available for ${toCurrency}`);
    }

    return amount * rates[toCurrency].rate;
  }

  private formatRates(rates: Record<string, number>, baseCurrency: string, source: string): Record<string, ExchangeRate> {
    const formatted: Record<string, ExchangeRate> = {};
    
    for (const [currency, rate] of Object.entries(rates)) {
      formatted[currency] = {
        currency,
        rate,
        last_updated: new Date().toISOString(),
        source: source === 'api' ? 'exchangerate-api.com' : 
                source === 'fallback' ? 'Fallback rates' : 'Cache'
      };
    }

    return formatted;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStatus(): { size: number, oldest: string | null } {
    if (this.cache.size === 0) {
      return { size: 0, oldest: null };
    }

    let oldestTimestamp = Date.now();
    for (const [, value] of this.cache) {
      if (value.timestamp < oldestTimestamp) {
        oldestTimestamp = value.timestamp;
      }
    }

    return {
      size: this.cache.size,
      oldest: new Date(oldestTimestamp).toISOString()
    };
  }
}