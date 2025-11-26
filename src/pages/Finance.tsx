import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, Download, Search, Filter } from "lucide-react";

const mockLedgerEntries = [
  { id: "GL001", date: "2024-01-15", account: "Cash", debit: 50000, credit: 0, balance: 50000, type: "Receipt" },
  { id: "GL002", date: "2024-01-16", account: "Accounts Payable", debit: 0, credit: 25000, balance: 25000, type: "Payment" },
  { id: "GL003", date: "2024-01-17", account: "Sales Revenue", debit: 0, credit: 75000, balance: 75000, type: "Sales" },
  { id: "GL004", date: "2024-01-18", account: "Inventory", debit: 30000, credit: 0, balance: 30000, type: "Purchase" },
  { id: "GL005", date: "2024-01-19", account: "Operating Expenses", debit: 15000, credit: 0, balance: 15000, type: "Expense" },
];

const mockReceivables = [
  { id: "AR001", customer: "City Hospital", invoice: "INV-1001", amount: 45000, due: "2024-02-15", overdue: 0, status: "Current" },
  { id: "AR002", customer: "MedPlus Pharmacy", invoice: "INV-1002", amount: 28000, due: "2024-01-20", overdue: 5, status: "Overdue" },
  { id: "AR003", customer: "HealthCare Clinic", invoice: "INV-1003", amount: 52000, due: "2024-02-28", overdue: 0, status: "Current" },
  { id: "AR004", customer: "Apollo Drugs", invoice: "INV-1004", amount: 18000, due: "2024-01-15", overdue: 10, status: "Overdue" },
];

const mockPayables = [
  { id: "AP001", vendor: "MedSupply Inc", invoice: "PO-2001", amount: 35000, due: "2024-02-10", days: 15, status: "Due" },
  { id: "AP002", vendor: "PharmaCorp Ltd", invoice: "PO-2002", amount: 42000, due: "2024-02-05", days: 10, status: "Due" },
  { id: "AP003", vendor: "Global Medicine", invoice: "PO-2003", amount: 28000, due: "2024-01-25", days: -1, status: "Overdue" },
];

const mockBudget = [
  { category: "Sales & Marketing", budgeted: 500000, actual: 425000, variance: -75000, percentage: 85 },
  { category: "Operations", budgeted: 800000, actual: 850000, variance: 50000, percentage: 106 },
  { category: "Inventory Purchase", budgeted: 1200000, actual: 1150000, variance: -50000, percentage: 96 },
  { category: "Salaries & Wages", budgeted: 600000, actual: 600000, variance: 0, percentage: 100 },
  { category: "Utilities & Rent", budgeted: 150000, actual: 145000, variance: -5000, percentage: 97 },
];

const Finance = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finance Management</h1>
            <p className="text-muted-foreground mt-1">General ledger, receivables, payables & budgeting</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Financial Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$2,450,000"
            change="+18.5%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Accounts Receivable"
            value="$143,000"
            change="+5.2%"
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Accounts Payable"
            value="$105,000"
            change="-8.1%"
            icon={TrendingDown}
            trend="down"
          />
          <StatCard
            title="Net Profit"
            value="$685,000"
            change="+12.3%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        <Tabs defaultValue="ledger" className="space-y-6">
          <TabsList>
            <TabsTrigger value="ledger">General Ledger</TabsTrigger>
            <TabsTrigger value="receivables">Receivables</TabsTrigger>
            <TabsTrigger value="payables">Payables</TabsTrigger>
            <TabsTrigger value="budget">Budget & Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="ledger" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>General Ledger Entries</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search entries..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entry ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Debit</TableHead>
                      <TableHead className="text-right">Credit</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLedgerEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell>{entry.type}</TableCell>
                        <TableCell className="text-right">${entry.debit.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${entry.credit.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${entry.balance.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receivables" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Accounts Receivable</CardTitle>
                  <Button>Send Reminders</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>AR ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Overdue (Days)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReceivables.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.invoice}</TableCell>
                        <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.due}</TableCell>
                        <TableCell>{item.overdue > 0 ? item.overdue : "-"}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "Current" 
                              ? "bg-success/10 text-success" 
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Collect</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payables" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Accounts Payable</CardTitle>
                  <Button>Process Payments</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>AP ID</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Until Due</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayables.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.vendor}</TableCell>
                        <TableCell>{item.invoice}</TableCell>
                        <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.due}</TableCell>
                        <TableCell>{item.days}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "Due" 
                              ? "bg-warning/10 text-warning" 
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Pay</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Budgeted</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                      <TableHead className="text-right">% Used</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBudget.map((item) => (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-right">${item.budgeted.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${item.actual.toLocaleString()}</TableCell>
                        <TableCell className={`text-right ${item.variance > 0 ? 'text-destructive' : 'text-success'}`}>
                          ${Math.abs(item.variance).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">{item.percentage}%</TableCell>
                        <TableCell>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                item.percentage > 100 ? 'bg-destructive' : 'bg-primary'
                              }`}
                              style={{ width: `${Math.min(item.percentage, 100)}%` }}
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Finance;
