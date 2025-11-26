import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const mockPRs = [
  { id: "PR-2024-015", requestedBy: "Warehouse A", branch: "Main Branch", items: 5, priority: "High", reason: "Refill", status: "Submitted", date: "2024-01-22" },
  { id: "PR-2024-016", requestedBy: "Warehouse B", branch: "Branch 1", items: 8, priority: "Normal", reason: "New Product", status: "Draft", date: "2024-01-22" },
  { id: "PR-2024-017", requestedBy: "Branch Office", branch: "Branch 2", items: 3, priority: "Low", reason: "Tender", status: "Approved", date: "2024-01-21" },
  { id: "PR-2024-018", requestedBy: "Warehouse C", branch: "Main Branch", items: 12, priority: "High", reason: "Refill", status: "Rejected", date: "2024-01-20" },
];

const PurchaseRequisition = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [prItems, setPrItems] = useState([
    { product: "Paracetamol 500mg", requiredQty: 5000, currentStock: 2000, minLevel: 3000, priority: "High" },
  ]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchase Requisitions</h1>
            <p className="text-muted-foreground mt-1">Request products from suppliers</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Requisition
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Requisition</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Warehouse / Branch</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wh-a">Warehouse A</SelectItem>
                        <SelectItem value="wh-b">Warehouse B</SelectItem>
                        <SelectItem value="branch-1">Branch Office 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Requested By</Label>
                    <Input placeholder="Your name" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Items</h3>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Required Qty</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Level</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prItems.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Input defaultValue={item.product} />
                          </TableCell>
                          <TableCell>
                            <Input type="number" defaultValue={item.requiredQty} className="w-24" />
                          </TableCell>
                          <TableCell className="text-muted-foreground">{item.currentStock}</TableCell>
                          <TableCell className="text-muted-foreground">{item.minLevel}</TableCell>
                          <TableCell>
                            <Select defaultValue={item.priority}>
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="refill">Refill</SelectItem>
                                <SelectItem value="new">New Product</SelectItem>
                                <SelectItem value="tender">Tender</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
            <TabsTrigger value="all">All Requisitions</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Purchase Requisitions</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search PRs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PR Number</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Branch/Warehouse</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPRs.map((pr) => (
                      <TableRow key={pr.id}>
                        <TableCell className="font-medium">{pr.id}</TableCell>
                        <TableCell>{pr.requestedBy}</TableCell>
                        <TableCell>{pr.branch}</TableCell>
                        <TableCell>{pr.items}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            pr.priority === "High" ? "bg-destructive/10 text-destructive" :
                            pr.priority === "Normal" ? "bg-warning/10 text-warning" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {pr.priority}
                          </span>
                        </TableCell>
                        <TableCell>{pr.reason}</TableCell>
                        <TableCell>{pr.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            pr.status === "Approved" ? "bg-success/10 text-success" :
                            pr.status === "Submitted" ? "bg-primary/10 text-primary" :
                            pr.status === "Rejected" ? "bg-destructive/10 text-destructive" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {pr.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            {pr.status === "Draft" && (
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
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

          <TabsContent value="draft">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">Draft requisitions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submitted">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">Submitted requisitions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">Approved requisitions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseRequisition;
