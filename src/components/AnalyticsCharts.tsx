import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TariffCalculationResult } from '@/types/trade';

interface AnalyticsChartsProps {
  results: TariffCalculationResult[];
  title?: string;
}

export function AnalyticsCharts({ results, title = "Tariff Impact Analysis" }: AnalyticsChartsProps) {
  // Prepare data for charts
  const chartData = results.map((result, index) => ({
    name: result.input.product_name || `Product ${index + 1}`,
    hsCode: result.input.hs_code,
    tariffRate: result.tariff_rate,
    tariffAmount: result.tariff_amount,
    totalCost: result.total_landed_cost,
    importValue: result.input.import_value,
    effectiveRate: result.effective_rate,
    country: result.input.origin_country
  }));

  // Top 5 most impacted products
  const topImpacted = [...chartData]
    .sort((a, b) => b.tariffAmount - a.tariffAmount)
    .slice(0, 5);

  // Country breakdown for pie chart
  const countryData = chartData.reduce((acc, item) => {
    const existing = acc.find(c => c.country === item.country);
    if (existing) {
      existing.value += item.tariffAmount;
      existing.count += 1;
    } else {
      acc.push({
        country: item.country,
        value: item.tariffAmount,
        count: 1
      });
    }
    return acc;
  }, [] as { country: string; value: number; count: number }[]);

  // Colors for charts
  const CHART_COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--muted))',
    'hsl(var(--destructive))'
  ];

  const totalTariffCost = chartData.reduce((sum, item) => sum + item.tariffAmount, 0);
  const totalImportValue = chartData.reduce((sum, item) => sum + item.importValue, 0);
  const averageRate = chartData.reduce((sum, item) => sum + item.tariffRate, 0) / chartData.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tariff Cost</CardDescription>
            <CardTitle className="text-2xl font-bold text-destructive">
              ${totalTariffCost.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Import Value</CardDescription>
            <CardTitle className="text-2xl font-bold">
              ${totalImportValue.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Tariff Rate</CardDescription>
            <CardTitle className="text-2xl font-bold text-amber-600">
              {averageRate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products Analyzed</CardDescription>
            <CardTitle className="text-2xl font-bold text-primary">
              {chartData.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tariff Impact by Product */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Most Impacted Products</CardTitle>
            <CardDescription>Tariff costs by product (USD)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topImpacted} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Tariff Cost']}
                  labelFormatter={(label) => `Product: ${label}`}
                />
                <Bar dataKey="tariffAmount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Country Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Tariff Cost by Origin Country</CardTitle>
            <CardDescription>Distribution of total tariff impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ country, value }) => `${country}: $${(value / 1000).toFixed(0)}k`}
                  labelLine={false}
                  fontSize={12}
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Tariff Cost']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tariff Rates Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Tariff Rates by Product</CardTitle>
            <CardDescription>Percentage rates applied to each product</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="hsCode" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Tariff Rate']}
                  labelFormatter={(label) => `HS Code: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="tariffRate" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Import Value vs Total Landed Cost</CardTitle>
            <CardDescription>Comparison showing tariff impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topImpacted} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`, 
                    name === 'importValue' ? 'Import Value' : 'Total Landed Cost'
                  ]}
                />
                <Bar dataKey="importValue" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="totalCost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}