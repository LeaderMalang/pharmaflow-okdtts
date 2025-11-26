import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  FileText, 
  Truck, 
  DollarSign, 
  AlertTriangle,
  Users,
  TrendingUp,
  Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Today's Sales", value: "₨ 485,000", change: "+12%", icon: DollarSign, trend: "up" },
    { label: "Pending Orders", value: "23", change: "5 urgent", icon: FileText, trend: "neutral" },
    { label: "Out for Delivery", value: "18", change: "2 delayed", icon: Truck, trend: "neutral" },
    { label: "Credit Sales", value: "₨ 125,000", change: "12 parties", icon: Users, trend: "up" },
  ];

  const quickActions = [
    { label: "New Sale", icon: ShoppingCart, route: "/sales/new-sale", color: "bg-primary" },
    { label: "Draft Orders", icon: FileText, route: "/sales/draft-orders", color: "bg-warning" },
    { label: "Order Approval", icon: TrendingUp, route: "/sales/order-approval", color: "bg-success" },
    { label: "Delivery Challan", icon: Truck, route: "/sales/delivery-challan", color: "bg-accent" },
    { label: "Returns & Refunds", icon: Package, route: "/sales/returns", color: "bg-destructive" },
    { label: "Sales Reports", icon: FileText, route: "/sales/reports", color: "bg-chart-1" },
  ];

  const recentOrders = [
    { id: "SO-2024-001", party: "City Medical Store", amount: "₨ 45,200", status: "Approved", time: "10:30 AM" },
    { id: "SO-2024-002", party: "Health Plus Pharmacy", amount: "₨ 28,500", status: "Pending", time: "11:15 AM" },
    { id: "SO-2024-003", party: "Care Hospital", amount: "₨ 125,000", status: "Out for Delivery", time: "12:00 PM" },
    { id: "SO-2024-004", party: "Wellness Clinic", amount: "₨ 15,800", status: "Draft", time: "1:30 PM" },
  ];

  const alerts = [
    { type: "warning", message: "5 batches expiring within 30 days", action: "View" },
    { type: "error", message: "Credit limit exceeded for 3 parties", action: "Review" },
    { type: "info", message: "2 price override requests pending", action: "Approve" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Management</h1>
            <p className="text-muted-foreground mt-1">Complete sales workflow from order to delivery</p>
          </div>
          <Button onClick={() => navigate("/sales/new-sale")} className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            New Sale Order
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.trend === "up" ? "text-success" : 
                      stat.trend === "down" ? "text-destructive" : 
                      "text-warning"
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10`}>
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <CardTitle>Important Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${
                  alert.type === "error" ? "border-destructive/20 bg-destructive/5" :
                  alert.type === "warning" ? "border-warning/20 bg-warning/5" :
                  "border-primary/20 bg-primary/5"
                }`}>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <Button variant="outline" size="sm">{alert.action}</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(action.route)}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all"
                >
                  <div className={`${action.color} p-3 rounded-lg`}>
                    <action.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-center text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/sales/reports")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-foreground">{order.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Approved" ? "bg-success/10 text-success" :
                        order.status === "Pending" ? "bg-warning/10 text-warning" :
                        order.status === "Draft" ? "bg-muted text-muted-foreground" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{order.party}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{order.amount}</p>
                    <p className="text-sm text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;
