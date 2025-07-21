import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Save, 
  History, 
  Share2, 
  BookOpen, 
  ExternalLink,
  Clock,
  Calculator,
  Trash2,
  Download
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface BusinessProfile {
  id: string;
  name: string;
  businessType: string;
  monthlyImport: string;
  countries: string[];
  products: string;
  createdAt: string;
}

interface CalculationHistory {
  id: string;
  profile: BusinessProfile;
  results: any;
  calculatedAt: string;
}

export const QuickCalculateMode = ({ onQuickCalculate }: { onQuickCalculate: (data: any) => void }) => {
  const quickScenarios = [
    {
      name: "Tech Startup",
      data: {
        businessType: "Technology/Electronics",
        monthlyImport: "$50K-$200K",
        countries: ["China", "South Korea"],
        products: "smartphones, tablets, accessories"
      }
    },
    {
      name: "Clothing Retailer",
      data: {
        businessType: "Textiles/Clothing",
        monthlyImport: "$200K-$1M",
        countries: ["China", "Mexico"],
        products: "apparel, accessories, fabrics"
      }
    },
    {
      name: "Auto Parts Distributor",
      data: {
        businessType: "Automotive",
        monthlyImport: "$1M+",
        countries: ["Germany", "Japan", "Mexico"],
        products: "auto parts, components, accessories"
      }
    },
    {
      name: "Electronics Manufacturer",
      data: {
        businessType: "Manufacturing",
        monthlyImport: "$500K-$2M",
        countries: ["China", "South Korea", "Japan"],
        products: "electronic components, semiconductors"
      }
    }
  ];

  return (
    <Card className="shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
            <Zap className="text-white h-5 w-5" />
          </div>
          Quick Calculate Mode
        </CardTitle>
        <p className="text-muted-foreground text-sm">Try common business scenarios instantly</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {quickScenarios.map((scenario, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border-2 border-green-200 bg-white hover:border-green-400 hover:shadow-md transition-all cursor-pointer"
              onClick={() => onQuickCalculate(scenario.data)}
            >
              <h4 className="font-semibold mb-2 text-green-700">{scenario.name}</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>• {scenario.data.businessType}</div>
                <div>• {scenario.data.monthlyImport} monthly imports</div>
                <div>• From: {scenario.data.countries.join(', ')}</div>
                <div>• Products: {scenario.data.products}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const BusinessProfileManager = ({ 
  currentProfile, 
  onLoadProfile 
}: { 
  currentProfile: any; 
  onLoadProfile: (profile: BusinessProfile) => void;
}) => {
  const [profiles, setProfiles] = useState<BusinessProfile[]>([]);
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = localStorage.getItem('tariff-business-profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  };

  const saveCurrentProfile = () => {
    if (!profileName.trim()) {
      toast({
        title: "Profile Name Required",
        description: "Please enter a name for this business profile.",
        variant: "destructive"
      });
      return;
    }

    const newProfile: BusinessProfile = {
      id: Date.now().toString(),
      name: profileName,
      businessType: currentProfile.businessType,
      monthlyImport: currentProfile.monthlyImport,
      countries: currentProfile.countries,
      products: currentProfile.products,
      createdAt: new Date().toISOString()
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('tariff-business-profiles', JSON.stringify(updatedProfiles));
    setProfileName('');
    
    toast({
      title: "Profile Saved",
      description: `Business profile "${newProfile.name}" has been saved.`,
    });
  };

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('tariff-business-profiles', JSON.stringify(updatedProfiles));
    
    toast({
      title: "Profile Deleted",
      description: "Business profile has been removed.",
    });
  };

  return (
    <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
            <Save className="text-white h-5 w-5" />
          </div>
          Business Profiles
        </CardTitle>
        <p className="text-muted-foreground text-sm">Save and manage multiple business configurations</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save Current Profile */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Save Current Configuration</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Profile name (e.g., Main Business, Secondary Operations)"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={saveCurrentProfile} size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>

        <Separator />

        {/* Saved Profiles */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Saved Profiles ({profiles.length})</label>
          {profiles.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No saved profiles yet. Save your current configuration above.
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {profiles.map((profile) => (
                <div 
                  key={profile.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{profile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {profile.businessType} • {profile.countries.length} countries
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onLoadProfile(profile)}
                    >
                      Load
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteProfile(profile.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const CalculationHistory = () => {
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('tariff-calculation-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('tariff-calculation-history');
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All calculation history has been removed.",
    });
  };

  return (
    <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600">
            <History className="text-white h-5 w-5" />
          </div>
          Recent Calculations
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Your calculation history</p>
          {history.length > 0 && (
            <Button size="sm" variant="outline" onClick={clearHistory}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No calculations yet. Your recent calculations will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {history.slice(0, 10).map((item) => (
              <div key={item.id} className="p-3 bg-white rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-sm">{item.profile.businessType}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.calculatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Monthly Impact:</span>
                    <div className="font-semibold text-destructive">
                      ${item.results.monthlyTariffCost?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Countries:</span>
                    <div className="font-medium">{item.profile.countries.join(', ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const MethodologySection = () => {
  return (
    <Card className="shadow-xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-slate-700 to-gray-700">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          Calculation Methodology
        </CardTitle>
        <p className="text-muted-foreground">Transparent formulas and data sources behind our analysis</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Core Calculations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Core Calculation Formulas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2 text-primary">Monthly Tariff Cost</h4>
              <div className="text-sm space-y-1">
                <div className="font-mono bg-gray-100 p-2 rounded text-xs">
                  Monthly Cost = Import Value × (Weighted Avg Tariff Rate / 100)
                </div>
                <p className="text-muted-foreground">Where weighted average accounts for import distribution across countries</p>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2 text-primary">Survival Score Algorithm</h4>
              <div className="text-sm space-y-1">
                <div className="font-mono bg-gray-100 p-2 rounded text-xs">
                  Score = 100 - (Tariff Impact × 1.2) - Volume Risk + Diversification Bonus - Industry Risk
                </div>
                <p className="text-muted-foreground">Comprehensive risk assessment across multiple factors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Official Data Sources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "USTR.gov", description: "Official tariff announcements and trade policy updates", url: "https://ustr.gov" },
              { name: "Commerce.gov", description: "International trade statistics and economic analysis", url: "https://commerce.gov" },
              { name: "CBP.gov", description: "U.S. Customs and Border Protection tariff schedules", url: "https://cbp.gov" }
            ].map((source, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary">{source.name}</h4>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{source.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assumptions & Limitations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Assumptions & Limitations</h3>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• <strong>Import Value Ranges:</strong> Calculations use midpoint values of selected ranges</li>
              <li>• <strong>Product Classification:</strong> Assumes standard HS codes without specific exemptions</li>
              <li>• <strong>Geographic Distribution:</strong> Equal weight given to all selected countries unless specified</li>
              <li>• <strong>Timeline Accuracy:</strong> Based on announced implementation dates as of July 2025</li>
              <li>• <strong>Currency Fluctuations:</strong> USD-based calculations; exchange rate impacts not included</li>
            </ul>
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last Updated: July 21, 2025</span>
            </div>
            <div>Version 2.1.0</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};