import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CalculationInput } from '@/types/trade';

interface BulkAnalysisUploaderProps {
  onProductsUploaded: (products: CalculationInput[]) => void;
  onDownloadTemplate: () => void;
  isProcessing?: boolean;
}

export function BulkAnalysisUploader({ 
  onProductsUploaded, 
  onDownloadTemplate, 
  isProcessing = false 
}: BulkAnalysisUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedProducts, setParsedProducts] = useState<CalculationInput[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setParseError(null);
    
    if (!file.name.endsWith('.csv')) {
      setParseError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const products = parseCSV(text);
        setParsedProducts(products);
      } catch (error) {
        setParseError(error instanceof Error ? error.message : 'Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText: string): CalculationInput[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV must contain at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredHeaders = ['hs_code', 'product_name', 'import_value', 'origin_country', 'currency'];
    
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
    }

    const products: CalculationInput[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        throw new Error(`Row ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
      }

      const product: CalculationInput = {
        hs_code: values[headers.indexOf('hs_code')],
        product_name: values[headers.indexOf('product_name')],
        import_value: parseFloat(values[headers.indexOf('import_value')]),
        origin_country: values[headers.indexOf('origin_country')],
        currency: values[headers.indexOf('currency')],
        shipping_cost: parseFloat(values[headers.indexOf('shipping_cost')] || '0'),
        insurance_cost: parseFloat(values[headers.indexOf('insurance_cost')] || '0'),
        warehousing_cost: parseFloat(values[headers.indexOf('warehousing_cost')] || '0')
      };

      if (!product.hs_code || !product.product_name || isNaN(product.import_value)) {
        throw new Error(`Row ${i + 1}: Invalid data in required fields`);
      }

      products.push(product);
    }

    return products;
  };

  const handleProcessProducts = () => {
    if (parsedProducts.length > 0) {
      onProductsUploaded(parsedProducts);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setParsedProducts([]);
    setParseError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Bulk Product Analysis
        </CardTitle>
        <CardDescription>
          Upload a CSV file with multiple products for comprehensive tariff impact analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFile && (
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
              <p className="text-muted-foreground mb-4">
                or click to browse and select a file
              </p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="mb-4"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                Need a template?
              </span>
              <Button variant="ghost" size="sm" onClick={onDownloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download CSV Template
              </Button>
            </div>
          </>
        )}

        {uploadedFile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {parseError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{parseError}</AlertDescription>
              </Alert>
            )}

            {parsedProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{parsedProducts.length} products</Badge>
                    <span className="text-sm text-muted-foreground">parsed successfully</span>
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto border rounded-lg">
                  <div className="grid grid-cols-4 gap-4 p-3 border-b bg-muted/50 text-sm font-medium">
                    <div>HS Code</div>
                    <div>Product Name</div>
                    <div>Value</div>
                    <div>Origin</div>
                  </div>
                  {parsedProducts.slice(0, 10).map((product, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-3 border-b text-sm">
                      <div className="font-mono">{product.hs_code}</div>
                      <div className="truncate">{product.product_name}</div>
                      <div>{product.import_value.toLocaleString()} {product.currency}</div>
                      <div>{product.origin_country}</div>
                    </div>
                  ))}
                  {parsedProducts.length > 10 && (
                    <div className="p-3 text-center text-sm text-muted-foreground">
                      ... and {parsedProducts.length - 10} more products
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleProcessProducts} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Analyze All Products'}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}