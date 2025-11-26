import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Save, FileCheck, Printer } from "lucide-react";

const salaryVoucherLines = [
  {
    lineNo: 1,
    accountHead: "Salaries Expense - Admin",
    accountCode: "5101",
    subLedger: "Admin Department",
    debit: 120000,
    credit: 0,
    costCenter: "Head Office",
    remarks: "Admin staff salaries for Jan 2025",
  },
  {
    lineNo: 2,
    accountHead: "Salaries Expense - Sales",
    accountCode: "5102",
    subLedger: "Sales Department",
    debit: 90000,
    credit: 0,
    costCenter: "Sales Division",
    remarks: "Sales team salaries for Jan 2025",
  },
  {
    lineNo: 3,
    accountHead: "Salaries Expense - Warehouse",
    accountCode: "5103",
    subLedger: "Warehouse Department",
    debit: 60000,
    credit: 0,
    costCenter: "Main Warehouse",
    remarks: "Warehouse staff salaries for Jan 2025",
  },
  {
    lineNo: 4,
    accountHead: "Overtime Expense",
    accountCode: "5104",
    subLedger: "",
    debit: 2400,
    credit: 0,
    costCenter: "",
    remarks: "Overtime payments for Jan 2025",
  },
  {
    lineNo: 5,
    accountHead: "Salary Payable",
    accountCode: "2101",
    subLedger: "",
    debit: 0,
    credit: 272400,
    costCenter: "",
    remarks: "Total net salary payable to employees",
  },
];

export default function SalaryVoucher() {
  const totalDebit = salaryVoucherLines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = salaryVoucherLines.reduce((sum, line) => sum + line.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Salary Voucher</h1>
            <p className="text-muted-foreground">Accounting entry for approved payroll</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print Voucher
            </Button>
          </div>
        </div>

        {/* Voucher Header */}
        <Card>
          <CardHeader>
            <CardTitle>Voucher Information</CardTitle>
            <CardDescription>Auto-generated from approved payroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Voucher ID</Label>
                <Input value="SV-2025-001" disabled />
              </div>
              <div className="space-y-2">
                <Label>Voucher Date</Label>
                <Input type="date" defaultValue="2025-01-31" />
              </div>
              <div className="space-y-2">
                <Label>Voucher Type</Label>
                <Input value="Salary Voucher (Journal)" disabled />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Badge variant="outline" className="w-full justify-center py-2">
                  Draft
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Payroll Reference</Label>
                <Select defaultValue="pr-2025-01">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pr-2025-01">PR-2025-01 (Jan 2025)</SelectItem>
                    <SelectItem value="pr-2024-12">PR-2024-12 (Dec 2024)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prepared By</Label>
                <Input value="Ahmed Ali (HR Manager)" disabled />
              </div>
              <div className="space-y-2">
                <Label>Approved By</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fm">Finance Manager</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pay Period</Label>
                <Input value="01/01/2025 - 31/01/2025" disabled />
              </div>
              <div className="md:col-span-4 space-y-2">
                <Label>Narration</Label>
                <Textarea
                  defaultValue="Salaries for January 2025 as per Payroll Run PR-2025-01. Total employees: 18. Breakdown: Admin (5), Sales (8), Warehouse (5)."
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounting Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Accounting Entries (Double-Entry)</CardTitle>
            <CardDescription>Debit salary expenses, credit salary payable</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Line</TableHead>
                  <TableHead className="w-[250px]">Account Head</TableHead>
                  <TableHead className="w-[100px]">Code</TableHead>
                  <TableHead className="w-[180px]">Sub-Ledger</TableHead>
                  <TableHead className="text-right w-[120px]">Debit (Dr)</TableHead>
                  <TableHead className="text-right w-[120px]">Credit (Cr)</TableHead>
                  <TableHead className="w-[150px]">Cost Center</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryVoucherLines.map((line) => (
                  <TableRow key={line.lineNo}>
                    <TableCell className="font-mono text-muted-foreground">{line.lineNo}</TableCell>
                    <TableCell className="font-medium">{line.accountHead}</TableCell>
                    <TableCell className="font-mono text-sm">{line.accountCode}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{line.subLedger || "-"}</TableCell>
                    <TableCell className="text-right font-mono">
                      {line.debit > 0 ? line.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {line.credit > 0 ? line.credit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{line.costCenter || "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{line.remarks}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell colSpan={4} className="text-right">Total</TableCell>
                  <TableCell className="text-right font-mono">
                    PKR {totalDebit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    PKR {totalCredit.toLocaleString()}
                  </TableCell>
                  <TableCell colSpan={2}>
                    {isBalanced ? (
                      <Badge variant="default" className="gap-1">✓ Balanced</Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">⚠ Not Balanced</Badge>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Accounting Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Accounting Impact Summary</CardTitle>
            <CardDescription>Effect on financial statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Expense Accounts (Debit)</p>
                <p className="text-2xl font-bold">PKR 272,400</p>
                <p className="text-xs text-muted-foreground mt-1">Increases P&L expenses</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Liability Account (Credit)</p>
                <p className="text-2xl font-bold">PKR 272,400</p>
                <p className="text-xs text-muted-foreground mt-1">Increases current liabilities</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Employees Covered</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground mt-1">Across 3 departments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                On posting: Salary expense Dr. PKR 272,400 | Salary payable Cr. PKR 272,400
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save as Draft
                </Button>
                <Button className="gap-2" disabled={!isBalanced}>
                  <FileCheck className="w-4 h-4" />
                  Post Voucher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
