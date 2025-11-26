import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, AlertCircle } from "lucide-react";

const pendingPayrolls = [
  {
    id: "PR-2025-01",
    month: "January",
    year: 2025,
    period: "01/01/2025 - 31/01/2025",
    employees: 18,
    totalPayable: 486400,
    preparedBy: "Ahmed Ali (HR Manager)",
    preparedDate: "2025-01-31",
    status: "Pending Approval",
    departments: ["Admin: 5", "Sales: 8", "Warehouse: 5"],
  },
  {
    id: "PR-2024-12",
    month: "December",
    year: 2024,
    period: "01/12/2024 - 31/12/2024",
    employees: 17,
    totalPayable: 445000,
    preparedBy: "Ahmed Ali (HR Manager)",
    preparedDate: "2024-12-31",
    status: "Approved",
    departments: ["Admin: 5", "Sales: 7", "Warehouse: 5"],
  },
];

const payrollDetails = {
  summary: {
    basicSalaries: 360000,
    allowances: 120000,
    overtime: 6400,
    grossTotal: 486400,
    deductions: 86400,
    netPayable: 400000,
  },
  breakdown: {
    admin: { employees: 5, amount: 150000 },
    sales: { employees: 8, amount: 180000 },
    warehouse: { employees: 5, amount: 70000 },
  },
};

export default function PayrollApproval() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll Approval</h1>
            <p className="text-muted-foreground">Review and approve monthly payroll runs</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <AlertCircle className="w-4 h-4 mr-2" />
            1 Pending Approval
          </Badge>
        </div>

        {/* Pending Payrolls */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Batches</CardTitle>
            <CardDescription>All payroll runs requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payroll ID</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-center">Employees</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead className="text-right">Total Payable</TableHead>
                  <TableHead>Prepared By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayrolls.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-mono font-semibold">{payroll.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payroll.month} {payroll.year}</p>
                        <p className="text-xs text-muted-foreground">{payroll.period}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{payroll.employees}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {payroll.departments.map((dept, idx) => (
                          <span key={idx} className="text-xs text-muted-foreground">{dept}</span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-primary">
                      PKR {payroll.totalPayable.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{payroll.preparedBy}</p>
                        <p className="text-xs text-muted-foreground">{payroll.preparedDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={payroll.status === "Pending Approval" ? "outline" : "default"}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {payroll.status === "Pending Approval" ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2">
                              <Eye className="w-4 h-4" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Payroll Review - {payroll.id}</DialogTitle>
                              <DialogDescription>{payroll.period} • {payroll.employees} Employees</DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              {/* Summary Cards */}
                              <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 border rounded-lg">
                                  <p className="text-sm text-muted-foreground">Gross Salary</p>
                                  <p className="text-2xl font-bold">PKR {payrollDetails.summary.grossTotal.toLocaleString()}</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                  <p className="text-sm text-muted-foreground">Deductions</p>
                                  <p className="text-2xl font-bold text-red-600">-PKR {payrollDetails.summary.deductions.toLocaleString()}</p>
                                </div>
                                <div className="p-4 border rounded-lg bg-primary/10">
                                  <p className="text-sm text-muted-foreground">Net Payable</p>
                                  <p className="text-2xl font-bold text-primary">PKR {payrollDetails.summary.netPayable.toLocaleString()}</p>
                                </div>
                              </div>

                              {/* Department Breakdown */}
                              <div>
                                <h4 className="font-semibold mb-3">Department Breakdown</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Department</TableHead>
                                      <TableHead className="text-center">Employees</TableHead>
                                      <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>Admin</TableCell>
                                      <TableCell className="text-center">{payrollDetails.breakdown.admin.employees}</TableCell>
                                      <TableCell className="text-right font-mono">PKR {payrollDetails.breakdown.admin.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Sales</TableCell>
                                      <TableCell className="text-center">{payrollDetails.breakdown.sales.employees}</TableCell>
                                      <TableCell className="text-right font-mono">PKR {payrollDetails.breakdown.sales.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Warehouse</TableCell>
                                      <TableCell className="text-center">{payrollDetails.breakdown.warehouse.employees}</TableCell>
                                      <TableCell className="text-right font-mono">PKR {payrollDetails.breakdown.warehouse.amount.toLocaleString()}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>

                              {/* Remarks Section */}
                              <div className="space-y-2">
                                <Label>Approval Remarks (Optional)</Label>
                                <Textarea placeholder="Enter any remarks or comments..." rows={3} />
                              </div>

                              {/* Action Buttons */}
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" className="gap-2">
                                  Cancel
                                </Button>
                                <Button variant="destructive" className="gap-2">
                                  <XCircle className="w-4 h-4" />
                                  Reject Payroll
                                </Button>
                                <Button className="gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Approve & Post
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button size="sm" variant="ghost" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Approval Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Checklist</CardTitle>
            <CardDescription>Verify these items before approving payroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Attendance Verified</p>
                  <p className="text-sm text-muted-foreground">All attendance records are accurate and approved</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Deductions Confirmed</p>
                  <p className="text-sm text-muted-foreground">All deductions (advance, loan, tax) are correct</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Budget Approval</p>
                  <p className="text-sm text-muted-foreground">Total payroll is within approved budget</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium">Bank Balance Check</p>
                  <p className="text-sm text-muted-foreground">Sufficient funds available for payment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
