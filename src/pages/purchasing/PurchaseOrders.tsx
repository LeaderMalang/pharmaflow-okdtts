import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, Mail, MessageSquare, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const mockPOs = [
  { id: "PO-2024-001", supplier: "ABC Pharma Ltd", warehouse: "Main Warehouse", items: 12, amount: 450000, status: "Approved", date: "2024-01-20", expectedDelivery: "2024-01-30" },
  { id: "PO-2024-002", supplier: "MediSupply Co", warehouse: "Branch 1", items: 8, amount: 280000, status: "Pending", date: "2024-01-21", expectedDelivery: "2024-02-01" },
  { id: "PO-2024-003", supplier: "HealthCare Distributors", warehouse: "Main Warehouse", items: 15, amount: 620000, status: "In Transit", date: "2024-01-19", expectedDelivery: "2024-01-28" },
  { id: "PO-2024-004", supplier: "Global Medicines", warehouse: "Warehouse B", items: 10, amount: 385000, status: "Received", date: "2024-01-18", expectedDelivery: "2024-01-27" },
];

const PurchaseOrders = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [poItems, setPoItems] = useState([
    { product: "Paracetamol 500mg", orderedQty: 5000, rate: 25, bonusQty: 500, expectedDate: "2024-02-05" },
  ]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
            <p className="text-muted-foreground mt-1">Create and manage purchase orders</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">ABC Pharma Ltd</SelectItem>
                        <SelectItem value="medi">MediSupply Co</SelectItem>
                        <SelectItem value="health">HealthCare Distributors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Warehouse</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="wh-b">Warehouse B</SelectItem>
                        <SelectItem value="branch-1">Branch 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>PO Date</Label>
                    <Input type="date" defaultValue="2024-01-22" />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Order Items</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">From PR</Button>
                        <Button size="sm" variant="outline">Auto-Suggest</Button>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Ordered Qty</TableHead>
                          <TableHead>Rate (PKR)</TableHead>
                          <TableHead>Bonus Qty</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Expected Delivery</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {poItems.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <Input defaultValue={item.product} className="w-48" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" defaultValue={item.orderedQty} className="w-24" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" defaultValue={item.rate} className="w-24" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" defaultValue={item.bonusQty} className="w-24" />
                            </TableCell>
                            <TableCell className="font-semibold">
                              PKR {(item.orderedQty * item.rate).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Input type="date" defaultValue={item.expectedDate} className="w-40" />
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Items</p>
                      <p className="text-xl font-bold">{poItems.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Qty</p>
                      <p className="text-xl font-bold">{poItems.reduce((sum, i) => sum + i.orderedQty, 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bonus Qty</p>
                      <p className="text-xl font-bold text-success">{poItems.reduce((sum, i) => sum + i.bonusQty, 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold">PKR {poItems.reduce((sum, i) => sum + (i.orderedQty * i.rate), 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Submit for Approval</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="transit">In Transit</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Purchase Orders</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search POs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>PO Date</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPOs.map((po) => (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium">{po.id}</TableCell>
                        <TableCell>{po.supplier}</TableCell>
                        <TableCell>{po.warehouse}</TableCell>
                        <TableCell>{po.items}</TableCell>
                        <TableCell className="font-semibold">PKR {po.amount.toLocaleString()}</TableCell>
                        <TableCell>{po.date}</TableCell>
                        <TableCell>{po.expectedDelivery}</TableCell>
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
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            {po.status === "Approved" && (
                              <>
                                <Button variant="ghost" size="icon">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {["pending", "approved", "transit", "received"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center capitalize">{tab} orders will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseOrders;
