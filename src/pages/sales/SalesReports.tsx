import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download, FileText, TrendingUp, Users, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesReports = () => {
  const navigate = useNavigate();

  const dailySalesData = [
    { date: "Jan 10", sales: 45000, orders: 12 },
    { date: "Jan 11", sales: 52000, orders: 15 },
    { date: "Jan 12", sales: 48000, orders: 14 },
    { date: "Jan 13", sales: 61000, orders: 18 },
    { date: "Jan 14", sales: 55000, orders: 16 },
    { date: "Jan 15", sales: 72000, orders: 21 },
  ];

  const partyWiseSales = [
    { party: "Care Hospital", sales: 285000, orders: 8, returns: 2, outstanding: 45000 },
    { party: "City Medical Store", sales: 185000, orders: 15, returns: 1, outstanding: 25000 },
    { party: "Health Plus Pharmacy", sales: 125000, orders: 12, returns: 0, outstanding: 0 },
    { party: "Metro Pharmacy", sales: 98000, orders: 10, returns: 1, outstanding: 15000 },
    { party: "Wellness Clinic", sales: 75000, orders: 8, returns: 0, outstanding: 8500 },
  ];

  const productWiseSales = [
    { product: "Augmentin 625mg", quantity: 850, value: 382500, profit: 76500 },
    { product: "Panadol 500mg", quantity: 1200, value: 150000, profit: 22500 },
    { product: "Brufen 400mg", quantity: 950, value: 80750, profit: 16150 },
    { product: "Zithromax 500mg", quantity: 450, value: 202500, profit: 40500 },
    { product: "Flagyl 400mg", quantity: 680, value: 95200, profit: 19040 },
  ];

  const territoryPerformance = [
    { territory: "Karachi Central", mr: "Ahmed Ali", sales: 485000, target: 500000, achievement: "97%" },
    { territory: "Karachi North", mr: "Sara Khan", sales: 425000, target: 400000, achievement: "106%" },
    { territory: "Lahore", mr: "Usman Malik", sales: 385000, target: 450000, achievement: "86%" },
    { territory: "Islamabad", mr: "Fatima Noor", sales: 325000, target: 350000, achievement: "93%" },
  ];

  const shortExpiryAlert = [
    { product: "Augmentin 625mg", batch: "BT-2023-089", expiry: "2024-03-15", qty: 150, value: 67500 },
    { product: "Brufen 400mg", batch: "BT-2023-102", expiry: "2024-02-28", qty: 85, value: 7225 },
    { product: "Panadol 500mg", batch: "BT-2023-115", expiry: "2024-04-10", qty: 200, value: 25000 },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/sales")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
              <p className="text-muted-foreground mt-1">Comprehensive sales analytics and insights</p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export All Reports
          </Button>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList>
            <TabsTrigger value="summary">Sales Summary</TabsTrigger>
            <TabsTrigger value="party">Party-wise</TabsTrigger>
            <TabsTrigger value="product">Product-wise</TabsTrigger>
            <TabsTrigger value="territory">Territory</TabsTrigger>
            <TabsTrigger value="expiry">Short Expiry</TabsTrigger>
            <TabsTrigger value="profit">Profitability</TabsTrigger>
          </TabsList>

          {/* Sales Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                      <p className="text-2xl font-bold text-foreground mt-2">₨ 1,620,000</p>
                      <p className="text-sm text-success mt-1">+15% vs last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold text-foreground mt-2">96</p>
                      <p className="text-sm text-success mt-1">+8% vs last month</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                      <p className="text-2xl font-bold text-foreground mt-2">₨ 16,875</p>
                      <p className="text-sm text-success mt-1">+6% vs last month</p>
                    </div>
                    <Package className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Parties</p>
                      <p className="text-2xl font-bold text-foreground mt-2">42</p>
                      <p className="text-sm text-warning mt-1">3 new this month</p>
                    </div>
                    <Users className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" name="Sales (₨)" />
                    <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Party-wise Tab */}
          <TabsContent value="party" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Party-wise Sales Analysis</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Party Name</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Returns</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partyWiseSales.map((party, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{party.party}</TableCell>
                        <TableCell className="font-bold">₨ {party.sales.toLocaleString()}</TableCell>
                        <TableCell>{party.orders}</TableCell>
                        <TableCell>{party.returns}</TableCell>
                        <TableCell className="text-warning">₨ {party.outstanding.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(party.sales / 285000) * 100}%` }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product-wise Tab */}
          <TabsContent value="product" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product-wise Sales & Profitability</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity Sold</TableHead>
                      <TableHead>Sales Value</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productWiseSales.map((product, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{product.product}</TableCell>
                        <TableCell>{product.quantity} units</TableCell>
                        <TableCell className="font-bold">₨ {product.value.toLocaleString()}</TableCell>
                        <TableCell className="text-success font-semibold">₨ {product.profit.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                            {((product.profit / product.value) * 100).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Territory Tab */}
          <TabsContent value="territory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Territory & MR Performance</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory</TableHead>
                      <TableHead>Medical Rep</TableHead>
                      <TableHead>Actual Sales</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {territoryPerformance.map((territory, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{territory.territory}</TableCell>
                        <TableCell>{territory.mr}</TableCell>
                        <TableCell className="font-bold">₨ {territory.sales.toLocaleString()}</TableCell>
                        <TableCell>₨ {territory.target.toLocaleString()}</TableCell>
                        <TableCell className="font-bold text-primary">{territory.achievement}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            parseInt(territory.achievement) >= 100 
                              ? "bg-success/10 text-success" 
                              : parseInt(territory.achievement) >= 90
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {parseInt(territory.achievement) >= 100 ? "On Track" : "Below Target"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Short Expiry Tab */}
          <TabsContent value="expiry" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Short Expiry Alert (Next 90 Days)</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Batch No</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Value at Risk</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortExpiryAlert.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell className="text-warning font-semibold">{item.expiry}</TableCell>
                        <TableCell>{item.qty} units</TableCell>
                        <TableCell className="font-bold text-destructive">₨ {item.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Run Promotion
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profitability Tab */}
          <TabsContent value="profit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productWiseSales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Sales Value (₨)" />
                    <Bar dataKey="profit" fill="hsl(var(--chart-2))" name="Profit (₨)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SalesReports;
