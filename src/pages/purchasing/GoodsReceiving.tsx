import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, PackageCheck, AlertCircle, CheckCircle, XCircle, Search, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const mockGRNs = [
  { id: "GRN-2024-001", poNumber: "PO-2024-001", supplier: "ABC Pharma Ltd", items: 12, receivedItems: 12, status: "Under QC", date: "2024-01-22" },
  { id: "GRN-2024-002", poNumber: "PO-2024-003", supplier: "HealthCare Distributors", items: 15, receivedItems: 14, status: "Accepted", date: "2024-01-21" },
  { id: "GRN-2024-003", poNumber: "PO-2024-004", supplier: "Global Medicines", items: 10, receivedItems: 10, status: "Invoiced", date: "2024-01-20" },
];

const GoodsReceiving = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState(false);
  const [grnItems, setGrnItems] = useState([
    { 
      product: "Paracetamol 500mg", 
      orderedQty: 5000, 
      receivedQty: 5000, 
      bonusQty: 500,
      batchNo: "BATCH-2024-025", 
      expiry: "2025-12-31", 
      packSize: "10x10",
      status: "Accepted" 
    },
    { 
      product: "Amoxicillin 250mg", 
      orderedQty: 3000, 
      receivedQty: 2800, 
      bonusQty: 300,
      batchNo: "BATCH-2024-026", 
      expiry: "2024-08-15", 
      packSize: "10x10",
      status: "Under QC" 
    },
  ]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Goods Receiving (GRN)</h1>
            <p className="text-muted-foreground mt-1">Record received stock and perform quality checks</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New GRN
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Goods Receiving Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Select Purchase Order</Label>
                    <Select onValueChange={(value) => setSelectedPO(!!value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="po-001">PO-2024-001 - ABC Pharma Ltd</SelectItem>
                        <SelectItem value="po-002">PO-2024-002 - MediSupply Co</SelectItem>
                        <SelectItem value="direct">Direct Purchase (No PO)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>GRN Date</Label>
                    <Input type="date" defaultValue="2024-01-22" />
                  </div>
                  <div className="space-y-2">
                    <Label>Received By</Label>
                    <Input placeholder="Your name" />
                  </div>
                </div>

                {selectedPO && (
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-base">Purchase Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Supplier</p>
                          <p className="font-medium">ABC Pharma Ltd</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">PO Date</p>
                          <p className="font-medium">2024-01-20</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Items</p>
                          <p className="font-medium">12</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">PKR 450,000</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Receiving Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Ordered</TableHead>
                          <TableHead>Received</TableHead>
                          <TableHead>Bonus</TableHead>
                          <TableHead>Batch No</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead>Pack Size</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {grnItems.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell className="text-muted-foreground">{item.orderedQty.toLocaleString()}</TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                defaultValue={item.receivedQty} 
                                className={`w-24 ${item.receivedQty !== item.orderedQty ? 'border-warning' : ''}`}
                              />
                            </TableCell>
                            <TableCell>
                              <Input type="number" defaultValue={item.bonusQty} className="w-20" />
                            </TableCell>
                            <TableCell>
                              <Input defaultValue={item.batchNo} className="w-36" />
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="date" 
                                defaultValue={item.expiry} 
                                className="w-40"
                              />
                            </TableCell>
                            <TableCell>
                              <Input defaultValue={item.packSize} className="w-24" />
                            </TableCell>
                            <TableCell>
                              <Select defaultValue={item.status}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Accepted">Accepted</SelectItem>
                                  <SelectItem value="Under QC">Under QC</SelectItem>
                                  <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Quality Check Required</p>
                    <p className="text-xs text-muted-foreground">All items will undergo QC verification before final acceptance</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit for QC
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All GRNs</TabsTrigger>
            <TabsTrigger value="qc">Under QC</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="invoiced">Invoiced</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Goods Receiving Notes</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search GRNs..." className="pl-10 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>GRN Number</TableHead>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Total Items</TableHead>
                      <TableHead>Received Items</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGRNs.map((grn) => (
                      <TableRow key={grn.id}>
                        <TableCell className="font-medium">{grn.id}</TableCell>
                        <TableCell className="text-primary hover:underline cursor-pointer">{grn.poNumber}</TableCell>
                        <TableCell>{grn.supplier}</TableCell>
                        <TableCell>{grn.items}</TableCell>
                        <TableCell>
                          <span className={grn.receivedItems < grn.items ? "text-warning font-medium" : ""}>
                            {grn.receivedItems}
                          </span>
                        </TableCell>
                        <TableCell>{grn.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                            grn.status === "Accepted" ? "bg-success/10 text-success" :
                            grn.status === "Under QC" ? "bg-warning/10 text-warning" :
                            grn.status === "Invoiced" ? "bg-primary/10 text-primary" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {grn.status === "Under QC" && <Clock className="h-3 w-3" />}
                            {grn.status === "Accepted" && <CheckCircle className="h-3 w-3" />}
                            {grn.status === "Invoiced" && <PackageCheck className="h-3 w-3" />}
                            {grn.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            {grn.status === "Under QC" && (
                              <Button variant="ghost" size="sm" className="text-primary">
                                QC Review
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

          {["qc", "accepted", "invoiced"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center capitalize">{tab === "qc" ? "Items under QC" : tab + " items"} will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GoodsReceiving;
