import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Download, Calendar } from "lucide-react";

const mockSlowMoving = [
  {
    product: "Vitamin E 400IU Cap",
    company: "Nature's Bounty",
    warehouse: "Main WH",
    qty: 2400,
    value: 120000,
    lastSaleDate: "2024-08-15",
    daysSinceLastSale: 138,
    avgMonthlySales: 5,
    category: "Supplements",
    status: "dead",
  },
  {
    product: "Cod Liver Oil 1000mg",
    company: "Seven Seas",
    warehouse: "Branch 1",
    qty: 1800,
    value: 90000,
    lastSaleDate: "2024-09-02",
    daysSinceLastSale: 120,
    avgMonthlySales: 8,
    category: "Supplements",
    status: "dead",
  },
  {
    product: "Glucosamine 1500mg Tab",
    company: "Abbott",
    warehouse: "Main WH",
    qty: 960,
    value: 144000,
    lastSaleDate: "2024-10-05",
    daysSinceLastSale: 87,
    avgMonthlySales: 12,
    category: "Supplements",
    status: "very-slow",
  },
  {
    product: "Iron Complex 100mg",
    company: "Pfizer",
    warehouse: "Branch 2",
    qty: 750,
    value: 37500,
    lastSaleDate: "2024-10-20",
    daysSinceLastSale: 72,
    avgMonthlySales: 15,
    category: "Supplements",
    status: "slow",
  },
];

const SlowMoving = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Slow / Non-Moving Stock</h1>
            <p className="text-muted-foreground mt-1">Items with no sales activity</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Alert Card */}
        <Card className="border-operational bg-operational/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-6 h-6 text-operational flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Slow Stock Alert</h3>
                <p className="text-sm text-muted-foreground">
                  89 items worth PKR 1.2M have no sales in the last 90 days. Consider discount sales or returns.
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
                <label className="text-sm font-medium text-foreground mb-2 block">No Sales Since</label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
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
                    <SelectItem value="supplements">Supplements</SelectItem>
                    <SelectItem value="otc">OTC</SelectItem>
                    <SelectItem value="cosmetics">Cosmetics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Min Value</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Values</SelectItem>
                    <SelectItem value="10k">Above PKR 10K</SelectItem>
                    <SelectItem value="50k">Above PKR 50K</SelectItem>
                    <SelectItem value="100k">Above PKR 100K</SelectItem>
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
                  <TrendingDown className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dead Stock (&gt;180 days)</p>
                  <p className="text-2xl font-bold text-critical">PKR 485K</p>
                  <p className="text-xs text-muted-foreground">18 items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-important/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-important/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-important" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Very Slow (120-180 days)</p>
                  <p className="text-2xl font-bold text-important">PKR 365K</p>
                  <p className="text-xs text-muted-foreground">28 items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-operational/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-operational/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-operational" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slow (90-120 days)</p>
                  <p className="text-2xl font-bold text-operational">PKR 350K</p>
                  <p className="text-xs text-muted-foreground">43 items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Slow Stock</p>
                  <p className="text-2xl font-bold text-foreground">PKR 1.2M</p>
                  <p className="text-xs text-muted-foreground">89 items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Slow Moving Table */}
        <Card>
          <CardHeader>
            <CardTitle>Slow Moving Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Last Sale Date</TableHead>
                  <TableHead className="text-right">Days Since</TableHead>
                  <TableHead className="text-right">Avg Monthly</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSlowMoving.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.company}</Badge>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {item.qty.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">
                      PKR {item.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {item.lastSaleDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${
                        item.daysSinceLastSale > 180 ? 'text-critical' :
                        item.daysSinceLastSale > 120 ? 'text-important' :
                        'text-operational'
                      }`}>
                        {item.daysSinceLastSale} days
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.avgMonthlySales} units
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'dead' ? 'bg-critical/10 text-critical' :
                        item.status === 'very-slow' ? 'bg-important/10 text-important' :
                        'bg-operational/10 text-operational'
                      }`}>
                        {item.status === 'dead' ? 'Dead Stock' :
                         item.status === 'very-slow' ? 'Very Slow' :
                         'Slow'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Discount</Button>
                        <Button size="sm" variant="outline">Return</Button>
                      </div>
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

export default SlowMoving;
