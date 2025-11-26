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
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const OrderApproval = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const pendingOrders = [
    { 
      id: "SO-2024-001", 
      party: "City Medical Store", 
      warehouse: "Main Warehouse",
      items: 5, 
      amount: 45200,
      creditLimit: 500000,
      currentBalance: 45000,
      stockStatus: "available",
      priceOverride: false,
      submittedBy: "Ali Ahmed",
      date: "2024-01-15",
      time: "10:30 AM",
      priority: "normal"
    },
    { 
      id: "SO-2024-002", 
      party: "Health Plus Pharmacy", 
      warehouse: "Branch Warehouse",
      items: 8, 
      amount: 125000,
      creditLimit: 300000,
      currentBalance: 250000,
      stockStatus: "partial",
      priceOverride: true,
      submittedBy: "Sara Khan",
      date: "2024-01-15",
      time: "11:15 AM",
      priority: "high"
    },
    { 
      id: "SO-2024-003", 
      party: "Care Hospital", 
      warehouse: "Main Warehouse",
      items: 12, 
      amount: 285000,
      creditLimit: 1000000,
      currentBalance: 125000,
      stockStatus: "available",
      priceOverride: false,
      submittedBy: "Usman Malik",
      date: "2024-01-15",
      time: "12:45 PM",
      priority: "urgent"
    },
  ];

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setShowDialog(true);
  };

  const handleApprove = (orderId: string) => {
    toast({
      title: "Order Approved",
      description: `Order ${orderId} has been approved and stock reserved`,
    });
    setShowDialog(false);
  };

  const handleReject = (orderId: string) => {
    toast({
      title: "Order Rejected",
      description: `Order ${orderId} has been rejected`,
      variant: "destructive",
    });
    setShowDialog(false);
  };

  const getCreditStatus = (order: any) => {
    const available = order.creditLimit - order.currentBalance;
    if (order.amount > available) return { status: "exceeded", color: "destructive" };
    if (order.amount > available * 0.8) return { status: "near limit", color: "warning" };
    return { status: "ok", color: "success" };
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/sales")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order Approval</h1>
              <p className="text-muted-foreground mt-1">Review and approve pending sales orders</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold text-foreground mt-2">{pendingOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Urgent</p>
              <p className="text-2xl font-bold text-destructive mt-2">
                {pendingOrders.filter(o => o.priority === "urgent").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                ₨ {pendingOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Issues</p>
              <p className="text-2xl font-bold text-warning mt-2">
                {pendingOrders.filter(o => o.priceOverride || o.stockStatus !== "available").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders Awaiting Approval</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Credit Status</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOrders.map((order) => {
                  const creditStatus = getCreditStatus(order);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.party}</TableCell>
                      <TableCell className="font-semibold">₨ {order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={creditStatus.color === "success" ? "default" : "destructive"}>
                          {creditStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.stockStatus === "available" ? "default" : "secondary"}>
                          {order.stockStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.priceOverride && (
                          <Badge variant="outline" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Price Override
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            order.priority === "urgent" ? "destructive" :
                            order.priority === "high" ? "default" : "secondary"
                          }
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{order.submittedBy}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(order)}
                            className="gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Party Name</p>
                  <p className="font-semibold text-foreground">{selectedOrder.party}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Warehouse</p>
                  <p className="font-semibold text-foreground">{selectedOrder.warehouse}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="font-bold text-foreground">₨ {selectedOrder.creditLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="font-bold text-warning">₨ {selectedOrder.currentBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Amount</p>
                    <p className="font-bold text-primary">₨ {selectedOrder.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">Approval Checklist</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Stock availability verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCreditStatus(selectedOrder).status === "ok" ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="text-sm">Credit limit check</span>
                  </div>
                  {selectedOrder.priceOverride && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm">Price override requires approval</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleReject(selectedOrder?.id)}
              className="gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
            <Button
              onClick={() => handleApprove(selectedOrder?.id)}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default OrderApproval;
