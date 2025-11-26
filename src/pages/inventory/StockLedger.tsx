import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Calendar } from "lucide-react";

const mockTransactions = [
  {
    date: "2025-12-20",
    type: "Opening",
    ref: "OS-2025-0001",
    batch: "PAR2401",
    expiry: "2026-06-30",
    warehouse: "Main WH",
    in: 5000,
    out: 0,
    balance: 5000,
    cost: 5.50,
    value: 27500,
  },
  {
    date: "2025-12-21",
    type: "Purchase_In",
    ref: "GRN-2025-0156",
    batch: "PAR2402",
    expiry: "2026-08-15",
    warehouse: "Main WH",
    in: 3000,
    out: 0,
    balance: 8000,
    cost: 5.75,
    value: 17250,
  },
  {
    date: "2025-12-21",
    type: "Sale_Out",
    ref: "INV-2025-0890",
    batch: "PAR2401",
    expiry: "2026-06-30",
    warehouse: "Main WH",
    in: 0,
    out: 250,
    balance: 7750,
    cost: 5.50,
    value: -1375,
  },
  {
    date: "2025-12-22",
    type: "Transfer_Out",
    ref: "TR-2025-0045",
    batch: "PAR2401",
    expiry: "2026-06-30",
    warehouse: "Main WH",
    in: 0,
    out: 500,
    balance: 7250,
    cost: 5.50,
    value: -2750,
  },
  {
    date: "2025-12-22",
    type: "Sale_Out",
    ref: "INV-2025-0901",
    batch: "PAR2402",
    expiry: "2026-08-15",
    warehouse: "Main WH",
    in: 0,
    out: 180,
    balance: 7070,
    cost: 5.75,
    value: -1035,
  },
];

const StockLedger = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stock Ledger</h1>
            <p className="text-muted-foreground mt-1">Product-wise transaction history with batch details</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">Product</label>
                <Select defaultValue="para">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="para">Paracetamol 500mg Tab</SelectItem>
                    <SelectItem value="amox">Amoxicillin 250mg Cap</SelectItem>
                    <SelectItem value="ibu">Ibuprofen 400mg Tab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Warehouse</label>
                <Select defaultValue="main">
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
                <label className="text-sm font-medium text-foreground mb-2 block">From Date</label>
                <Input type="date" defaultValue="2025-12-01" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">To Date</label>
                <Input type="date" defaultValue="2025-12-31" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button variant="outline">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="text-lg font-bold text-foreground mt-1">Paracetamol 500mg Tab</p>
                <p className="text-xs text-muted-foreground">SKU: PRD-001</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Opening Balance</p>
                <p className="text-lg font-bold text-foreground mt-1">5,000</p>
                <p className="text-xs text-muted-foreground">PKR 27,500</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total In</p>
                <p className="text-lg font-bold text-success mt-1">3,000</p>
                <p className="text-xs text-muted-foreground">PKR 17,250</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Out</p>
                <p className="text-lg font-bold text-critical mt-1">930</p>
                <p className="text-xs text-muted-foreground">PKR 5,160</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Closing Balance</p>
                <p className="text-lg font-bold text-primary mt-1">7,070</p>
                <p className="text-xs text-muted-foreground">PKR 39,590</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ledger Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Batch No.</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">In</TableHead>
                  <TableHead className="text-right">Out</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((txn, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{txn.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          txn.type.includes('In') ? 'default' : 
                          txn.type.includes('Out') ? 'secondary' : 
                          'outline'
                        }
                      >
                        {txn.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-primary font-medium">{txn.ref}</TableCell>
                    <TableCell>{txn.batch}</TableCell>
                    <TableCell className="text-muted-foreground">{txn.expiry}</TableCell>
                    <TableCell>{txn.warehouse}</TableCell>
                    <TableCell className="text-right text-success font-medium">
                      {txn.in > 0 ? txn.in.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className="text-right text-critical font-medium">
                      {txn.out > 0 ? txn.out.toLocaleString() : '-'}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">
                      {txn.balance.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {txn.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${txn.value >= 0 ? 'text-success' : 'text-critical'}`}>
                      PKR {Math.abs(txn.value).toLocaleString()}
                      {txn.value < 0 && ' CR'}
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

export default StockLedger;
