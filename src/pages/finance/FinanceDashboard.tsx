import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Receipt,
  Wallet,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

export default function FinanceDashboard() {
  const pendingVouchers = [
    { id: "V-2025-001", type: "Payment", party: "ABC Pharma", amount: 150000, date: "2025-01-15" },
    { id: "V-2025-002", type: "Receipt", party: "Dr. Ahmed", amount: 25000, date: "2025-01-15" },
    { id: "V-2025-003", type: "Journal", party: "Salary Provision", amount: 180000, date: "2025-01-14" },
  ];

  const quickActions = [
    { label: "Chart of Accounts", path: "/finance/chart-of-accounts", icon: FileText },
    { label: "Create Voucher", path: "/finance/voucher-entry", icon: Receipt },
    { label: "View Ledgers", path: "/finance/ledger-view", icon: Wallet },
    { label: "Trial Balance", path: "/finance/trial-balance", icon: TrendingUp },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finance & Accounting</h1>
            <p className="text-muted-foreground">Complete accounting system with double-entry bookkeeping</p>
          </div>
          <Link to="/finance/voucher-entry">
            <Button className="gap-2">
              <Receipt className="w-4 h-4" />
              New Voucher
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Assets"
            value="PKR 8,450,000"
            change="+12.5%"
            trend="up"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Liabilities"
            value="PKR 3,200,000"
            change="-5.2%"
            trend="down"
            icon={TrendingDown}
          />
          <StatCard
            title="Revenue (MTD)"
            value="PKR 2,850,000"
            change="+18.3%"
            trend="up"
            icon={DollarSign}
          />
          <StatCard
            title="Expenses (MTD)"
            value="PKR 1,950,000"
            change="+8.7%"
            trend="up"
            icon={DollarSign}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common accounting tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.path} to={action.path}>
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <action.icon className="w-5 h-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Vouchers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Pending Vouchers (Draft)
            </CardTitle>
            <CardDescription>Vouchers awaiting approval and posting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingVouchers.map((voucher) => (
                <div key={voucher.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{voucher.type}</Badge>
                    <div>
                      <p className="font-medium">{voucher.id}</p>
                      <p className="text-sm text-muted-foreground">{voucher.party}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-semibold">PKR {voucher.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{voucher.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
