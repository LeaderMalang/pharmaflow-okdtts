import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardWidget } from "@/components/DashboardWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Package, TrendingDown, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InventoryDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor stock levels, batches, and expiry</p>
        </div>

        {/* Global Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
                <Select defaultValue="today">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Warehouse</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Warehouses</SelectItem>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="analgesics">Analgesics</SelectItem>
                    <SelectItem value="antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="supplements">Supplements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="gsk">GSK</SelectItem>
                    <SelectItem value="pfizer">Pfizer</SelectItem>
                    <SelectItem value="abbott">Abbott</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/inventory/stock-ledger')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Stock Value</p>
                  <p className="text-2xl font-bold text-foreground">PKR 45.2M</p>
                  <p className="text-xs text-muted-foreground">4,520 SKUs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/inventory/short-expiry')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-critical/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-critical" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Short Expiry</p>
                  <p className="text-2xl font-bold text-critical">PKR 2.8M</p>
                  <p className="text-xs text-muted-foreground">185 batches &lt; 60 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/inventory/reorder-level')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-important/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-important" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Below Reorder</p>
                  <p className="text-2xl font-bold text-important">342</p>
                  <p className="text-xs text-muted-foreground">Items need restocking</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/inventory/slow-moving')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-operational/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-operational" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slow Moving</p>
                  <p className="text-2xl font-bold text-operational">PKR 1.2M</p>
                  <p className="text-xs text-muted-foreground">89 items &gt; 90 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical & Important Alerts - Quadrant 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Q1 - Urgent & Important */}
          <DashboardWidget
            title="Critical Stockouts (Fast-Moving)"
            urgency="critical"
            icon={Package}
            total="15 Items"
            subtitle="Out of stock for 3+ days"
            items={[
              {
                id: "1",
                label: "Paracetamol 500mg Tab - Main WH",
                value: "0 qty",
                subtext: "Lost sales est: PKR 125K",
                action: () => navigate('/purchasing/purchase-requisition'),
                actionLabel: "Create PR",
              },
              {
                id: "2",
                label: "Amoxicillin 250mg Cap - Branch 1",
                value: "0 qty",
                subtext: "Lost sales est: PKR 89K",
                action: () => navigate('/purchasing/purchase-requisition'),
                actionLabel: "Create PR",
              },
              {
                id: "3",
                label: "Ibuprofen 400mg Tab - Main WH",
                value: "0 qty",
                subtext: "Lost sales est: PKR 67K",
                action: () => navigate('/inventory/stock-transfer-request'),
                actionLabel: "Transfer",
              },
            ]}
          />

          <DashboardWidget
            title="Short Expiry High-Value Stock"
            urgency="critical"
            icon={Calendar}
            total="PKR 2.8M"
            subtitle="Expiring within 60 days"
            items={[
              {
                id: "1",
                label: "Augmentin 625mg Tab - Batch AUG2401",
                value: "PKR 485K",
                subtext: "Expiry: 15-Jan-2025 (22 days)",
                action: () => navigate('/purchasing/purchase-returns'),
                actionLabel: "Return",
              },
              {
                id: "2",
                label: "Insulin Glargine 100U - Batch INS2402",
                value: "PKR 320K",
                subtext: "Expiry: 28-Jan-2025 (35 days)",
                action: () => navigate('/sales/new-sale'),
                actionLabel: "Promo",
              },
              {
                id: "3",
                label: "Cefixime 400mg Cap - Batch CEF2403",
                value: "PKR 215K",
                subtext: "Expiry: 10-Feb-2025 (47 days)",
                action: () => {},
                actionLabel: "View",
              },
            ]}
          />
        </div>

        {/* Q2 - Important but Not Urgent */}
        <DashboardWidget
          title="Below Reorder Level"
          urgency="important"
          icon={AlertTriangle}
          total="342 Items"
          subtitle="Need restocking this week"
          items={[
            {
              id: "1",
              label: "Metformin 500mg Tab - Main WH",
              value: "125 qty",
              subtext: "Min: 500 | Avg Sales: 85/day",
              action: () => navigate('/purchasing/purchase-requisition'),
              actionLabel: "Create PR",
            },
            {
              id: "2",
              label: "Losartan 50mg Tab - Branch 2",
              value: "89 qty",
              subtext: "Min: 300 | Avg Sales: 45/day",
              action: () => navigate('/purchasing/purchase-requisition'),
              actionLabel: "Create PR",
            },
            {
              id: "3",
              label: "Atorvastatin 20mg Tab - Main WH",
              value: "156 qty",
              subtext: "Min: 400 | Avg Sales: 62/day",
              action: () => navigate('/inventory/reorder-level'),
              actionLabel: "View All",
            },
          ]}
        />

        {/* Q3 - Urgent but Not Important (Operational) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardWidget
            title="Pending Stock Transfers"
            urgency="operational"
            icon={ArrowRight}
            total="18 Pending"
            subtitle="Awaiting dispatch/receive"
            items={[
              {
                id: "1",
                label: "Transfer #TR-2025-0045",
                value: "15 items",
                subtext: "Main WH → Branch 1 (2 days pending)",
                action: () => navigate('/inventory/stock-transfer-dispatch'),
                actionLabel: "Dispatch",
              },
              {
                id: "2",
                label: "Transfer #TR-2025-0042",
                value: "8 items",
                subtext: "Branch 2 → Main WH (awaiting receive)",
                action: () => navigate('/inventory/stock-transfer-receive'),
                actionLabel: "Receive",
              },
            ]}
          />

          <DashboardWidget
            title="Stock Adjustments Pending"
            urgency="operational"
            icon={Package}
            total="12 Pending"
            subtitle="Physical count variances"
            items={[
              {
                id: "1",
                label: "Main WH - Physical Count",
                value: "45 items",
                subtext: "Counted: 12-Dec | Pending approval",
                action: () => navigate('/inventory/stock-adjustment'),
                actionLabel: "Review",
              },
              {
                id: "2",
                label: "Branch 1 - Damage Report",
                value: "3 items",
                subtext: "PKR 15,800 | Awaiting write-off",
                action: () => navigate('/inventory/stock-adjustment'),
                actionLabel: "Approve",
              },
            ]}
          />
        </div>

        {/* Q4 - Low Priority / FYI */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-info" />
              Stock Movement Summary (Today)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Stock In (Purchase)</p>
                <p className="text-2xl font-bold text-foreground mt-1">PKR 2.4M</p>
                <p className="text-xs text-muted-foreground mt-1">15 GRNs processed</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Stock Out (Sales)</p>
                <p className="text-2xl font-bold text-foreground mt-1">PKR 1.8M</p>
                <p className="text-xs text-muted-foreground mt-1">342 invoices</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Transfers</p>
                <p className="text-2xl font-bold text-foreground mt-1">PKR 350K</p>
                <p className="text-xs text-muted-foreground mt-1">8 transfers completed</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Adjustments</p>
                <p className="text-2xl font-bold text-foreground mt-1">-PKR 18K</p>
                <p className="text-xs text-muted-foreground mt-1">5 items damaged</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/opening-stock')}>
                <Package className="w-4 h-4" />
                Opening Stock
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/stock-ledger')}>
                <Package className="w-4 h-4" />
                Stock Ledger
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/stock-transfer-request')}>
                <ArrowRight className="w-4 h-4" />
                Stock Transfer
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/stock-adjustment')}>
                <AlertTriangle className="w-4 h-4" />
                Adjustment
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/stock-valuation')}>
                <DollarSign className="w-4 h-4" />
                Stock Valuation
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/batch-stock')}>
                <Calendar className="w-4 h-4" />
                Batch Report
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/short-expiry')}>
                <Calendar className="w-4 h-4" />
                Short Expiry
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/reorder-level')}>
                <AlertTriangle className="w-4 h-4" />
                Reorder Report
              </Button>
              <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/inventory/slow-moving')}>
                <TrendingDown className="w-4 h-4" />
                Slow Moving
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InventoryDashboard;
