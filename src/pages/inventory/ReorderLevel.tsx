import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Download, ShoppingCart, TrendingUp } from "lucide-react";

const mockReorderItems = [
  {
    product: "Metformin 500mg Tab",
    company: "Merck",
    warehouse: "Main WH",
    currentStock: 125,
    minLevel: 500,
    maxLevel: 2000,
    avgSales: 85,
    daysLeft: 1.5,
    suggestedQty: 1875,
    value: 18750,
    status: "critical",
  },
  {
    product: "Losartan 50mg Tab",
    company: "MSD",
    warehouse: "Branch 2",
    currentStock: 89,
    minLevel: 300,
    maxLevel: 1500,
    avgSales: 45,
    daysLeft: 2,
    suggestedQty: 1411,
    value: 14110,
    status: "critical",
  },
  {
    product: "Atorvastatin 20mg Tab",
    company: "Pfizer",
    warehouse: "Main WH",
    currentStock: 156,
    minLevel: 400,
    maxLevel: 1800,
    avgSales: 62,
    daysLeft: 2.5,
    suggestedQty: 1644,
    value: 32880,
    status: "important",
  },
  {
    product: "Omeprazole 20mg Cap",
    company: "Astra",
    warehouse: "Branch 1",
    currentStock: 245,
    minLevel: 500,
    maxLevel: 2500,
    avgSales: 78,
    daysLeft: 3.1,
    suggestedQty: 2255,
    value: 11275,
    status: "important",
  },
];

const ReorderLevel = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reorder Level Report</h1>
            <p className="text-muted-foreground mt-1">Products below minimum stock levels</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Create Bulk PR
            </Button>
          </div>
        </div>

        {/* Alert Card */}
        <Card className="border-important bg-important/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-important flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Reorder Alert</h3>
                <p className="text-sm text-muted-foreground">
                  342 products are below their minimum stock levels. Total reorder value: PKR 8.5M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Urgency</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="critical">Critical (&lt; 3 days)</SelectItem>
                    <SelectItem value="important">Important (&lt; 7 days)</SelectItem>
                    <SelectItem value="normal">Normal (&lt; 15 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Warehouse</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Warehouses</SelectItem>
                    <SelectItem value="main">Main WH</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="chronic">Chronic Care</SelectItem>
                    <SelectItem value="acute">Acute Care</SelectItem>
                    <SelectItem value="otc">OTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="pfizer">Pfizer</SelectItem>
                    <SelectItem value="gsk">GSK</SelectItem>
                    <SelectItem value="merck">Merck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-critical/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-critical/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical (&lt;3 days)</p>
                  <p className="text-2xl font-bold text-critical">45 Items</p>
                  <p className="text-xs text-muted-foreground">PKR 1.2M reorder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-important/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-important/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-important" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Important (&lt;7 days)</p>
                  <p className="text-2xl font-bold text-important">128 Items</p>
                  <p className="text-xs text-muted-foreground">PKR 3.8M reorder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-operational/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-operational/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-operational" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Normal (&lt;15 days)</p>
                  <p className="text-2xl font-bold text-operational">169 Items</p>
                  <p className="text-xs text-muted-foreground">PKR 3.5M reorder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Below Min</p>
                  <p className="text-2xl font-bold text-foreground">342 Items</p>
                  <p className="text-xs text-muted-foreground">PKR 8.5M total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reorder Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reorder Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">Current</TableHead>
                  <TableHead className="text-right">Min Level</TableHead>
                  <TableHead className="text-right">Max Level</TableHead>
                  <TableHead className="text-right">Avg Sales/Day</TableHead>
                  <TableHead className="text-right">Days Left</TableHead>
                  <TableHead className="text-right">Suggested Qty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReorderItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.company}</Badge>
                    </TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell className="text-right font-bold text-critical">
                      {item.currentStock}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.minLevel}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.maxLevel}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {item.avgSales}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${
                        item.daysLeft < 3 ? 'text-critical' : 'text-important'
                      }`}>
                        {item.daysLeft} days
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      {item.suggestedQty.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'critical' ? 'bg-critical/10 text-critical' :
                        'bg-important/10 text-important'
                      }`}>
                        {item.status === 'critical' ? 'Critical' : 'Important'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Create PR</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReorderLevel;
