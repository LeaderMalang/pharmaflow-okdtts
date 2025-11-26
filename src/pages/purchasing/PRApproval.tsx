import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const pendingPRs = [
  {
    id: "PR-2024-015",
    requestedBy: "Warehouse A",
    branch: "Main Branch",
    date: "2024-01-22",
    priority: "High",
    items: [
      { product: "Paracetamol 500mg", requiredQty: 5000, currentStock: 2000, minLevel: 3000, lastMonthSales: 4500, pendingPO: 0 },
      { product: "Amoxicillin 250mg", requiredQty: 3000, currentStock: 800, minLevel: 1500, lastMonthSales: 3200, pendingPO: 0 },
      { product: "Ibuprofen 400mg", requiredQty: 4000, currentStock: 1200, minLevel: 2000, lastMonthSales: 3800, pendingPO: 1000 },
    ]
  },
  {
    id: "PR-2024-016",
    requestedBy: "Warehouse B",
    branch: "Branch 1",
    date: "2024-01-22",
    priority: "Normal",
    items: [
      { product: "Cetirizine 10mg", requiredQty: 2500, currentStock: 1500, minLevel: 1000, lastMonthSales: 2200, pendingPO: 0 },
      { product: "Omeprazole 20mg", requiredQty: 3500, currentStock: 900, minLevel: 1800, lastMonthSales: 3000, pendingPO: 0 },
    ]
  },
];

const PRApproval = () => {
  const [selectedPR, setSelectedPR] = useState<typeof pendingPRs[0] | null>(null);
  const [remarks, setRemarks] = useState("");

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">PR Approval</h1>
            <p className="text-muted-foreground mt-1">Review and approve purchase requisitions</p>
            <p className="text-xs text-muted-foreground italic mt-1">"Give full measure and weight with justice…" (6:152)</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals ({pendingPRs.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pendingPRs.map((pr) => (
              <Card key={pr.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{pr.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pr.requestedBy} • {pr.branch} • {pr.date}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pr.priority === "High" ? "bg-destructive/10 text-destructive" :
                      pr.priority === "Normal" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {pr.priority} Priority
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Level</TableHead>
                        <TableHead>Last Month Sales</TableHead>
                        <TableHead>Pending PO</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pr.items.map((item, idx) => {
                        const isLowStock = item.currentStock < item.minLevel;
                        const hasHighDemand = item.lastMonthSales > item.requiredQty;
                        
                        return (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell className="font-semibold">{item.requiredQty.toLocaleString()}</TableCell>
                            <TableCell className={isLowStock ? "text-destructive font-medium" : ""}>
                              {item.currentStock.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{item.minLevel.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {item.lastMonthSales.toLocaleString()}
                                {hasHighDemand ? (
                                  <TrendingUp className="h-4 w-4 text-success" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {item.pendingPO > 0 ? item.pendingPO.toLocaleString() : "-"}
                            </TableCell>
                            <TableCell>
                              {isLowStock && (
                                <span className="flex items-center gap-1 text-xs text-destructive">
                                  <AlertTriangle className="h-3 w-3" />
                                  Low Stock
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedPR(pr)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject PR - {pr.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Rejection Remarks</Label>
                            <Textarea 
                              placeholder="Enter reason for rejection..." 
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Confirm Rejection</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline">Approve Partial</Button>
                    
                    <Button>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve Full
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PRApproval;
