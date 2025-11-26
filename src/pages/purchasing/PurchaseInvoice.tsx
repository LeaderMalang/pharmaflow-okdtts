import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, FileText, DollarSign, Percent, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const mockInvoices = [
  { id: "INV-2024-P-001", grnNumber: "GRN-2024-001", supplier: "ABC Pharma Ltd", amount: 450000, tax: 76500, netAmount: 526500, status: "Posted", date: "2024-01-22" },
  { id: "INV-2024-P-002", grnNumber: "GRN-2024-002", supplier: "HealthCare Distributors", amount: 620000, tax: 105400, netAmount: 725400, status: "Pending", date: "2024-01-21" },
  { id: "INV-2024-P-003", grnNumber: "GRN-2024-003", supplier: "Global Medicines", amount: 385000, tax: 65450, netAmount: 450450, status: "Posted", date: "2024-01-20" },
];

const PurchaseInvoice = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([
    { 
      product: "Paracetamol 500mg", 
      qty: 5000,
      bonusQty: 500,
      tradePrice: 25,
      discount: 5,
      schemeDiscount: 2,
      taxRate: 17,
    },
    { 
      product: "Amoxicillin 250mg", 
      qty: 3000,
      bonusQty: 300,
      tradePrice: 45,
      discount: 3,
      schemeDiscount: 1,
      taxRate: 17,
    },
  ]);

  const calculateLineTotal = (item: typeof invoiceItems[0]) => {
    const grossAmount = item.qty * item.tradePrice;
    const discountAmount = grossAmount * (item.discount / 100);
    const afterDiscount = grossAmount - discountAmount;
    const schemeAmount = afterDiscount * (item.schemeDiscount / 100);
    const afterScheme = afterDiscount - schemeAmount;
    const taxAmount = afterScheme * (item.taxRate / 100);
    return afterScheme + taxAmount;
  };

  const totalAmount = invoiceItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Purchase Invoices</h1>
            <p className="text-muted-foreground mt-1">Record supplier invoices and update accounts</p>
            <p className="text-xs text-muted-foreground italic mt-1">"O you who believe! When you contract a debt… write it down…" (2:282)</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Purchase Invoice</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
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
                    <Label>Related GRN</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GRN" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grn-001">GRN-2024-001</SelectItem>
                        <SelectItem value="grn-002">GRN-2024-002</SelectItem>
                        <SelectItem value="grn-003">GRN-2024-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Invoice Number</Label>
                    <Input placeholder="Supplier invoice no." />
                  </div>
                  <div className="space-y-2">
                    <Label>Invoice Date</Label>
                    <Input type="date" defaultValue="2024-01-22" />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Invoice Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Bonus</TableHead>
                            <TableHead>Trade Price</TableHead>
                            <TableHead>Discount %</TableHead>
                            <TableHead>Scheme %</TableHead>
                            <TableHead>Tax %</TableHead>
                            <TableHead>Net Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoiceItems.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{item.product}</TableCell>
                              <TableCell>{item.qty.toLocaleString()}</TableCell>
                              <TableCell className="text-success">{item.bonusQty}</TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={item.tradePrice} className="w-24" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={item.discount} className="w-20" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={item.schemeDiscount} className="w-20" />
                              </TableCell>
                              <TableCell>
                                <Input type="number" defaultValue={item.taxRate} className="w-20" />
                              </TableCell>
                              <TableCell className="font-semibold">
                                PKR {calculateLineTotal(item).toLocaleString(undefined, {maximumFractionDigits: 2})}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-sm">Calculation Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gross Amount:</span>
                        <span className="font-medium">PKR {invoiceItems.reduce((sum, item) => sum + (item.qty * item.tradePrice), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-destructive">
                        <span>- Total Discount:</span>
                        <span>PKR {invoiceItems.reduce((sum, item) => sum + ((item.qty * item.tradePrice) * item.discount / 100), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-destructive">
                        <span>- Scheme Discount:</span>
                        <span>PKR {invoiceItems.reduce((sum, item) => {
                          const afterDiscount = (item.qty * item.tradePrice) * (1 - item.discount / 100);
                          return sum + (afterDiscount * item.schemeDiscount / 100);
                        }, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-success">
                        <span>+ Sales Tax:</span>
                        <span>PKR {invoiceItems.reduce((sum, item) => {
                          const afterDiscount = (item.qty * item.tradePrice) * (1 - item.discount / 100) * (1 - item.schemeDiscount / 100);
                          return sum + (afterDiscount * item.taxRate / 100);
                        }, 0).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-base">
                        <span>Net Amount:</span>
                        <span>PKR {totalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Accounting Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purchase Account (Dr):</span>
                        <span className="font-medium">PKR {totalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supplier Ledger (Cr):</span>
                        <span className="font-medium">PKR {totalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax Account:</span>
                        <span className="font-medium">PKR {invoiceItems.reduce((sum, item) => {
                          const afterDiscount = (item.qty * item.tradePrice) * (1 - item.discount / 100) * (1 - item.schemeDiscount / 100);
                          return sum + (afterDiscount * item.taxRate / 100);
                        }, 0).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Post Invoice
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="posted">Posted</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Purchase Invoices</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search invoices..." className="pl-10 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice Number</TableHead>
                      <TableHead>GRN Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Base Amount</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell className="text-primary hover:underline cursor-pointer">{invoice.grnNumber}</TableCell>
                        <TableCell>{invoice.supplier}</TableCell>
                        <TableCell>PKR {invoice.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">PKR {invoice.tax.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">PKR {invoice.netAmount.toLocaleString()}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "Posted" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {invoice.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm" className="text-primary">
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {["pending", "posted"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center capitalize">{tab} invoices will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseInvoice;
