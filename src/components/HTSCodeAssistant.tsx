import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Book, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface HTSCode {
  code: string;
  description: string;
  tariffRate: number;
  notes?: string;
  examples?: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

interface HTSCodeAssistantProps {
  onCodeSelected?: (code: HTSCode) => void;
}

const HTSCodeAssistant: React.FC<HTSCodeAssistantProps> = ({ onCodeSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState<HTSCode[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'electronics', label: 'Electronics & Technology' },
    { value: 'textiles', label: 'Textiles & Apparel' },
    { value: 'machinery', label: 'Machinery & Equipment' },
    { value: 'automotive', label: 'Automotive Parts' },
    { value: 'food', label: 'Food & Beverages' },
    { value: 'chemicals', label: 'Chemicals & Plastics' },
    { value: 'metals', label: 'Metals & Minerals' },
    { value: 'furniture', label: 'Furniture & Home Goods' }
  ];

  // Sample HTS codes database (in a real app, this would be a comprehensive API)
  const htsDatabase: Record<string, HTSCode[]> = {
    electronics: [
      {
        code: '8528.72.64',
        description: 'Reception apparatus for television, color, with flat panel screen',
        tariffRate: 30,
        notes: 'Includes LED, LCD, OLED displays',
        examples: ['LED TVs', 'LCD monitors', 'Smart displays'],
        confidence: 'High'
      },
      {
        code: '8517.62.00',
        description: 'Machines for reception, conversion, transmission of voice, images',
        tariffRate: 25,
        notes: 'Communication equipment',
        examples: ['Smartphones', 'Tablets', 'WiFi routers'],
        confidence: 'High'
      },
      {
        code: '8471.30.01',
        description: 'Portable automatic data processing machines, weighing <= 10 kg',
        tariffRate: 20,
        examples: ['Laptops', 'Notebooks', 'Ultrabooks'],
        confidence: 'High'
      }
    ],
    textiles: [
      {
        code: '6109.10.00',
        description: 'T-shirts, singlets and other vests, knitted or crocheted, of cotton',
        tariffRate: 18,
        examples: ['Cotton t-shirts', 'Tank tops', 'Cotton vests'],
        confidence: 'High'
      },
      {
        code: '6203.42.40',
        description: 'Men\'s or boys\' trousers and shorts, of cotton',
        tariffRate: 22,
        examples: ['Cotton pants', 'Jeans', 'Shorts'],
        confidence: 'High'
      }
    ],
    machinery: [
      {
        code: '8419.50.50',
        description: 'Heat exchange units',
        tariffRate: 15,
        examples: ['Industrial heat exchangers', 'HVAC units'],
        confidence: 'Medium'
      }
    ],
    automotive: [
      {
        code: '8708.29.50',
        description: 'Other parts and accessories of bodies for motor vehicles',
        tariffRate: 25,
        examples: ['Bumpers', 'Fenders', 'Body panels'],
        confidence: 'Medium'
      }
    ]
  };

  const searchHTSCodes = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let searchResults: HTSCode[] = [];

    // Search through all categories if none selected or "all" is selected
    const categoriesToSearch = selectedCategory && selectedCategory !== 'all' ? [selectedCategory] : Object.keys(htsDatabase);

    categoriesToSearch.forEach(category => {
      const codes = htsDatabase[category] || [];
      const matches = codes.filter(code => 
        code.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.examples?.some(example => 
          example.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        code.code.includes(searchQuery)
      );
      searchResults = [...searchResults, ...matches];
    });

    // Add AI-powered suggestions based on common search terms
    if (searchQuery.toLowerCase().includes('phone') || searchQuery.toLowerCase().includes('mobile')) {
      searchResults.unshift({
        code: '8517.12.00',
        description: 'Telephones for cellular networks or for other wireless networks',
        tariffRate: 30,
        examples: ['Smartphones', 'Cell phones', 'Mobile phones'],
        confidence: 'High'
      });
    }

    if (searchQuery.toLowerCase().includes('computer') || searchQuery.toLowerCase().includes('laptop')) {
      searchResults.unshift({
        code: '8471.30.01',
        description: 'Portable automatic data processing machines',
        tariffRate: 20,
        examples: ['Laptops', 'Notebooks', 'Portable computers'],
        confidence: 'High'
      });
    }

    setResults(searchResults);
    setIsSearching(false);
  };

  const selectCode = (code: HTSCode) => {
    onCodeSelected?.(code);
    setIsOpen(false);
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Low':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
          Find HTS Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            HTS Code Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Interface */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Describe your product
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., smartphone, LED display, cotton t-shirt"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchHTSCodes()}
                  className="flex-1"
                />
                <Button 
                  onClick={searchHTSCodes}
                  disabled={!searchQuery.trim() || isSearching}
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Product Category (Optional)
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category to narrow search" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Suggested HTS Codes:</h3>
              {results.map((code, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500" onClick={() => selectCode(code)}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-lg font-bold text-blue-600">
                            {code.code}
                          </span>
                          <Badge variant={code.confidence === 'High' ? 'default' : code.confidence === 'Medium' ? 'secondary' : 'outline'}>
                            {getConfidenceIcon(code.confidence)}
                            {code.confidence} Match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {code.description}
                        </p>
                        {code.examples && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-500">Examples: </span>
                            <span className="text-xs text-gray-600">
                              {code.examples.join(', ')}
                            </span>
                          </div>
                        )}
                        {code.notes && (
                          <div className="text-xs text-blue-600 flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            {code.notes}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">
                          {code.tariffRate}%
                        </div>
                        <div className="text-xs text-gray-500">Tariff Rate</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {results.length === 0 && searchQuery && !isSearching && (
            <Card className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-700 mb-2">No HTS codes found</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try different keywords or a broader product description
              </p>
              <div className="text-xs text-gray-400">
                <p>Tips:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Use general terms like "electronic device" instead of specific brand names</li>
                  <li>Include material information (cotton, plastic, metal)</li>
                  <li>Try searching by function rather than product name</li>
                </ul>
              </div>
            </Card>
          )}

          {/* Help Section */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Need Help?</h4>
                <p className="text-sm text-blue-700">
                  HTS codes determine tariff rates. Getting the right classification is crucial for accurate cost calculations. 
                  For complex products, consult with a customs broker or trade attorney.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HTSCodeAssistant;