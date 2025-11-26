import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, Download, TrendingUp } from "lucide-react";

const mockShortExpiry = [
  {
    product: "Augmentin 625mg Tab",
    company: "GSK",
    batch: "AUG2401",
    expiry: "2025-01-15",
    daysLeft: 22,
    warehouse: "Main WH",
    qty: 450,
    cost: 35.00,
    value: 15750,
    avgSales: 25,
    urgency: "critical",
  },
  {
    product: "Insulin Glargine 100U",
    company: "Sanofi",
    batch: "INS2402",
    expiry: "2025-01-28",
    daysLeft: 35,
    warehouse: "Cold Storage",
    qty: 120,
    cost: 2500.00,
    value: 300000,
    avgSales: 8,
    urgency: "critical",
  },
  {
    product: "Amoxicillin 250mg Cap",
    company: "Pfizer",
    batch: "AMX2403",
    expiry: "2025-02-28",
    daysLeft: 66,
    warehouse: "Main WH",
    qty: 1200,
    cost: 12.50,
    value: 15000,
    avgSales: 45,
    urgency: "important",
  },
  {
    product: "Cefixime 400mg Cap",
    company: "Abbott",
    batch: "CEF2403",
    expiry: "2025-03-10",
    daysLeft: 76,
    warehouse: "Branch 1",
    qty: 680,
    cost: 28.00,
    value: 19040,
    avgSales: 18,
    urgency: "important",
  },
];

const ShortExpiry = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Short Expiry Report</h1>
            <p className="text-muted-foreground mt-1">Products expiring within the next 90 days</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Alert Card */}
        <Card className="border-critical bg-critical/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-critical flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Critical Short Expiry Alert</h3>
                <p className="text-sm text-muted-foreground">
                  185 batches worth PKR 2.8M are expiring within 60 days. Immediate action required for return or promotional sales.
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
                <label className="text-sm font-medium text-foreground mb-2 block">Expiry Range</label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">Next 30 Days</SelectItem>
                    <SelectItem value="60">Next 60 Days</SelectItem>
                    <SelectItem value="90">Next 90 Days</SelectItem>
                    <SelectItem value="180">Next 180 Days</SelectItem>
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
                    <SelectItem value="cold">Cold Storage</SelectItem>
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
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="gsk">GSK</SelectItem>
                    <SelectItem value="pfizer">Pfizer</SelectItem>
                    <SelectItem value="abbott">Abbott</SelectItem>
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
                  <Calendar className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">&lt; 30 Days</p>
                  <p className="text-2xl font-bold text-critical">PKR 485K</p>
                  <p className="text-xs text-muted-foreground">25 batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-important/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-important/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-important" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">30-60 Days</p>
                  <p className="text-2xl font-bold text-important">PKR 1.2M</p>
                  <p className="text-xs text-muted-foreground">78 batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-operational/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-operational/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-operational" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">60-90 Days</p>
                  <p className="text-2xl font-bold text-operational">PKR 1.1M</p>
                  <p className="text-xs text-muted-foreground">82 batches</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total At Risk</p>
                  <p className="text-2xl font-bold text-foreground">PKR 2.8M</p>
                  <p className="text-xs text-muted-foreground">185 batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Short Expiry Table */}
        <Card>
          <CardHeader>
            <CardTitle>Short Expiry Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Avg Sales/Day</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockShortExpiry.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.company}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.batch}</TableCell>
                    <TableCell className={`font-medium ${
                      item.urgency === 'critical' ? 'text-critical' : 'text-important'
                    }`}>
                      {item.expiry}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.daysLeft < 30 ? 'bg-critical/10 text-critical' :
                        item.daysLeft < 60 ? 'bg-important/10 text-important' :
                        'bg-operational/10 text-operational'
                      }`}>
                        {item.daysLeft} days
                      </span>
                    </TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {item.qty.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">
                      PKR {item.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.avgSales} units
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Return</Button>
                        <Button size="sm" variant="outline">Promo</Button>
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

export default ShortExpiry;
