import EnhancedTariffCalculator from "@/components/EnhancedTariffCalculator";
import MixedShipmentAnalyzer from "@/components/MixedShipmentAnalyzer";
import CountryComparison from "@/components/CountryComparison";
import BusinessIntelligence from "@/components/BusinessIntelligence";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Trade Intelligence Platform</h1>
          <p className="text-muted-foreground text-center">Professional tariff analysis and sourcing intelligence</p>
        </div>
        
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">Quick Calculator</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Country Compare</TabsTrigger>
            <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <EnhancedTariffCalculator />
          </TabsContent>
          
          <TabsContent value="bulk">
            <MixedShipmentAnalyzer />
          </TabsContent>
          
          <TabsContent value="comparison">
            <CountryComparison />
          </TabsContent>
          
          <TabsContent value="intelligence">
            <BusinessIntelligence />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;