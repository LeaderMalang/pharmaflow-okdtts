import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, RotateCcw, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const mockReturns = [
  { id: "PR-2024-001", invoice: "INV-2024-P-001", supplier: "ABC Pharma Ltd", items: 2, amount: 45000, reason: "Short Expiry", status: "Processed", date: "2024-01-22" },
  { id: "PR-2024-002", invoice: "INV-2024-P-002", supplier: "HealthCare Distributors", items: 1, amount: 12500, reason: "Damaged", status: "Pending", date: "2024-01-21" },
  { id: "PR-2024-003", invoice: "INV-2024-P-003", supplier: "Global Medicines", items: 3, amount: 28000, reason: "Wrong Item", status: "Processed", date: "2024-01-20" },
];

const PurchaseReturns = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [returnItems, setReturnItems] = useState([
    { 
      product: "Paracetamol 500mg", 
      batchNo: "BATCH-2024-025",
      receivedQty: 5000,
      returnQty: 500,
      rate: 25,
      reason: "Short Expiry",
      expiry: "2024-06-30"
    },
  ]);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchase Returns</h1>
            <p className="text-muted-foreground mt-1">Manage returns to suppliers</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Return
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Return</DialogTitle>
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
                    <Label>Original Invoice / GRN</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inv-001">INV-2024-P-001</SelectItem>
                        <SelectItem value="inv-002">INV-2024-P-002</SelectItem>
                        <SelectItem value="grn-001">GRN-2024-001</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Input type="date" defaultValue="2024-01-22" />
                  </div>
                </div>

                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-base">Return Reasons</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {["Short Expiry", "Damaged", "Wrong Item", "Rate Difference"].map((reason) => (
                        <Button key={reason} variant="outline" size="sm" className="justify-start">
                          {reason}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Return Items</CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Batch No</TableHead>
                          <TableHead>Received Qty</TableHead>
                          <TableHead>Return Qty</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Expiry</TableHead>
                          <TableHead>Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {returnItems.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell>{item.batchNo}</TableCell>
                            <TableCell className="text-muted-foreground">{item.receivedQty.toLocaleString()}</TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                defaultValue={item.returnQty} 
                                max={item.receivedQty}
                                className="w-24" 
                              />
                            </TableCell>
                            <TableCell className="text-muted-foreground">PKR {item.rate}</TableCell>
                            <TableCell className="font-semibold">
                              PKR {(item.returnQty * item.rate).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-destructive text-sm">{item.expiry}</TableCell>
                            <TableCell>
                              <Select defaultValue={item.reason}>
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Short Expiry">Short Expiry</SelectItem>
                                  <SelectItem value="Damaged">Damaged</SelectItem>
                                  <SelectItem value="Wrong Item">Wrong Item</SelectItem>
                                  <SelectItem value="Rate Difference">Rate Difference</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea placeholder="Enter any additional details about this return..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Items:</span>
                          <span className="font-medium">{returnItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Quantity:</span>
                          <span className="font-medium">{returnItems.reduce((sum, item) => sum + item.returnQty, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2 border-t">
                          <span>Return Amount:</span>
                          <span className="text-destructive">PKR {returnItems.reduce((sum, item) => sum + (item.returnQty * item.rate), 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <p className="font-medium mb-2">Accounting Impact:</p>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stock Reduction:</span>
                          <span className="font-medium">-{returnItems.reduce((sum, item) => sum + item.returnQty, 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Supplier Credit:</span>
                          <span className="font-medium">PKR {returnItems.reduce((sum, item) => sum + (item.returnQty * item.rate), 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="destructive">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Process Return
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Returns</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Purchase Returns</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search returns..." className="pl-10 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Invoice/GRN</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReturns.map((ret) => (
                      <TableRow key={ret.id}>
                        <TableCell className="font-medium">{ret.id}</TableCell>
                        <TableCell className="text-primary hover:underline cursor-pointer">{ret.invoice}</TableCell>
                        <TableCell>{ret.supplier}</TableCell>
                        <TableCell>{ret.items}</TableCell>
                        <TableCell className="text-destructive font-semibold">PKR {ret.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-destructive/10 text-destructive">
                            {ret.reason}
                          </span>
                        </TableCell>
                        <TableCell>{ret.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ret.status === "Processed" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {ret.status}
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
          </TabsContent>

          {["pending", "processed"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center capitalize">{tab} returns will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseReturns;
