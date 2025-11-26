import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, CheckCircle, AlertCircle } from "lucide-react";

const trialBalanceData = [
  // Assets
  { code: "1001", account: "Cash in Hand", type: "Asset", debit: 150000, credit: 0 },
  { code: "1002", account: "Bank - HBL Main", type: "Asset", debit: 860000, credit: 0 },
  { code: "1101", account: "Accounts Receivable - Trade", type: "Asset", debit: 450000, credit: 0 },
  { code: "1201", account: "Inventory - Medicines", type: "Asset", debit: 2500000, credit: 0 },
  { code: "1501", account: "Fixed Assets - Vehicle", type: "Asset", debit: 1500000, credit: 0 },
  
  // Liabilities
  { code: "2001", account: "Accounts Payable - Trade", type: "Liability", debit: 0, credit: 650000 },
  { code: "2101", account: "Salary Payable", type: "Liability", debit: 0, credit: 272400 },
  { code: "2201", account: "Sales Tax Payable", type: "Liability", debit: 0, credit: 85000 },
  
  // Capital
  { code: "3001", account: "Owner's Capital", type: "Capital", debit: 0, credit: 3000000 },
  { code: "3101", account: "Retained Earnings", type: "Capital", debit: 0, credit: 500000 },
  
  // Income
  { code: "4001", account: "Sales Revenue - Medicines", type: "Income", debit: 0, credit: 2850000 },
  { code: "4101", account: "Other Income", type: "Income", debit: 0, credit: 25000 },
  
  // Expenses
  { code: "5001", account: "Cost of Goods Sold", type: "Expense", debit: 1850000, credit: 0 },
  { code: "5101", account: "Salaries Expense - Admin", type: "Expense", debit: 120000, credit: 0 },
  { code: "5102", account: "Salaries Expense - Sales", type: "Expense", debit: 90000, credit: 0 },
  { code: "5103", account: "Salaries Expense - Warehouse", type: "Expense", debit: 60000, credit: 0 },
  { code: "5104", account: "Overtime Expense", type: "Expense", debit: 2400, credit: 0 },
  { code: "5201", account: "Rent Expense", type: "Expense", debit: 50000, credit: 0 },
  { code: "5301", account: "Utilities Expense", type: "Expense", debit: 15000, credit: 0 },
  { code: "5401", account: "Marketing Expense", type: "Expense", debit: 30000, credit: 0 },
];

export default function TrialBalance() {
  const totalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebit === totalCredit;
  const difference = Math.abs(totalDebit - totalCredit);

  const groupedData = {
    Asset: trialBalanceData.filter(item => item.type === "Asset"),
    Liability: trialBalanceData.filter(item => item.type === "Liability"),
    Capital: trialBalanceData.filter(item => item.type === "Capital"),
    Income: trialBalanceData.filter(item => item.type === "Income"),
    Expense: trialBalanceData.filter(item => item.type === "Expense"),
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trial Balance</h1>
            <p className="text-muted-foreground">Verify that total debits equal total credits</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Period Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Report Period</CardTitle>
            <CardDescription>Select date range for trial balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input type="date" defaultValue="2025-01-01" />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input type="date" defaultValue="2025-01-31" />
              </div>
              <div className="space-y-2 flex items-end">
                <Button className="w-full">Generate Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {isBalanced ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-lg font-semibold">Trial Balance is Balanced ✓</p>
                      <p className="text-sm text-muted-foreground">Total Debits = Total Credits</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-8 h-8 text-destructive" />
                    <div>
                      <p className="text-lg font-semibold">Trial Balance is NOT Balanced</p>
                      <p className="text-sm text-muted-foreground">Difference: PKR {difference.toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>
              <Badge variant={isBalanced ? "default" : "destructive"} className="text-lg px-4 py-2">
                {isBalanced ? "Balanced" : "Unbalanced"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Trial Balance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Trial Balance as of 31-Jan-2025</CardTitle>
            <CardDescription>All ledger accounts with debit and credit balances</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Debit (Dr)</TableHead>
                  <TableHead className="text-right">Credit (Cr)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedData).map(([type, accounts]) => (
                  <>
                    <TableRow key={`header-${type}`} className="bg-muted/30">
                      <TableCell colSpan={5} className="font-bold">{type} Accounts</TableCell>
                    </TableRow>
                    {accounts.map((account) => (
                      <TableRow key={account.code}>
                        <TableCell className="font-mono text-sm">{account.code}</TableCell>
                        <TableCell className="font-medium">{account.account}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{account.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {account.debit > 0 ? `PKR ${account.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {account.credit > 0 ? `PKR ${account.credit.toLocaleString()}` : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
                <TableRow className="bg-primary/10 font-bold text-lg border-t-2">
                  <TableCell colSpan={3} className="text-right">Grand Total</TableCell>
                  <TableCell className="text-right font-mono">
                    PKR {totalDebit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    PKR {totalCredit.toLocaleString()}
                  </TableCell>
                </TableRow>
                {!isBalanced && (
                  <TableRow className="bg-destructive/10">
                    <TableCell colSpan={3} className="text-right font-semibold text-destructive">
                      Difference (Error)
                    </TableCell>
                    <TableCell colSpan={2} className="text-right font-mono font-semibold text-destructive">
                      PKR {difference.toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
