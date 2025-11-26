import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardWidget } from "@/components/DashboardWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertCircle,
  PackageX,
  Clock,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Package,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react";

// Mock data for Q1 - Urgent & Important
const overduePayments = [
  { id: "1", label: "City Medical Store", value: "PKR 125,000", subtext: "45 days overdue • Salesman: Ahmed", actionLabel: "Call" },
  { id: "2", label: "Health Plus Pharmacy", value: "PKR 89,500", subtext: "32 days overdue • Salesman: Bilal", actionLabel: "Call" },
  { id: "3", label: "Care Hospital", value: "PKR 256,000", subtext: "60 days overdue • Salesman: Zain", actionLabel: "Call" },
];

const criticalStockouts = [
  { id: "1", label: "Panadol 500mg", value: "3 days", subtext: "Warehouse A • Est. loss: PKR 45,000", actionLabel: "Order" },
  { id: "2", label: "Augmentin 625mg", value: "5 days", subtext: "Warehouse B • Est. loss: PKR 78,000", actionLabel: "Order" },
];

const nearExpiryStock = [
  { id: "1", label: "Brufen 400mg - Batch AB123", value: "PKR 185,000", subtext: "Expires: 15-Feb-25 (22 days)", actionLabel: "Return" },
  { id: "2", label: "Flagyl 400mg - Batch CD456", value: "PKR 96,000", subtext: "Expires: 28-Feb-25 (35 days)", actionLabel: "Promo" },
];

const payrollPending = [
  { id: "1", label: "January 2025 Payroll", value: "PKR 1,250,000", subtext: "45 employees • Created: 25-Jan-25", actionLabel: "Approve" },
];

const bigVouchersUnapproved = [
  { id: "1", label: "Payment Voucher PV-2025-045", value: "PKR 450,000", subtext: "Supplier: ABC Pharma • By: Accounts", actionLabel: "Review" },
  { id: "2", label: "Journal Voucher JV-2025-012", value: "PKR 280,000", subtext: "Salary Provision • By: HR", actionLabel: "Review" },
];

// Mock data for Q2 - Important but Not Urgent
const top10Customers = [
  { id: "1", label: "City Medical Store", value: "PKR 425,000", subtext: "Karachi • Limit: 500K • Avg: 45 days" },
  { id: "2", label: "Care Hospital", value: "PKR 385,000", subtext: "Lahore • Limit: 600K • Avg: 52 days" },
  { id: "3", label: "Health Plus", value: "PKR 295,000", subtext: "Islamabad • Limit: 400K • Avg: 38 days" },
];

const purchasePlan = [
  { id: "1", label: "ABC Pharma", value: "75%", subtext: "Planned: 1000 • Received: 750 • Pending: 250" },
  { id: "2", label: "XYZ Distributors", value: "92%", subtext: "Planned: 800 • Received: 736 • Pending: 64" },
];

const salesVsTarget = [
  { id: "1", label: "Territory North - Ahmed", value: "PKR 2.5M", subtext: "Target: 3M • Achieved: 83%" },
  { id: "2", label: "Territory South - Bilal", value: "PKR 1.8M", subtext: "Target: 2M • Achieved: 90%" },
];

// Mock data for Q3 - Urgent but Not Important
const routineApprovals = [
  { id: "1", label: "Small Vouchers Pending", value: "12", subtext: "Total value: PKR 45,000", actionLabel: "View" },
  { id: "2", label: "Discount Approvals", value: "8", subtext: "Avg discount: 3.5%", actionLabel: "View" },
];

const supportTickets = [
  { id: "1", label: "Product Quality Issue", value: "3 open", subtext: "Assigned to: QC Team", actionLabel: "View" },
];

const pendingGRNs = [
  { id: "1", label: "ABC Pharma", value: "PKR 285,000", subtext: "GRN Date: 15-Jan-25 • 9 days pending" },
  { id: "2", label: "XYZ Distributors", value: "PKR 156,000", subtext: "GRN Date: 18-Jan-25 • 6 days pending" },
];

// Mock data for Q4 - Low Priority
const dailySnapshot = [
  { id: "1", label: "Today's Sales", value: "PKR 485,000", subtext: "23 invoices" },
  { id: "2", label: "Today's Purchases", value: "PKR 325,000", subtext: "8 GRNs" },
  { id: "3", label: "Cash In", value: "PKR 195,000", subtext: "15 receipts" },
];

