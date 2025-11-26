import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Printer } from "lucide-react";
import { useState } from "react";

const ledgerEntries = [
  { date: "2025-01-01", voucherNo: "OB-2025-001", voucherType: "Opening Balance", description: "Opening balance for Jan 2025", debit: 850000, credit: 0, balance: 850000 },
  { date: "2025-01-05", voucherNo: "RV-2025-001", voucherType: "Receipt", description: "Customer payment received - Dr. Ahmed", debit: 25000, credit: 0, balance: 875000 },
  { date: "2025-01-08", voucherNo: "PV-2025-001", voucherType: "Payment", description: "Supplier payment - ABC Pharma", debit: 0, credit: 150000, balance: 725000 },
  { date: "2025-01-10", voucherNo: "PV-2025-002", voucherType: "Payment", description: "Rent payment for Jan 2025", debit: 0, credit: 50000, balance: 675000 },
  { date: "2025-01-12", voucherNo: "RV-2025-002", voucherType: "Receipt", description: "Cash sales collection", debit: 85000, credit: 0, balance: 760000 },
  { date: "2025-01-15", voucherNo: "CV-2025-001", voucherType: "Contra", description: "Cash deposit to bank", debit: 100000, credit: 0, balance: 860000 },
];

export default function LedgerView() {
  const [selectedAccount, setSelectedAccount] = useState("bank");
  
  const openingBalance = 850000;
  const totalDebit = ledgerEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = ledgerEntries.reduce((sum, entry) => sum + entry.credit, 0);
  const closingBalance = openingBalance + (totalDebit - totalCredit);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ledger View</h1>
            <p className="text-muted-foreground">Account-wise transaction history</p>
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

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Ledger Filters</CardTitle>
            <CardDescription>Select account and date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Select Account *</Label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash in Hand (1001)</SelectItem>
                    <SelectItem value="bank">Bank - HBL Main (1002)</SelectItem>
                    <SelectItem value="receivable">Accounts Receivable (1101)</SelectItem>
                    <SelectItem value="payable">Accounts Payable (2001)</SelectItem>
                    <SelectItem value="salary-payable">Salary Payable (2101)</SelectItem>
                    <SelectItem value="sales">Sales Revenue (4001)</SelectItem>
                    <SelectItem value="cogs">COGS (5001)</SelectItem>
                    <SelectItem value="salary-expense">Salaries Expense (5101)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input type="date" defaultValue="2025-01-01" />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input type="date" defaultValue="2025-01-31" />
              </div>
              <div className="space-y-2 flex items-end">
                <Button className="w-full gap-2">
                  <Search className="w-4 h-4" />
                  Load Ledger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ledger Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank - HBL Main Account (1002)</CardTitle>
            <CardDescription>Detailed transaction ledger</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Opening Balance */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold">Opening Balance</p>
                <p className="text-sm text-muted-foreground">As of 01-Jan-2025</p>
              </div>
              <p className="text-xl font-bold font-mono">PKR {openingBalance.toLocaleString()}</p>
            </div>

            {/* Transactions */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Voucher No.</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit (Dr)</TableHead>
                  <TableHead className="text-right">Credit (Cr)</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-mono text-sm">{entry.voucherNo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.voucherType}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{entry.description}</TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {entry.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={4} className="text-right">Totals</TableCell>
                  <TableCell className="text-right font-mono">{totalDebit.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{totalCredit.toLocaleString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Closing Balance */}
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
              <div>
                <p className="font-semibold text-lg">Closing Balance</p>
                <p className="text-sm text-muted-foreground">As of 31-Jan-2025</p>
              </div>
              <p className="text-2xl font-bold font-mono text-primary">PKR {closingBalance.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
