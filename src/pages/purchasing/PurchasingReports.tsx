import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar, TrendingUp, Package, DollarSign, RotateCcw } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyPurchase = [
  { month: "Jul", amount: 1200000 },
  { month: "Aug", amount: 1450000 },
  { month: "Sep", amount: 1350000 },
  { month: "Oct", amount: 1680000 },
  { month: "Nov", amount: 1850000 },
  { month: "Dec", amount: 2100000 },
  { month: "Jan", amount: 2350000 },
];

const supplierWise = [
  { supplier: "ABC Pharma Ltd", purchases: 2500000, percentage: 35 },
  { supplier: "HealthCare Distributors", purchases: 1800000, percentage: 25 },
  { supplier: "MediSupply Co", purchases: 1500000, percentage: 21 },
  { supplier: "Global Medicines", purchases: 1350000, percentage: 19 },
];

const productWise = [
  { product: "Paracetamol 500mg", qty: 50000, amount: 1250000, avgRate: 25 },
  { product: "Amoxicillin 250mg", qty: 35000, amount: 1575000, avgRate: 45 },
  { product: "Ibuprofen 400mg", qty: 42000, amount: 1260000, avgRate: 30 },
  { product: "Cetirizine 10mg", qty: 28000, amount: 980000, avgRate: 35 },
  { product: "Omeprazole 20mg", qty: 32000, amount: 1440000, avgRate: 45 },
];

const bonusScheme = [
  { supplier: "ABC Pharma Ltd", totalPurchase: 2500000, bonusValue: 187500, bonusPercentage: 7.5 },
  { supplier: "HealthCare Distributors", totalPurchase: 1800000, bonusValue: 126000, bonusPercentage: 7.0 },
  { supplier: "MediSupply Co", totalPurchase: 1500000, bonusValue: 105000, bonusPercentage: 7.0 },
  { supplier: "Global Medicines", totalPurchase: 1350000, bonusValue: 81000, bonusPercentage: 6.0 },
];

const shortExpiryData = [
  { product: "Paracetamol 500mg", batch: "BATCH-2024-025", supplier: "ABC Pharma Ltd", qty: 500, expiry: "2024-06-30", daysToExpiry: 160 },
  { product: "Amoxicillin 250mg", batch: "BATCH-2024-026", supplier: "MediSupply Co", qty: 800, expiry: "2024-08-15", daysToExpiry: 206 },
  { product: "Cetirizine 10mg", batch: "BATCH-2024-027", supplier: "HealthCare Distributors", qty: 300, expiry: "2024-07-20", daysToExpiry: 180 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PurchasingReports = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchasing Reports</h1>
            <p className="text-muted-foreground mt-1">Comprehensive purchase analytics and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Purchase (MTD)</p>
                  <p className="text-2xl font-bold text-foreground mt-2">PKR 8.5M</p>
                  <p className="text-sm text-success mt-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    +15.2%
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products Purchased</p>
                  <p className="text-2xl font-bold text-foreground mt-2">248</p>
                  <p className="text-sm text-muted-foreground mt-1">Across 15 categories</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bonus Received</p>
                  <p className="text-2xl font-bold text-foreground mt-2">PKR 499K</p>
                  <p className="text-sm text-success mt-1">7.2% avg bonus</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Purchase Returns</p>
                  <p className="text-2xl font-bold text-foreground mt-2">PKR 85K</p>
                  <p className="text-sm text-destructive mt-1">1.0% return rate</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <RotateCcw className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList>
            <TabsTrigger value="summary">Purchase Summary</TabsTrigger>
            <TabsTrigger value="supplier">Supplier-wise</TabsTrigger>
            <TabsTrigger value="product">Product-wise</TabsTrigger>
            <TabsTrigger value="bonus">Bonus & Schemes</TabsTrigger>
            <TabsTrigger value="expiry">Short Expiry</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Purchase Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyPurchase}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" name="Purchase Amount (PKR)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={supplierWise}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.supplier.split(' ')[0]} (${entry.percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {supplierWise.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Suppliers by Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplierWise.map((supplier, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{supplier.supplier}</p>
                          <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${supplier.percentage}%` }}
                            />
                          </div>
                        </div>
                        <p className="ml-4 font-semibold">PKR {(supplier.purchases / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="supplier">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Supplier-wise Purchase Report</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier Name</TableHead>
                      <TableHead>Total Purchase</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>No. of Orders</TableHead>
                      <TableHead>Avg Order Value</TableHead>
                      <TableHead>Last Purchase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierWise.map((supplier, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{supplier.supplier}</TableCell>
                        <TableCell className="font-semibold">PKR {supplier.purchases.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                            {supplier.percentage}%
                          </span>
                        </TableCell>
                        <TableCell>{Math.floor(supplier.purchases / 250000)}</TableCell>
                        <TableCell>PKR {(supplier.purchases / Math.floor(supplier.purchases / 250000)).toLocaleString()}</TableCell>
                        <TableCell>2024-01-{20 - idx}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="product">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Product-wise Purchase History</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Total Qty Purchased</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Avg Rate</TableHead>
                      <TableHead>Last Purchase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productWise.map((product, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{product.product}</TableCell>
                        <TableCell>{product.qty.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">PKR {product.amount.toLocaleString()}</TableCell>
                        <TableCell>PKR {product.avgRate}</TableCell>
                        <TableCell>2024-01-{22 - idx}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonus">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Bonus & Scheme Report</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Total Purchase</TableHead>
                      <TableHead>Bonus Value</TableHead>
                      <TableHead>Bonus %</TableHead>
                      <TableHead>Effective Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonusScheme.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.supplier}</TableCell>
                        <TableCell>PKR {item.totalPurchase.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold text-success">PKR {item.bonusValue.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                            {item.bonusPercentage}%
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {((item.totalPurchase - item.bonusValue) / item.totalPurchase * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell>PKR {bonusScheme.reduce((sum, item) => sum + item.totalPurchase, 0).toLocaleString()}</TableCell>
                      <TableCell className="text-success">PKR {bonusScheme.reduce((sum, item) => sum + item.bonusValue, 0).toLocaleString()}</TableCell>
                      <TableCell>
                        {(bonusScheme.reduce((sum, item) => sum + item.bonusValue, 0) / bonusScheme.reduce((sum, item) => sum + item.totalPurchase, 0) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expiry">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Short Expiry Items (Purchase-side)</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days to Expiry</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortExpiryData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>{item.qty.toLocaleString()}</TableCell>
                        <TableCell className="text-destructive font-medium">{item.expiry}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.daysToExpiry < 180 ? "bg-destructive/10 text-destructive" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {item.daysToExpiry} days
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Request Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchasingReports;
