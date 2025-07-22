import { HSCodeData, CountryTariffData, TariffRate, APIResponse } from '@/types/trade';

// Mock data structure for development - will be replaced with real API integration
const MOCK_TARIFF_DATA: Record<string, HSCodeData> = {
  '8471.30.01': {
    hs_code: '8471.30.01',
    description: 'Portable computers and other computers, incorporating a central processing unit and input and output unit',
    category: 'Electronics',
    unit_of_measure: 'Number',
    countries: {
      'CN': {
        country_code: 'CN',
        country_name: 'China',
        rates: {
          'general': { rate: 25, type: 'additional', effective_date: '2024-01-01', notes: 'Section 301 tariffs' }
        },
        import_volume: 150000000,
        avg_unit_value: 850
      },
      'MX': {
        country_code: 'MX',
        country_name: 'Mexico',
        rates: {
          'general': { rate: 0, type: 'mfn', effective_date: '2024-01-01', trade_agreement: 'USMCA' }
        },
        import_volume: 5000000,
        avg_unit_value: 720
      },
      'VN': {
        country_code: 'VN',
        country_name: 'Vietnam',
        rates: {
          'general': { rate: 0, type: 'mfn', effective_date: '2024-01-01' }
        },
        import_volume: 25000000,
        avg_unit_value: 680
      }
    },
    last_updated: '2024-01-15T10:00:00Z',
    data_source: 'Mock Data (Development)'
  },
  '6203.42.40': {
    hs_code: '6203.42.40',
    description: 'Men\'s or boys\' trousers, bib and brace overalls, breeches and shorts of cotton',
    category: 'Textiles',
    unit_of_measure: 'Dozen',
    countries: {
      'CN': {
        country_code: 'CN',
        country_name: 'China',
        rates: {
          'general': { rate: 7.5, type: 'additional', effective_date: '2024-01-01', notes: 'Section 301 tariffs' }
        },
        import_volume: 50000000,
        avg_unit_value: 45
      },
      'BD': {
        country_code: 'BD',
        country_name: 'Bangladesh',
        rates: {
          'general': { rate: 0, type: 'mfn', effective_date: '2024-01-01' }
        },
        import_volume: 30000000,
        avg_unit_value: 25
      }
    },
    last_updated: '2024-01-15T10:00:00Z',
    data_source: 'Mock Data (Development)'
  }
};

export class TariffService {
  private cache: Map<string, { data: HSCodeData, timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

  async getTariffData(hsCode: string): Promise<APIResponse<HSCodeData>> {
    try {
      // Normalize HS code
      const normalizedHSCode = this.normalizeHSCode(hsCode);
      
      // Check cache first
      const cached = this.cache.get(normalizedHSCode);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return {
          data: cached.data,
          success: true,
          timestamp: new Date().toISOString()
        };
      }

      // For now, use mock data - this will be replaced with real API calls
      const mockData = MOCK_TARIFF_DATA[normalizedHSCode];
      
      if (!mockData) {
        // Generate dynamic mock data for unknown HS codes
        const generatedData = this.generateMockData(normalizedHSCode);
        this.cache.set(normalizedHSCode, {
          data: generatedData,
          timestamp: Date.now()
        });
        
        return {
          data: generatedData,
          success: true,
          timestamp: new Date().toISOString()
        };
      }

      // Cache the result
      this.cache.set(normalizedHSCode, {
        data: mockData,
        timestamp: Date.now()
      });

      return {
        data: mockData,
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        data: this.generateMockData(hsCode),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async searchHSCodes(query: string): Promise<APIResponse<{ hs_code: string; description: string; category: string }[]>> {
    try {
      const results = Object.values(MOCK_TARIFF_DATA)
        .filter(item => 
          item.hs_code.includes(query) || 
          item.description.toLowerCase().includes(query.toLowerCase())
        )
        .map(item => ({
          hs_code: item.hs_code,
          description: item.description,
          category: item.category
        }));

      return {
        data: results,
        success: true,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  private normalizeHSCode(hsCode: string): string {
    return hsCode.replace(/[^0-9.]/g, '');
  }

  private generateMockData(hsCode: string): HSCodeData {
    const categories = ['Electronics', 'Textiles', 'Automotive', 'Machinery', 'Chemicals'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    return {
      hs_code: hsCode,
      description: `Product classified under HS Code ${hsCode}`,
      category: randomCategory,
      unit_of_measure: 'Kilogram',
      countries: {
        'CN': {
          country_code: 'CN',
          country_name: 'China',
          rates: {
            'general': { 
              rate: Math.floor(Math.random() * 25) + 5, 
              type: 'additional', 
              effective_date: '2024-01-01' 
            }
          },
          import_volume: Math.floor(Math.random() * 100000000),
          avg_unit_value: Math.floor(Math.random() * 1000) + 100
        }
      },
      last_updated: new Date().toISOString(),
      data_source: 'Generated Mock Data'
    };
  }

  clearCache(): void {
    this.cache.clear();
  }
}