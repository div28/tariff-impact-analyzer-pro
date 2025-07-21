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
  Download,
  Globe,
  HelpCircle
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
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">Behind the Numbers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understand the detailed methodology and assumptions behind our tariff impact calculations
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Interactive Formula Breakdown */}
          <Card className="shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Step-by-Step Calculation Process</h3>
              <p className="opacity-90">How we transform your inputs into precise tariff impact estimates</p>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Import Value</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Convert range to midpoint</div>
                    <div className="font-mono bg-blue-50 p-2 rounded text-xs">
                      "$50K-$200K" → $125K
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Weighted Tariff</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Calculate country average</div>
                    <div className="font-mono bg-orange-50 p-2 rounded text-xs">
                      (30% + 40%) ÷ 2 = 35%
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Monthly Impact</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Apply tariff rate</div>
                    <div className="font-mono bg-green-50 p-2 rounded text-xs">
                      $125K × 35% = $43.75K
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Annual Total</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Project yearly cost</div>
                    <div className="font-mono bg-purple-50 p-2 rounded text-xs">
                      $43.75K × 12 = $525K
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Range Values Table */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Import Range Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { range: "Under $10K", value: "$5,000" },
                    { range: "$10K-$50K", value: "$30,000" },
                    { range: "$50K-$200K", value: "$125,000" },
                    { range: "$200K-$1M", value: "$600,000" },
                    { range: "Over $1M", value: "$2,000,000" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium">{item.range}</span>
                      <span className="text-primary font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Current Tariff Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { country: "China", rate: "30%", status: "High Impact" },
                    { country: "Germany", rate: "40%", status: "Highest Rate" },
                    { country: "Mexico", rate: "25%", status: "Moderate" },
                    { country: "Japan", rate: "24%", status: "Moderate" },
                    { country: "South Korea", rate: "35%", status: "High Impact" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <span className="font-medium">{item.country}</span>
                        <div className="text-xs text-muted-foreground">{item.status}</div>
                      </div>
                      <span className={`font-bold ${
                        parseFloat(item.rate) >= 35 ? 'text-destructive' : 
                        parseFloat(item.rate) >= 25 ? 'text-warning' : 'text-success'
                      }`}>{item.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Limitations & Disclaimer */}
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <HelpCircle className="h-5 w-5" />
                Important Limitations & Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-amber-800 mb-1">Import Value Ranges</div>
                    <div className="text-amber-700">Calculations use midpoint values of selected ranges for estimation purposes</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-800 mb-1">Product Classification</div>
                    <div className="text-amber-700">Assumes standard HS codes without specific exemptions or special cases</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-amber-800 mb-1">Geographic Distribution</div>
                    <div className="text-amber-700">Equal weight given to all selected countries unless otherwise specified</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-800 mb-1">Currency & Exchange</div>
                    <div className="text-amber-700">All calculations in USD; exchange rate fluctuations not included</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};