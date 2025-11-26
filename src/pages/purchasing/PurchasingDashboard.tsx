import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingDown, Clock, AlertCircle, Plus, FileText, PackageCheck, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const recentPOs = [
  { id: "PO-2024-001", supplier: "ABC Pharma Ltd", items: 12, amount: "PKR 450,000", status: "Approved", date: "2024-01-20" },
  { id: "PO-2024-002", supplier: "MediSupply Co", items: 8, amount: "PKR 280,000", status: "Pending", date: "2024-01-21" },
  { id: "PO-2024-003", supplier: "HealthCare Distributors", items: 15, amount: "PKR 620,000", status: "In Transit", date: "2024-01-19" },
  { id: "PO-2024-004", supplier: "Global Medicines", items: 10, amount: "PKR 385,000", status: "Received", date: "2024-01-18" },
];

const pendingApprovals = [
  { id: "PR-2024-015", requestedBy: "Warehouse A", items: 5, priority: "High", date: "2024-01-22" },
  { id: "PR-2024-016", requestedBy: "Warehouse B", items: 8, priority: "Normal", date: "2024-01-22" },
  { id: "PR-2024-017", requestedBy: "Branch Office", items: 3, priority: "Low", date: "2024-01-21" },
];

const PurchasingDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchasing Module</h1>
            <p className="text-muted-foreground mt-1">B2B Medicine Supply Chain Management</p>
            <p className="text-xs text-muted-foreground italic mt-1">"…and do not waste, indeed the wasteful are brothers of the devils." (17:26–27)</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Requisition
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Active POs"
            value="24"
            change="+6 this week"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Total Purchases (MTD)"
            value="PKR 8.5M"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Avg Payment Days"
            value="45 days"
            change="-3 days"
            icon={Clock}
            trend="down"
          />
          <StatCard
            title="Pending Approvals"
            value="8"
            change="3 urgent"
            icon={AlertCircle}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/purchasing/requisition">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Purchase Requisition
                </Button>
              </Link>
              <Link to="/purchasing/purchase-order">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Create Purchase Order
                </Button>
              </Link>
              <Link to="/purchasing/goods-receiving">
                <Button variant="outline" className="w-full justify-start">
                  <PackageCheck className="mr-2 h-4 w-4" />
                  Goods Receiving (GRN)
                </Button>
              </Link>
              <Link to="/purchasing/invoice">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Purchase Invoice Entry
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pending Approvals</CardTitle>
                <Link to="/purchasing/pr-approval">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((pr) => (
                  <div key={pr.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{pr.id}</p>
                      <p className="text-xs text-muted-foreground">{pr.requestedBy} • {pr.items} items</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pr.priority === "High" ? "bg-destructive/10 text-destructive" :
                        pr.priority === "Normal" ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {pr.priority}
                      </span>
                      <Button size="sm" variant="ghost">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Purchase Orders</CardTitle>
              <Link to="/purchasing/purchase-order">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPOs.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.id}</TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{po.items}</TableCell>
                    <TableCell className="font-semibold">{po.amount}</TableCell>
                    <TableCell>{po.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        po.status === "Approved" ? "bg-success/10 text-success" :
                        po.status === "Pending" ? "bg-warning/10 text-warning" :
                        po.status === "In Transit" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {po.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
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

export default PurchasingDashboard;
