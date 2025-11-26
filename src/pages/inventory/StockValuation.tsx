import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, Package, TrendingUp, Warehouse, Building2, Layers, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const StockValuation = () => {
  const [selectedView, setSelectedView] = useState<"warehouse" | "company" | "category">("warehouse");
  const [drillDownData, setDrillDownData] = useState<any>(null);

  // Mock data - replace with actual API calls
  const totalValue = 45250000;
  const totalItems = 1847;
  const warehouses = 12;
  const categories = 35;

  const warehouseData = [
    { name: "Main Warehouse", value: 12500000, items: 485, percentage: 27.6 },
    { name: "Branch A", value: 8750000, items: 342, percentage: 19.3 },
    { name: "Branch B", value: 7200000, items: 298, percentage: 15.9 },
    { name: "Branch C", value: 5800000, items: 245, percentage: 12.8 },
    { name: "Van 1", value: 3200000, items: 156, percentage: 7.1 },
    { name: "Van 2", value: 2900000, items: 142, percentage: 6.4 },
    { name: "Cold Storage", value: 2400000, items: 98, percentage: 5.3 },
    { name: "Others", value: 2500000, items: 81, percentage: 5.5 },
  ];

  const companyData = [
    { name: "GSK Pharma", value: 8500000, items: 245, percentage: 18.8 },
    { name: "Abbott Labs", value: 7800000, items: 198, percentage: 17.2 },
    { name: "Novartis", value: 6200000, items: 176, percentage: 13.7 },
    { name: "Pfizer", value: 5900000, items: 165, percentage: 13.0 },
    { name: "Roche", value: 4800000, items: 142, percentage: 10.6 },
    { name: "Sanofi", value: 3900000, items: 128, percentage: 8.6 },
    { name: "AstraZeneca", value: 3200000, items: 98, percentage: 7.1 },
    { name: "Others", value: 4950000, items: 695, percentage: 10.9 },
  ];

  const categoryData = [
    { name: "Antibiotics", value: 9800000, items: 342, percentage: 21.7 },
    { name: "Cardiovascular", value: 8200000, items: 298, percentage: 18.1 },
    { name: "Pain Management", value: 6500000, items: 256, percentage: 14.4 },
    { name: "Diabetes Care", value: 5800000, items: 187, percentage: 12.8 },
    { name: "Respiratory", value: 4200000, items: 165, percentage: 9.3 },
    { name: "Gastrointestinal", value: 3800000, items: 142, percentage: 8.4 },
    { name: "Vitamins & Supplements", value: 2950000, items: 198, percentage: 6.5 },
    { name: "Others", value: 4000000, items: 259, percentage: 8.8 },
  ];

  const drillDownDetails = {
    warehouse: {
      "Main Warehouse": [
        { product: "Augmentin 625mg", batch: "BAT001", qty: 2500, costPrice: 180, value: 450000, expiry: "2025-12-15" },
        { product: "Panadol Extra", batch: "BAT045", qty: 5000, costPrice: 25, value: 125000, expiry: "2026-03-20" },
        { product: "Lipitor 20mg", batch: "BAT089", qty: 1200, costPrice: 320, value: 384000, expiry: "2025-09-10" },
        { product: "Ventolin Inhaler", batch: "BAT112", qty: 800, costPrice: 420, value: 336000, expiry: "2025-11-25" },
        { product: "Metformin 500mg", batch: "BAT156", qty: 3500, costPrice: 45, value: 157500, expiry: "2026-01-30" },
      ],
    },
    company: {
      "GSK Pharma": [
        { product: "Augmentin 625mg", batch: "BAT001", qty: 2500, costPrice: 180, value: 450000, expiry: "2025-12-15" },
        { product: "Ventolin Inhaler", batch: "BAT112", qty: 800, costPrice: 420, value: 336000, expiry: "2025-11-25" },
        { product: "Amoxil 500mg", batch: "BAT203", qty: 1800, costPrice: 95, value: 171000, expiry: "2026-02-18" },
      ],
    },
    category: {
      "Antibiotics": [
        { product: "Augmentin 625mg", batch: "BAT001", qty: 2500, costPrice: 180, value: 450000, expiry: "2025-12-15" },
        { product: "Amoxil 500mg", batch: "BAT203", qty: 1800, costPrice: 95, value: 171000, expiry: "2026-02-18" },
        { product: "Azithromycin 500mg", batch: "BAT267", qty: 1200, costPrice: 145, value: 174000, expiry: "2025-08-22" },
        { product: "Ciprofloxacin 500mg", batch: "BAT298", qty: 2200, costPrice: 85, value: 187000, expiry: "2026-04-15" },
      ],
    },
  };

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const getCurrentData = () => {
    switch (selectedView) {
      case "warehouse":
        return warehouseData;
      case "company":
        return companyData;
      case "category":
        return categoryData;
      default:
        return warehouseData;
    }
  };

  const handleDrillDown = (entry: any) => {
    const details = drillDownDetails[selectedView]?.[entry.name] || [];
    setDrillDownData({ name: entry.name, items: details, totalValue: entry.value });
  };

  const formatCurrency = (value: number) => {
    return `₨ ${(value / 1000).toFixed(0)}k`;
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stock Valuation</h1>
            <p className="text-muted-foreground mt-1">Real-time inventory value analysis and drill-down</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all-warehouses">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-warehouses">All Warehouses</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="branch-a">Branch A</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-companies">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-companies">All Companies</SelectItem>
                <SelectItem value="gsk">GSK Pharma</SelectItem>
                <SelectItem value="abbott">Abbott Labs</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Report</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Stock Value</p>
                  <p className="text-2xl font-bold text-foreground mt-2">₨ {(totalValue / 1000000).toFixed(2)}M</p>
                  <p className="text-sm text-success mt-1">+12.5% vs last month</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{totalItems.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">{categories} categories</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-2/10">
                  <Package className="w-6 h-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warehouses</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{warehouses}</p>
                  <p className="text-sm text-muted-foreground mt-1">Active locations</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-3/10">
                  <Warehouse className="w-6 h-6 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Item Value</p>
                  <p className="text-2xl font-bold text-foreground mt-2">₨ {(totalValue / totalItems).toFixed(0)}</p>
                  <p className="text-sm text-success mt-1">+8.2% increase</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-4/10">
                  <TrendingUp className="w-6 h-6 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Valuation View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stock Value Breakdown</CardTitle>
              <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)}>
                <TabsList>
                  <TabsTrigger value="warehouse" className="gap-2">
                    <Warehouse className="w-4 h-4" />
                    By Warehouse
                  </TabsTrigger>
                  <TabsTrigger value="company" className="gap-2">
                    <Building2 className="w-4 h-4" />
                    By Company
                  </TabsTrigger>
                  <TabsTrigger value="category" className="gap-2">
                    <Layers className="w-4 h-4" />
                    By Category
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Value Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={formatCurrency} />
                    <Tooltip 
                      formatter={(value: any) => [`₨ ${value.toLocaleString()}`, 'Value']}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} cursor="pointer" onClick={(data) => handleDrillDown(data)} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Percentage Share</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCurrentData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.percentage}%`}
                      cursor="pointer"
                      onClick={(data) => handleDrillDown(data)}
                    >
                      {getCurrentData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`₨ ${value.toLocaleString()}`, 'Value']}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Table */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Detailed Summary</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{selectedView === "warehouse" ? "Warehouse" : selectedView === "company" ? "Company" : "Category"}</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Share %</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentData().map((item, idx) => (
                    <TableRow key={idx} className="cursor-pointer hover:bg-accent/50" onClick={() => handleDrillDown(item)}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.items}</TableCell>
                      <TableCell className="text-right">₨ {item.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Drill-Down Details */}
        {drillDownData && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Drill-Down: {drillDownData.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total Value: ₨ {drillDownData.totalValue.toLocaleString()}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setDrillDownData(null)}>Close</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Cost Price</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drillDownData.items.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.batch}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right">₨ {item.costPrice}</TableCell>
                      <TableCell className="text-right font-semibold">₨ {item.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={new Date(item.expiry) < new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) ? "destructive" : "outline"}>
                          {item.expiry}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StockValuation;
