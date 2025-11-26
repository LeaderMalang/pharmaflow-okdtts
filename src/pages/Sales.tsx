import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Filter, Download } from "lucide-react";

const salesData = [
  {
    id: "INV-2024-001",
    customer: "City Medical Store",
    date: "2024-01-15",
    amount: "$2,450.00",
    status: "Paid",
    type: "Credit",
  },
  {
    id: "INV-2024-002",
    customer: "Health Plus Pharmacy",
    date: "2024-01-14",
    amount: "$1,850.00",
    status: "Pending",
    type: "Cash",
  },
  {
    id: "INV-2024-003",
    customer: "Care Hospital",
    date: "2024-01-14",
    amount: "$5,200.00",
    status: "Paid",
    type: "Credit",
  },
  {
    id: "INV-2024-004",
    customer: "Wellness Clinic",
    date: "2024-01-13",
    amount: "$980.00",
    status: "Overdue",
    type: "Credit",
  },
  {
    id: "INV-2024-005",
    customer: "Metro Pharmacy",
    date: "2024-01-13",
    amount: "$3,120.00",
    status: "Paid",
    type: "Cash",
  },
];

const Sales = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Management</h1>
            <p className="text-muted-foreground mt-1">Manage credit and retail sales orders</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Sale
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold text-foreground mt-2">$13,600</p>
              <p className="text-sm text-success mt-1">+8.2% this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground mt-2">$1,850</p>
              <p className="text-sm text-warning mt-1">2 invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold text-foreground mt-2">$980</p>
              <p className="text-sm text-destructive mt-1">1 invoice</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-foreground mt-2">$11,770</p>
              <p className="text-sm text-success mt-1">86% collected</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales Invoices</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search invoices..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted">
                        {sale.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">{sale.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sale.status === "Paid"
                            ? "bg-success/10 text-success"
                            : sale.status === "Pending"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
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

export default Sales;
