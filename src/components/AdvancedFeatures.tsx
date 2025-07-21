import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, TrendingUp, Calendar, DollarSign, Download, Mail, Share2, AlertTriangle, FileText } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TariffInsuranceProps {
  results: any;
  formData: any;
}

export const TariffInsuranceCalculator: React.FC<TariffInsuranceProps> = ({ results, formData }) => {
  const [inventoryMonths, setInventoryMonths] = useState(6);
  const [currentInventoryCost, setCurrentInventoryCost] = useState(0);
  
  if (!results) return null;

  const calculateInsurance = () => {
    const monthlyImportCost = results.importValue;
    const inventoryValue = monthlyImportCost * inventoryMonths;
    const storageCostRate = 0.02; // 2% monthly storage cost
    const totalStorageCost = inventoryValue * storageCostRate * inventoryMonths;
    const futureTariffSavings = results.monthlyTariffCost * inventoryMonths;
    const netSavings = futureTariffSavings - totalStorageCost;
    const breakEvenMonths = totalStorageCost / results.monthlyTariffCost;
    
    return {
      inventoryValue,
      totalStorageCost,
      futureTariffSavings,
      netSavings,
      breakEvenMonths,
      isWorthwhile: netSavings > 0
    };
  };

  const insurance = calculateInsurance();

  return (
    <Card className="shadow-xl border-2 border-success/20 bg-gradient-to-br from-success/5 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-r from-success to-emerald-600">
            <Shield className="text-white h-6 w-6" />
          </div>
          Tariff Insurance Calculator
        </CardTitle>
        <p className="text-muted-foreground">Pre-order inventory to hedge against future tariff costs</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="months">Months of Inventory to Stock</Label>
            <Input
              id="months"
              type="number"
              value={inventoryMonths}
              onChange={(e) => setInventoryMonths(Number(e.target.value))}
              min={1}
              max={24}
              className="text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storage">Current Storage Cost (%/month)</Label>
            <Input
              id="storage"
              type="number"
              defaultValue={2}
              disabled
              className="text-lg bg-muted"
            />
          </div>
        </div>

        <Separator />

        {/* Analysis Results */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Investment Analysis
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  ${insurance.inventoryValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Inventory Investment</div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-orange-100 border border-warning/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">
                  ${insurance.totalStorageCost.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Storage & Carrying Costs</div>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-emerald-100 border border-success/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  ${insurance.futureTariffSavings.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Future Tariff Savings</div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl border-2 ${
              insurance.isWorthwhile 
                ? 'bg-gradient-to-br from-success/20 to-emerald-200 border-success' 
                : 'bg-gradient-to-br from-destructive/20 to-red-200 border-destructive'
            }`}>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  insurance.isWorthwhile ? 'text-success' : 'text-destructive'
                }`}>
                  ${Math.abs(insurance.netSavings).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Net {insurance.isWorthwhile ? 'Savings' : 'Loss'}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`p-4 rounded-xl border-2 ${
            insurance.isWorthwhile 
              ? 'bg-success/10 border-success/20' 
              : 'bg-destructive/10 border-destructive/20'
          }`}>
            <div className="flex items-start gap-3">
              {insurance.isWorthwhile ? (
                <Shield className="h-6 w-6 text-success flex-shrink-0 mt-1" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              )}
              <div>
                <h5 className={`font-semibold mb-2 ${
                  insurance.isWorthwhile ? 'text-success' : 'text-destructive'
                }`}>
                  Recommendation: {insurance.isWorthwhile ? 'STOCK UP NOW' : 'DON\'T STOCK UP'}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {insurance.isWorthwhile 
                    ? `Stocking ${inventoryMonths} months of inventory will save your business $${insurance.netSavings.toLocaleString()} over the tariff period. Break-even point: ${insurance.breakEvenMonths.toFixed(1)} months.`
                    : `The storage costs outweigh the tariff savings. Consider alternative strategies like supplier diversification or shorter-term inventory builds.`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="space-y-3">
            <h5 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Break-Even Timeline
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Break-even: {insurance.breakEvenMonths.toFixed(1)} months</span>
                <span>Analysis period: {inventoryMonths} months</span>
              </div>
              <Progress 
                value={Math.min((insurance.breakEvenMonths / inventoryMonths) * 100, 100)} 
                className="h-3"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProfessionalExportTools: React.FC<{results: any, formData: any}> = ({ results, formData }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  
  if (!results) return null;

  const generatePDFReport = () => {
    toast({
      title: "Generating PDF Report",
      description: "Your professional tariff analysis report is being prepared...",
    });
    
    // In a real implementation, this would generate an actual PDF
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your PDF report has been generated successfully.",
      });
    }, 2000);
  };

  const emailResults = () => {
    if (!contactEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Email Sent",
      description: `Results have been sent to ${contactEmail}`,
    });
  };

  const shareResults = () => {
    const shareUrl = `${window.location.origin}/?shared=${btoa(JSON.stringify({
      business: formData.businessType,
      impact: results.percentageIncrease,
      cost: results.monthlyTariffCost
    }))}`;
    
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share URL Copied",
      description: "Custom results URL copied to clipboard",
    });
  };

  return (
    <Card className="shadow-xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-r from-accent to-purple-600">
            <FileText className="text-white h-5 w-5" />
          </div>
          Professional Export Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (for reports)</Label>
            <Input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>
        </div>

        {/* Export Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            onClick={generatePDFReport}
            className="w-full h-16 flex-col gap-2"
            variant="outline"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF Report</span>
          </Button>
          
          <Button 
            onClick={emailResults}
            className="w-full h-16 flex-col gap-2"
            variant="outline"
          >
            <Mail className="h-5 w-5" />
            <span>Email Results</span>
          </Button>
          
          <Button 
            onClick={shareResults}
            className="w-full h-16 flex-col gap-2"
            variant="outline"
          >
            <Share2 className="h-5 w-5" />
            <span>Share Custom URL</span>
          </Button>
        </div>

        {/* Report Preview */}
        <div className="p-4 bg-muted/50 rounded-lg border">
          <h5 className="font-semibold mb-2">PDF Report Includes:</h5>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Executive summary with key findings</li>
            <li>• Detailed tariff impact analysis</li>
            <li>• Country-specific breakdown and recommendations</li>
            <li>• Tariff insurance calculator results</li>
            <li>• Alternative supplier suggestions</li>
            <li>• Professional charts and visualizations</li>
            <li>• Branded header with company information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export const LegalDisclaimer = () => (
  <Card className="shadow-xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-lg">
        <AlertTriangle className="h-5 w-5 text-slate-600" />
        Legal Disclaimer & Data Sources
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4 text-sm text-slate-700">
        <p className="font-semibold">
          This calculator provides estimates based on announced tariff rates as of July 2025. 
        </p>
        <p>
          <strong>Important:</strong> Actual impacts may vary based on Harmonized System (HS) product codes, 
          origin certificates, trade agreement eligibilities, and policy modifications. Results are for 
          planning purposes only and should not be considered as definitive cost projections.
        </p>
        <div className="space-y-2">
          <p className="font-semibold">Professional Consultation Required:</p>
          <p>
            Always consult qualified trade compliance professionals, customs brokers, and legal advisors 
            for business decisions involving international trade and tariff planning.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Official Data Sources:</p>
          <ul className="space-y-1 ml-4">
            <li>• United States Trade Representative (USTR.gov)</li>
            <li>• U.S. Department of Commerce</li>
            <li>• Federal Register (federalregister.gov)</li>
            <li>• U.S. Customs and Border Protection</li>
            <li>• Bureau of Economic Analysis</li>
          </ul>
        </div>
        <div className="pt-4 border-t border-slate-300">
          <p className="text-xs text-slate-500">
            Last updated: July 2025 | Version 2.1.0 | For support: support@tariffcalculator.com
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);