import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Calendar, Package } from "lucide-react";

const mockBatchStock = [
  {
    product: "Paracetamol 500mg Tab",
    company: "GSK",
    batch: "PAR2401",
    expiry: "2026-06-30",
    warehouse: "Main WH",
    qty: 4750,
    cost: 5.50,
    value: 26125,
    status: "good",
  },
  {
    product: "Paracetamol 500mg Tab",
    company: "GSK",
    batch: "PAR2402",
    expiry: "2026-08-15",
    warehouse: "Main WH",
    qty: 2820,
    cost: 5.75,
    value: 16215,
    status: "good",
  },
  {
    product: "Amoxicillin 250mg Cap",
    company: "Pfizer",
    batch: "AMX2403",
    expiry: "2025-02-28",
    warehouse: "Main WH",
    qty: 1200,
    cost: 12.50,
    value: 15000,
    status: "short-expiry",
  },
  {
    product: "Ibuprofen 400mg Tab",
    company: "Abbott",
    batch: "IBU2401",
    expiry: "2026-12-31",
    warehouse: "Branch 1",
    qty: 890,
    cost: 8.00,
    value: 7120,
    status: "good",
  },
  {
    product: "Augmentin 625mg Tab",
    company: "GSK",
    batch: "AUG2401",
    expiry: "2025-01-15",
    warehouse: "Main WH",
    qty: 450,
    cost: 35.00,
    value: 15750,
    status: "critical",
  },
];

const BatchStock = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Batch-wise Stock Report</h1>
            <p className="text-muted-foreground mt-1">Complete batch inventory with expiry tracking</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Product / Company</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10" />
                </div>
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
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Expiry Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="good">Good (&gt; 6 months)</SelectItem>
                    <SelectItem value="short">Short (&lt; 6 months)</SelectItem>
                    <SelectItem value="critical">Critical (&lt; 60 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Batches</p>
                  <p className="text-2xl font-bold text-foreground">1,245</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Good Expiry</p>
                  <p className="text-2xl font-bold text-success">PKR 42.5M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-important/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-important" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Short Expiry</p>
                  <p className="text-2xl font-bold text-important">PKR 2.8M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-critical/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-critical">PKR 485K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batch Table */}
        <Card>
          <CardHeader>
            <CardTitle>Batch Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Batch No.</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBatchStock.map((batch, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{batch.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{batch.company}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{batch.batch}</TableCell>
                    <TableCell className="font-medium">
                      <span className={
                        batch.status === 'critical' ? 'text-critical' :
                        batch.status === 'short-expiry' ? 'text-important' :
                        'text-foreground'
                      }>
                        {batch.expiry}
                      </span>
                    </TableCell>
                    <TableCell>{batch.warehouse}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {batch.qty.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {batch.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">
                      PKR {batch.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        batch.status === 'critical' ? 'bg-critical/10 text-critical' :
                        batch.status === 'short-expiry' ? 'bg-important/10 text-important' :
                        'bg-success/10 text-success'
                      }`}>
                        {batch.status === 'critical' ? '< 60 days' :
                         batch.status === 'short-expiry' ? '< 6 months' :
                         'Good'}
                      </span>
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

export default BatchStock;
