import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, FileText, CheckCircle, Download } from "lucide-react";
import { useState } from "react";

const employees = [
  {
    id: "EMP-001",
    code: "EMP-001",
    name: "Ahmed Ali",
    designation: "Manager",
    department: "Sales",
    basicSalary: 50000,
    houseRent: 15000,
    medical: 5000,
    transport: 3000,
    presentDays: 26,
    absentDays: 0,
    lateDays: 0,
    overtimeHours: 8,
    overtimeRate: 200,
    deductionAdvance: 5000,
    deductionTax: 2500,
    paymentMode: "Bank Transfer",
    bankAccount: "12345678901",
  },
  {
    id: "EMP-002",
    code: "EMP-002",
    name: "Fatima Khan",
    designation: "Pharmacist",
    department: "Operations",
    basicSalary: 40000,
    houseRent: 12000,
    medical: 4000,
    transport: 2500,
    presentDays: 24,
    absentDays: 2,
    lateDays: 1,
    overtimeHours: 0,
    overtimeRate: 150,
    deductionAdvance: 0,
    deductionTax: 1800,
    paymentMode: "Bank Transfer",
    bankAccount: "98765432109",
  },
  {
    id: "EMP-003",
    code: "EMP-003",
    name: "Muhammad Usman",
    designation: "Warehouse Staff",
    department: "Warehouse",
    basicSalary: 30000,
    houseRent: 9000,
    medical: 3000,
    transport: 2000,
    presentDays: 26,
    absentDays: 0,
    lateDays: 0,
    overtimeHours: 12,
    overtimeRate: 120,
    deductionAdvance: 3000,
    deductionTax: 1200,
    paymentMode: "Cash",
    bankAccount: "",
  },
];

export default function PayrollRun() {
  const [payrollStatus, setPayrollStatus] = useState("draft");
  
  const calculateGrossSalary = (emp: typeof employees[0]) => {
    return emp.basicSalary + emp.houseRent + emp.medical + emp.transport;
  };

  const calculateOvertimeAmount = (emp: typeof employees[0]) => {
    return emp.overtimeHours * emp.overtimeRate;
  };

  const calculateAbsentDeduction = (emp: typeof employees[0]) => {
    const perDayRate = emp.basicSalary / 26;
    return Math.round(perDayRate * emp.absentDays);
  };

  const calculateTotalDeductions = (emp: typeof employees[0]) => {
    return calculateAbsentDeduction(emp) + emp.deductionAdvance + emp.deductionTax;
  };

  const calculateNetSalary = (emp: typeof employees[0]) => {
    return calculateGrossSalary(emp) + calculateOvertimeAmount(emp) - calculateTotalDeductions(emp);
  };

  const totalNetPayable = employees.reduce((sum, emp) => sum + calculateNetSalary(emp), 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll Run</h1>
            <p className="text-muted-foreground">Monthly salary calculation with attendance integration</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Payslips
            </Button>
          </div>
        </div>

        {/* Payroll Header */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Period</CardTitle>
            <CardDescription>Select pay period and fetch employee data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Payroll ID</Label>
                <Input value="PR-2025-01" disabled />
              </div>
              <div className="space-y-2">
                <Label>Pay Period Month *</Label>
                <Select defaultValue="01">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">January</SelectItem>
                    <SelectItem value="02">February</SelectItem>
                    <SelectItem value="03">March</SelectItem>
                    <SelectItem value="04">April</SelectItem>
                    <SelectItem value="05">May</SelectItem>
                    <SelectItem value="06">June</SelectItem>
                    <SelectItem value="07">July</SelectItem>
                    <SelectItem value="08">August</SelectItem>
                    <SelectItem value="09">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year *</Label>
                <Select defaultValue="2025">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
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
              <div className="md:col-span-3 space-y-2">
                <Label>Remarks</Label>
                <Input placeholder="e.g. Bonus month, Increment applied..." />
              </div>
              <div className="md:col-span-2 space-y-2 flex items-end gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Calculator className="w-4 h-4" />
                  Fetch Attendance
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Calculator className="w-4 h-4" />
                  Recalculate All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Payroll Lines */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Salary Details</CardTitle>
                <CardDescription>Detailed salary calculation with allowances and deductions</CardDescription>
              </div>
              <Badge variant={payrollStatus === "draft" ? "secondary" : "default"}>
                {payrollStatus === "draft" ? "Draft" : payrollStatus === "calculated" ? "Calculated" : "Approved"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead className="text-right">Basic</TableHead>
                    <TableHead className="text-right">Allowances</TableHead>
                    <TableHead className="text-right">Gross</TableHead>
                    <TableHead className="text-center">Attend</TableHead>
                    <TableHead className="text-right">OT</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead className="text-right">Net Payable</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => {
                    const gross = calculateGrossSalary(emp);
                    const allowances = emp.houseRent + emp.medical + emp.transport;
                    const otAmount = calculateOvertimeAmount(emp);
                    const deductions = calculateTotalDeductions(emp);
                    const net = calculateNetSalary(emp);

                    return (
                      <TableRow key={emp.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{emp.designation}</p>
                            <p className="text-xs text-muted-foreground">{emp.department}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">{emp.basicSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-mono text-sm text-muted-foreground">
                          {allowances.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold font-mono">{gross.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <div className="text-xs">
                            <p className="text-green-600">{emp.presentDays}P</p>
                            {emp.absentDays > 0 && <p className="text-red-600">{emp.absentDays}A</p>}
                            {emp.overtimeHours > 0 && <p className="text-blue-600">{emp.overtimeHours}h OT</p>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-green-600">
                          {otAmount > 0 ? `+${otAmount.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right font-mono text-red-600">
                          {deductions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-bold font-mono text-primary">
                          {net.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{emp.paymentMode}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={8} className="text-right">Total Net Payable:</TableCell>
                    <TableCell className="text-right font-mono text-lg text-primary">
                      PKR {totalNetPayable.toLocaleString()}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {employees.length} employees • PKR {totalNetPayable.toLocaleString()} total payable
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Save as Draft
                </Button>
                <Button className="gap-2" onClick={() => setPayrollStatus("approved")}>
                  <CheckCircle className="w-4 h-4" />
                  Approve Payroll
                </Button>
                {payrollStatus === "approved" && (
                  <Button className="gap-2">
                    Generate Salary Voucher
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
