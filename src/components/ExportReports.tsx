import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, FileSpreadsheet, Share2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportReportsProps {
  results: any;
  formData: any;
}

export const ExportReports: React.FC<ExportReportsProps> = ({ results, formData }) => {
  const [selectedSections, setSelectedSections] = useState<string[]>([
    'summary',
    'breakdown',
    'recommendations'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const reportSections = [
    { id: 'summary', label: 'Executive Summary', description: 'Key metrics and impact overview' },
    { id: 'breakdown', label: 'Cost Breakdown', description: 'Detailed cost analysis by country' },
    { id: 'recommendations', label: 'AI Recommendations', description: 'Strategic recommendations and actions' },
    { id: 'timeline', label: 'Timeline Analysis', description: 'Before/after implementation timeline' },
    { id: 'scenarios', label: 'Scenario Analysis', description: 'Alternative supplier scenarios' },
    { id: 'compliance', label: 'Compliance Notes', description: 'Trade compliance considerations' }
  ];

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a mock PDF download
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tariff-impact-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
    toast({
      title: "Report Generated",
      description: "Your tariff impact report has been downloaded."
    });
  };

  const generateExcelReport = async () => {
    setIsGenerating(true);
    
    // Simulate Excel generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create CSV content (mock Excel)
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tariff-impact-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsGenerating(false);
    toast({
      title: "Spreadsheet Generated",
      description: "Your tariff impact data has been exported to CSV."
    });
  };

  const shareReport = async () => {
    const shareableUrl = `${window.location.origin}${window.location.pathname}?shared=${btoa(JSON.stringify({
      imports: formData.imports,
      countries: formData.countries,
      monthlyValue: formData.monthlyValue,
      timestamp: new Date().toISOString()
    }))}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tariff Impact Analysis',
          text: `Check out this tariff impact analysis: ${formatCurrency(results.annualTariffCost)} annual impact`,
          url: shareableUrl
        });
      } catch (error) {
        navigator.clipboard.writeText(shareableUrl);
        toast({
          title: "Link Copied",
          description: "Shareable link copied to clipboard"
        });
      }
    } else {
      navigator.clipboard.writeText(shareableUrl);
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard"
      });
    }
  };

  const emailReport = () => {
    const subject = encodeURIComponent('Tariff Impact Analysis Report');
    const body = encodeURIComponent(`Here's the tariff impact analysis for ${formData.imports}:

Key Findings:
- Annual Tariff Impact: ${formatCurrency(results.annualTariffCost)}
- Monthly Impact: ${formatCurrency(results.monthlyTariffCost)}
- Percentage Increase: ${results.percentageIncrease.toFixed(1)}%
- Countries: ${formData.countries.join(', ')}

Generated on ${new Date().toLocaleDateString()}

Please find the detailed report attached.`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const generateReportContent = () => {
    return `TARIFF IMPACT ANALYSIS REPORT
Generated on ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
================
Products: ${formData.imports}
Source Countries: ${formData.countries.join(', ')}
Monthly Import Value: ${formatCurrency(parseInt(formData.monthlyValue))}

KEY METRICS
===========
Monthly Tariff Impact: ${formatCurrency(results.monthlyTariffCost)}
Annual Tariff Impact: ${formatCurrency(results.annualTariffCost)}
Percentage Increase: ${results.percentageIncrease.toFixed(1)}%

RECOMMENDATIONS
===============
${results.aiRecommendations.map((rec: any, index: number) => 
  `${index + 1}. ${rec.action} - ${rec.benefit}`
).join('\n')}

DISCLAIMER
==========
This analysis is based on publicly available tariff schedules and is for planning purposes only.
Consult with trade professionals for specific compliance guidance.`;
  };

  const generateCSVContent = () => {
    return `Category,Current Cost,After Tariffs,Impact
Monthly Product Cost,${results.currentMonthlyCost * 0.85},${results.currentMonthlyCost * 0.85},No change
Monthly Shipping,${results.currentMonthlyCost * 0.15},${results.currentMonthlyCost * 0.15},No change
Monthly Tariffs,0,${results.monthlyTariffCost},+${formatCurrency(results.monthlyTariffCost)}
Total Monthly,${results.currentMonthlyCost},${results.newMonthlyCost},+${results.percentageIncrease.toFixed(1)}%

Country,Tariff Rate,Risk Level
${results.selectedCountries.map((country: any) => 
  `${country.name},${country.tariff}%,${country.risk}`
).join('\n')}`;
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-6 h-6 text-primary" />
        <div>
          <h3 className="text-xl font-semibold text-foreground">Export Reports</h3>
          <p className="text-sm text-muted-foreground">Generate and share professional reports</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Report Sections */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Include in Report</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {reportSections.map((section) => (
              <div key={section.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <Checkbox
                  id={section.id}
                  checked={selectedSections.includes(section.id)}
                  onCheckedChange={() => toggleSection(section.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor={section.id} className="font-medium text-foreground cursor-pointer">
                    {section.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-red-600" />
              <div>
                <h4 className="font-semibold text-foreground">PDF Report</h4>
                <p className="text-sm text-muted-foreground">Professional formatted report</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">Executive Summary</Badge>
                <Badge variant="secondary" className="text-xs">Charts & Graphs</Badge>
                <Badge variant="secondary" className="text-xs">Recommendations</Badge>
              </div>
              <Button 
                onClick={generatePDFReport} 
                disabled={isGenerating || selectedSections.length === 0}
                className="w-full"
              >
                {isGenerating ? 'Generating...' : 'Generate PDF'}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-foreground">Excel Export</h4>
                <p className="text-sm text-muted-foreground">Raw data for analysis</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">Cost Breakdown</Badge>
                <Badge variant="secondary" className="text-xs">Country Data</Badge>
                <Badge variant="secondary" className="text-xs">Timeline</Badge>
              </div>
              <Button 
                onClick={generateExcelReport} 
                disabled={isGenerating}
                variant="outline"
                className="w-full"
              >
                {isGenerating ? 'Generating...' : 'Export to CSV'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Sharing Options */}
        <div className="border-t border-border pt-4">
          <h4 className="font-semibold text-foreground mb-3">Share Analysis</h4>
          <div className="flex flex-wrap gap-2">
            <Button onClick={shareReport} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            <Button onClick={emailReport} variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-semibold text-foreground mb-2">Report Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📄 {selectedSections.length} sections selected</p>
            <p>📊 Annual Impact: {formatCurrency(results.annualTariffCost)}</p>
            <p>🌍 Countries: {formData.countries.join(', ')}</p>
            <p>📅 Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};