const absentToday = [
  { id: "1", label: "Absent Employees", value: "3", subtext: "Sales: 1, Warehouse: 2" },
];

const slowMoving = [
  { id: "1", label: "Product XYZ", value: "450 units", subtext: "Last sale: 45 days ago" },
  { id: "2", label: "Product ABC", value: "280 units", subtext: "Last sale: 38 days ago" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
              <p className="text-muted-foreground mt-1">Urgency × Priority Matrix</p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select defaultValue="last7">
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last7">Last 7 Days</SelectItem>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <SelectValue placeholder="Warehouse" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Warehouses</SelectItem>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder="Department" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="accounts">Accounts</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Q1 - Urgent & Important (RED) */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-critical" />
            Q1: Urgent & Important - Must Act Today
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DashboardWidget
              title="Overdue Customer Payments"
              urgency="critical"
              icon={DollarSign}
              total="PKR 4,520,000"
              subtitle="23 invoices overdue > 30 days"
              items={overduePayments}
            />
            <DashboardWidget
              title="Critical Stockouts (Fast-Moving)"
              urgency="critical"
              icon={PackageX}
              total="5 products"
              subtitle="High sales velocity items"
              items={criticalStockouts}
            />
            <DashboardWidget
              title="Near-Expiry High-Value Stock"
              urgency="critical"
              icon={Clock}
              total="PKR 1,850,000"
              subtitle="Expiring within 45 days"
              items={nearExpiryStock}
            />
            <DashboardWidget
              title="Payroll Pending Approval"
              urgency="critical"
              icon={Users}
              total="PKR 1,250,000"
              subtitle="Current month payroll"
              items={payrollPending}
            />
            <DashboardWidget
              title="Big Vouchers Unapproved"
              urgency="critical"
              icon={FileText}
              total="PKR 730,000"
              subtitle="2 vouchers > PKR 200K"
              items={bigVouchersUnapproved}
            />
          </div>
        </div>

        {/* Q2 - Important but Not Urgent (YELLOW) */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-important" />
            Q2: Important but Not Urgent - Strategic Focus
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DashboardWidget
              title="Top 10 Customers by Outstanding"
              urgency="important"
              icon={Users}
              total="PKR 2,850,000"
              subtitle="High-value accounts"
              items={top10Customers}
            />
            <DashboardWidget
              title="Purchase Plan vs Actual"
              urgency="important"
              icon={Package}
              total="85% fulfilled"
              subtitle="This month performance"
              items={purchasePlan}
            />
            <DashboardWidget
              title="Sales vs Target"
              urgency="important"
              icon={TrendingUp}
              total="PKR 4.3M"
              subtitle="Target: PKR 5M (86%)"
              items={salesVsTarget}
            />
          </div>
        </div>

        {/* Q3 - Urgent but Not Important (ORANGE) */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-operational" />
            Q3: Urgent but Not Important - Operational Tasks
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DashboardWidget
              title="Routine Approvals"
              urgency="operational"
              icon={FileText}
              total="20 pending"
              subtitle="Small value items"
              items={routineApprovals}
            />
            <DashboardWidget
              title="Support Tickets"
              urgency="operational"
              icon={AlertCircle}
              total="3 open"
              subtitle="Customer complaints"
              items={supportTickets}
            />
            <DashboardWidget
              title="Pending GRNs for Billing"
              urgency="operational"
              icon={Package}
              total="PKR 441,000"
              subtitle="2 suppliers"
              items={pendingGRNs}
            />
          </div>
        </div>

        {/* Q4 - Low Priority (INFO) */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-muted-foreground" />
            Q4: Low Priority - Good to Know
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DashboardWidget
              title="Daily Snapshot"
              urgency="info"
              icon={DollarSign}
              total="PKR 485,000"
              subtitle="Today's performance"
              items={dailySnapshot}
            />
            <DashboardWidget
              title="Absent Employees Today"
              urgency="info"
              icon={Users}
              total="3 employees"
              subtitle="Attendance summary"
              items={absentToday}
            />
            <DashboardWidget
              title="Top Slow-Moving Items"
              urgency="info"
              icon={PackageX}
              total="730 units"
              subtitle="Last 45+ days"
              items={slowMoving}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
