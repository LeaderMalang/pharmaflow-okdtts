import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, User } from "lucide-react";
import { useState } from "react";

const employeeSalaryHistory = [
  { month: "Jan 2025", payrollId: "PR-2025-01", basic: 50000, allowances: 23000, overtime: 1600, gross: 74600, deductions: 7500, net: 67100, status: "Paid", paidDate: "2025-02-05" },
  { month: "Dec 2024", payrollId: "PR-2024-12", basic: 50000, allowances: 23000, overtime: 800, gross: 73800, deductions: 7500, net: 66300, status: "Paid", paidDate: "2025-01-05" },
  { month: "Nov 2024", payrollId: "PR-2024-11", basic: 50000, allowances: 23000, overtime: 0, gross: 73000, deductions: 7500, net: 65500, status: "Paid", paidDate: "2024-12-05" },
  { month: "Oct 2024", payrollId: "PR-2024-10", basic: 50000, allowances: 23000, overtime: 1200, gross: 74200, deductions: 7500, net: 66700, status: "Paid", paidDate: "2024-11-05" },
  { month: "Sep 2024", payrollId: "PR-2024-09", basic: 45000, allowances: 20000, overtime: 0, gross: 65000, deductions: 6000, net: 59000, status: "Paid", paidDate: "2024-10-05" },
];

const advancesAndLoans = [
  { date: "2025-01-10", type: "Advance", amount: 10000, recovered: 5000, pending: 5000, status: "Partial" },
  { date: "2024-11-15", type: "Loan", amount: 50000, recovered: 20000, pending: 30000, status: "Partial" },
  { date: "2024-09-05", type: "Advance", amount: 8000, recovered: 8000, pending: 0, status: "Cleared" },
];

export default function EmployeeLedger() {
  const [selectedEmployee, setSelectedEmployee] = useState("emp-001");

  const totalPaid = employeeSalaryHistory.reduce((sum, sal) => sum + sal.net, 0);
  const totalAdvances = advancesAndLoans.reduce((sum, adv) => sum + adv.pending, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employee Ledger</h1>
            <p className="text-muted-foreground">Individual employee salary history and transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print Payslips
            </Button>
          </div>
        </div>

        {/* Employee Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Employee</CardTitle>
            <CardDescription>Choose employee to view detailed salary history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Employee *</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp-001">Ahmed Ali (EMP-001) - Manager</SelectItem>
                    <SelectItem value="emp-002">Fatima Khan (EMP-002) - Pharmacist</SelectItem>
                    <SelectItem value="emp-003">Muhammad Usman (EMP-003) - Warehouse Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input type="date" defaultValue="2024-09-01" />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input type="date" defaultValue="2025-01-31" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="font-semibold text-lg">Ahmed Ali</p>
                  <p className="text-sm text-muted-foreground">EMP-001</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Designation</p>
                  <p className="font-semibold">Manager</p>
                  <p className="text-sm text-muted-foreground">Sales Department</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid (Period)</p>
                  <p className="font-semibold text-lg text-green-600">PKR {totalPaid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Recovery</p>
                  <p className="font-semibold text-lg text-amber-600">PKR {totalAdvances.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary History */}
        <Card>
          <CardHeader>
            <CardTitle>Salary History</CardTitle>
            <CardDescription>Month-wise salary breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Payroll ID</TableHead>
                  <TableHead className="text-right">Basic</TableHead>
                  <TableHead className="text-right">Allowances</TableHead>
                  <TableHead className="text-right">OT</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeSalaryHistory.map((salary, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{salary.month}</TableCell>
                    <TableCell className="font-mono text-sm">{salary.payrollId}</TableCell>
                    <TableCell className="text-right font-mono">{salary.basic.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-muted-foreground">{salary.allowances.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-green-600">
                      {salary.overtime > 0 ? `+${salary.overtime.toLocaleString()}` : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">{salary.gross.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-red-600">-{salary.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono font-bold text-primary">{salary.net.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="default">{salary.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{salary.paidDate}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell colSpan={7} className="text-right">Total Paid (5 months)</TableCell>
                  <TableCell className="text-right font-mono text-lg">PKR {totalPaid.toLocaleString()}</TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Advances & Loans */}
        <Card>
          <CardHeader>
            <CardTitle>Advances & Loans</CardTitle>
            <CardDescription>Outstanding advances and loan recovery status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Recovered</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advancesAndLoans.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{item.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono text-green-600">{item.recovered.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {item.pending > 0 ? item.pending.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Cleared" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-amber-50 dark:bg-amber-950/20 font-bold">
                  <TableCell colSpan={4} className="text-right">Total Pending Recovery</TableCell>
                  <TableCell className="text-right font-mono text-lg text-amber-600">PKR {totalAdvances.toLocaleString()}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
