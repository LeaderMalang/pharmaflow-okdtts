import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const suppliers = [
  { id: "SUP-001", name: "ABC Pharma Ltd", outstandingBalance: 450000, lastPurchase: "2024-01-20", avgPaymentDays: 42, totalPurchases: 2500000 },
  { id: "SUP-002", name: "MediSupply Co", outstandingBalance: 280000, lastPurchase: "2024-01-21", avgPaymentDays: 38, totalPurchases: 1800000 },
  { id: "SUP-003", name: "HealthCare Distributors", outstandingBalance: 620000, lastPurchase: "2024-01-19", avgPaymentDays: 55, totalPurchases: 3200000 },
  { id: "SUP-004", name: "Global Medicines", outstandingBalance: 0, lastPurchase: "2024-01-18", avgPaymentDays: 32, totalPurchases: 1500000 },
];

const ledgerEntries = [
  { date: "2024-01-22", type: "Invoice", reference: "INV-2024-P-001", description: "Purchase of medicines", debit: 450000, credit: 0, balance: 450000 },
  { date: "2024-01-20", type: "Payment", reference: "PV-2024-001", description: "Payment via bank transfer", debit: 0, credit: 200000, balance: 250000 },
  { date: "2024-01-18", type: "Invoice", reference: "INV-2024-P-002", description: "Purchase of medicines", debit: 385000, credit: 0, balance: 450000 },
  { date: "2024-01-15", type: "Return", reference: "PR-2024-001", description: "Return - Short expiry", debit: 0, credit: 45000, balance: 65000 },
  { date: "2024-01-12", type: "Payment", reference: "PV-2024-002", description: "Payment via cash", debit: 0, credit: 110000, balance: 110000 },
];

const SupplierLedger = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Supplier Ledger</h1>
            <p className="text-muted-foreground mt-1">Track supplier balances and payment history</p>
            <p className="text-xs text-muted-foreground italic mt-1">"O you who believe! When you contract a debt… write it down…" (2:282)</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Payables</p>
              <p className="text-2xl font-bold text-foreground mt-2">PKR 1.35M</p>
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +12% this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Avg Payment Days</p>
              <p className="text-2xl font-bold text-foreground mt-2">42 days</p>
              <p className="text-sm text-success mt-1 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                -3 days improved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Overdue Payments</p>
              <p className="text-2xl font-bold text-foreground mt-2">PKR 180K</p>
              <p className="text-sm text-warning mt-1">3 suppliers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">This Month Paid</p>
              <p className="text-2xl font-bold text-foreground mt-2">PKR 850K</p>
              <p className="text-sm text-success mt-1">8 payments</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList>
            <TabsTrigger value="summary">Supplier Summary</TabsTrigger>
            <TabsTrigger value="ledger">Detailed Ledger</TabsTrigger>
            <TabsTrigger value="aging">Aging Report</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All Suppliers</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search suppliers..." className="pl-10 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier Code</TableHead>
                      <TableHead>Supplier Name</TableHead>
                      <TableHead>Outstanding Balance</TableHead>
                      <TableHead>Last Purchase</TableHead>
                      <TableHead>Avg Payment Days</TableHead>
                      <TableHead>Total Purchases (YTD)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell className={`font-semibold ${supplier.outstandingBalance > 0 ? "text-destructive" : "text-success"}`}>
                          PKR {supplier.outstandingBalance.toLocaleString()}
                        </TableCell>
                        <TableCell>{supplier.lastPurchase}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            supplier.avgPaymentDays > 45 ? "bg-destructive/10 text-destructive" :
                            supplier.avgPaymentDays > 35 ? "bg-warning/10 text-warning" :
                            "bg-success/10 text-success"
                          }`}>
                            {supplier.avgPaymentDays} days
                          </span>
                        </TableCell>
                        <TableCell>PKR {supplier.totalPurchases.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View Ledger</Button>
                            {supplier.outstandingBalance > 0 && (
                              <Button variant="ghost" size="sm" className="text-primary">
                                Pay
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ledger">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Supplier: ABC Pharma Ltd</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Outstanding Balance: PKR 450,000</p>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="abc">
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">ABC Pharma Ltd</SelectItem>
                        <SelectItem value="medi">MediSupply Co</SelectItem>
                        <SelectItem value="health">HealthCare Distributors</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ledgerEntries.map((entry, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            entry.type === "Invoice" ? "bg-primary/10 text-primary" :
                            entry.type === "Payment" ? "bg-success/10 text-success" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {entry.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{entry.reference}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.description}</TableCell>
                        <TableCell className={entry.debit > 0 ? "text-destructive font-semibold" : ""}>
                          {entry.debit > 0 ? `PKR ${entry.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className={entry.credit > 0 ? "text-success font-semibold" : ""}>
                          {entry.credit > 0 ? `PKR ${entry.credit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="font-bold">PKR {entry.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aging">
            <Card>
              <CardHeader>
                <CardTitle>Payables Aging Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Current (0-30)</TableHead>
                      <TableHead>31-60 Days</TableHead>
                      <TableHead>61-90 Days</TableHead>
                      <TableHead>90+ Days</TableHead>
                      <TableHead>Total Outstanding</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ABC Pharma Ltd</TableCell>
                      <TableCell>PKR 250,000</TableCell>
                      <TableCell>PKR 150,000</TableCell>
                      <TableCell>PKR 50,000</TableCell>
                      <TableCell className="text-destructive">PKR 0</TableCell>
                      <TableCell className="font-bold">PKR 450,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">MediSupply Co</TableCell>
                      <TableCell>PKR 180,000</TableCell>
                      <TableCell>PKR 100,000</TableCell>
                      <TableCell>PKR 0</TableCell>
                      <TableCell className="text-destructive">PKR 0</TableCell>
                      <TableCell className="font-bold">PKR 280,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">HealthCare Distributors</TableCell>
                      <TableCell>PKR 320,000</TableCell>
                      <TableCell>PKR 200,000</TableCell>
                      <TableCell>PKR 100,000</TableCell>
                      <TableCell className="text-destructive font-bold">PKR 0</TableCell>
                      <TableCell className="font-bold">PKR 620,000</TableCell>
                    </TableRow>
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell>PKR 750,000</TableCell>
                      <TableCell>PKR 450,000</TableCell>
                      <TableCell>PKR 150,000</TableCell>
                      <TableCell className="text-destructive">PKR 0</TableCell>
                      <TableCell>PKR 1,350,000</TableCell>
                    </TableRow>
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

export default SupplierLedger;
