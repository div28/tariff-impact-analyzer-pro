import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Info } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface HTSCode {
  code: string;
  description: string;
  category: string;
  tariffRate: number;
  commonProducts: string[];
}

// Mock HTS database - in a real app, this would come from an API
const mockHTSCodes: HTSCode[] = [
  {
    code: '8517.12.00',
    description: 'Telephones for cellular networks or for other wireless networks',
    category: 'Electronics',
    tariffRate: 30,
    commonProducts: ['smartphones', 'cell phones', 'mobile phones']
  },
  {
    code: '8471.30.01',
    description: 'Portable automatic data processing machines',
    category: 'Electronics',
    tariffRate: 30,
    commonProducts: ['laptops', 'notebooks', 'tablets']
  },
  {
    code: '8708.99.81',
    description: 'Other parts and accessories of motor vehicles',
    category: 'Automotive',
    tariffRate: 25,
    commonProducts: ['auto parts', 'car parts', 'vehicle components']
  },
  {
    code: '6204.63.35',
    description: 'Women\'s or girls\' trousers and shorts, of synthetic fibers',
    category: 'Textiles',
    tariffRate: 20,
    commonProducts: ['pants', 'trousers', 'shorts', 'clothing']
  },
  {
    code: '9403.60.80',
    description: 'Other wooden furniture',
    category: 'Furniture',
    tariffRate: 15,
    commonProducts: ['furniture', 'wooden furniture', 'tables', 'chairs']
  }
];

interface HTSCodeLookupProps {
  onCodeSelect: (htsCode: HTSCode) => void;
  searchTerm: string;
}

export const HTSCodeLookup: React.FC<HTSCodeLookupProps> = ({ onCodeSelect, searchTerm }) => {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [results, setResults] = useState<HTSCode[]>([]);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('hts-recent-searches', []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = mockHTSCodes.filter(code =>
      code.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.commonProducts.some(product => 
        product.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      code.code.includes(searchQuery) ||
      code.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)]);
    }
  };

  const handleCodeSelect = (code: HTSCode) => {
    onCodeSelect(code);
    if (!recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)]);
    }
  };

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <Package className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">HTS Code Lookup</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by product name or HTS code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border-border focus:border-primary"
            />
          </div>
          <Button onClick={handleSearch} variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {recentSearches.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((code) => (
              <div
                key={code.code}
                className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleCodeSelect(code)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-mono text-sm font-semibold text-primary">{code.code}</div>
                    <div className="text-sm text-foreground mt-1">{code.description}</div>
                  </div>
                  <Badge variant={code.tariffRate > 25 ? "destructive" : code.tariffRate > 15 ? "warning" : "secondary"}>
                    {code.tariffRate}% tariff
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{code.category}</Badge>
                  <div className="text-xs text-muted-foreground">
                    Common: {code.commonProducts.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery.trim().length >= 2 && results.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Info className="w-8 h-8 mx-auto mb-2" />
            <p>No HTS codes found. Try different keywords or contact a trade specialist.</p>
          </div>
        )}
      </div>
    </Card>
  );
};