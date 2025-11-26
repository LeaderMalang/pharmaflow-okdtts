import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const accounts = [
  // Assets
  { id: "1001", code: "1001", name: "Cash in Hand", type: "Asset", subType: "Current Asset", level: 3, parent: "Cash & Bank", balance: 150000, isActive: true },
  { id: "1002", code: "1002", name: "Bank - HBL Main Account", type: "Asset", subType: "Current Asset", level: 3, parent: "Cash & Bank", balance: 850000, isActive: true },
  { id: "1101", code: "1101", name: "Accounts Receivable - Trade", type: "Asset", subType: "Current Asset", level: 3, parent: "Receivables", balance: 450000, isActive: true },
  { id: "1201", code: "1201", name: "Inventory - Medicines", type: "Asset", subType: "Current Asset", level: 3, parent: "Inventory", balance: 2500000, isActive: true },
  { id: "1501", code: "1501", name: "Fixed Assets - Vehicle", type: "Asset", subType: "Fixed Asset", level: 3, parent: "Fixed Assets", balance: 1500000, isActive: true },
  
  // Liabilities
  { id: "2001", code: "2001", name: "Accounts Payable - Trade", type: "Liability", subType: "Current Liability", level: 3, parent: "Payables", balance: 650000, isActive: true },
  { id: "2101", code: "2101", name: "Salary Payable", type: "Liability", subType: "Current Liability", level: 3, parent: "Accrued Expenses", balance: 180000, isActive: true },
  { id: "2201", code: "2201", name: "Sales Tax Payable", type: "Liability", subType: "Current Liability", level: 3, parent: "Taxes Payable", balance: 85000, isActive: true },
  
  // Capital/Equity
  { id: "3001", code: "3001", name: "Owner's Capital", type: "Capital", subType: "Equity", level: 2, parent: "Capital", balance: 3000000, isActive: true },
  { id: "3101", code: "3101", name: "Retained Earnings", type: "Capital", subType: "Equity", level: 2, parent: "Capital", balance: 500000, isActive: true },
  
  // Income
  { id: "4001", code: "4001", name: "Sales Revenue - Medicines", type: "Income", subType: "Operating Revenue", level: 3, parent: "Sales", balance: 2850000, isActive: true },
  { id: "4101", code: "4101", name: "Other Income", type: "Income", subType: "Non-Operating Revenue", level: 3, parent: "Other Income", balance: 25000, isActive: true },
  
  // Expenses
  { id: "5001", code: "5001", name: "Cost of Goods Sold", type: "Expense", subType: "Direct Expense", level: 3, parent: "COGS", balance: 1850000, isActive: true },
  { id: "5101", code: "5101", name: "Salaries Expense - Admin", type: "Expense", subType: "Operating Expense", level: 3, parent: "Salaries", balance: 120000, isActive: true },
  { id: "5102", code: "5102", name: "Salaries Expense - Sales", type: "Expense", subType: "Operating Expense", level: 3, parent: "Salaries", balance: 90000, isActive: true },
  { id: "5201", code: "5201", name: "Rent Expense", type: "Expense", subType: "Operating Expense", level: 3, parent: "Overhead", balance: 50000, isActive: true },
  { id: "5301", code: "5301", name: "Utilities Expense", type: "Expense", subType: "Operating Expense", level: 3, parent: "Overhead", balance: 15000, isActive: true },
];

export default function ChartOfAccounts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.code.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chart of Accounts</h1>
            <p className="text-muted-foreground">Assets, Liabilities, Capital, Income, Expense</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>Add a new account to your chart of accounts</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Account Code</Label>
                  <Input placeholder="e.g. 5401" />
                </div>
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input placeholder="e.g. Marketing Expense" />
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asset">Asset</SelectItem>
                      <SelectItem value="liability">Liability</SelectItem>
                      <SelectItem value="capital">Capital</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sub Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Asset</SelectItem>
                      <SelectItem value="fixed">Fixed Asset</SelectItem>
                      <SelectItem value="operating">Operating Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Parent Account (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overhead">Overhead</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="cogs">COGS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Opening Balance</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Account</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Accounts</CardTitle>
                <CardDescription>Complete chart of accounts hierarchy</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by code or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sub Type</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono">{account.code}</TableCell>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{account.subType}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{account.parent}</TableCell>
                    <TableCell className="text-right font-mono">
                      PKR {account.balance.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={account.isActive ? "default" : "secondary"}>
                        {account.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
}
