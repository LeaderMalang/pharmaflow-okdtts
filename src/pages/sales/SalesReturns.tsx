import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, RotateCcw, Search, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SalesReturns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const invoices = [
    { id: "INV-2024-001", party: "City Medical Store", date: "2024-01-15", amount: "₨ 45,200" },
    { id: "INV-2024-002", party: "Health Plus Pharmacy", date: "2024-01-14", amount: "₨ 28,500" },
    { id: "INV-2024-003", party: "Care Hospital", date: "2024-01-14", amount: "₨ 125,000" },
  ];

  const returnReasons = [
    "Expiry Date Issue",
    "Product Damage",
    "Customer Rejection",
    "Wrong Product Delivered",
    "Quality Issue",
    "Other",
  ];

  const invoiceItems = [
    { id: "1", product: "Panadol 500mg", batch: "BT-2024-001", qty: 50, unitPrice: 125, selected: false },
    { id: "2", product: "Augmentin 625mg", batch: "BT-2024-002", qty: 30, unitPrice: 450, selected: false },
    { id: "3", product: "Brufen 400mg", batch: "BT-2023-089", qty: 20, unitPrice: 85, selected: false },
  ];

  const recentReturns = [
    {
      id: "RET-2024-001",
      invoice: "INV-2024-001",
      party: "City Medical Store",
      items: 2,
      amount: "₨ 8,500",
      reason: "Expiry Date Issue",
      status: "Processed",
      date: "2024-01-15",
    },
    {
      id: "RET-2024-002",
      invoice: "INV-2024-005",
      party: "Wellness Clinic",
      items: 1,
      amount: "₨ 2,250",
      reason: "Product Damage",
      status: "Pending",
      date: "2024-01-14",
    },
  ];

  const [returnItems, setReturnItems] = useState(invoiceItems);
  const [returnQuantities, setReturnQuantities] = useState<{[key: string]: number}>({});

  const handleSelectItem = (id: string) => {
    setReturnItems(returnItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleProcessReturn = () => {
    if (!selectedInvoice) {
      toast({
        title: "Invoice Required",
        description: "Please select an invoice",
        variant: "destructive",
      });
      return;
    }

    if (!selectedReason) {
      toast({
        title: "Reason Required",
        description: "Please select a return reason",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = returnItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item to return",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Return Processed",
      description: "Sales return has been processed successfully",
    });
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
              <h1 className="text-3xl font-bold text-foreground">Returns & Refunds</h1>
              <p className="text-muted-foreground mt-1">Process sales returns and customer refunds</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Pending Returns</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {recentReturns.filter(r => r.status === "Pending").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Today's Returns</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {recentReturns.filter(r => r.date === "2024-01-15").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-foreground mt-2">₨ 10,750</p>
            </CardContent>
          </Card>
        </div>

        {/* New Return Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Process New Return
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Invoice Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Invoice *</Label>
                <Select value={selectedInvoice} onValueChange={setSelectedInvoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose invoice..." />
                  </SelectTrigger>
                  <SelectContent>
                    {invoices.map((invoice) => (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        {invoice.id} - {invoice.party} ({invoice.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Return Reason *</Label>
                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {returnReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Items to Return */}
            {selectedInvoice && (
              <div className="space-y-4">
                <Label>Select Items to Return</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Batch No</TableHead>
                      <TableHead>Sold Qty</TableHead>
                      <TableHead>Return Qty</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            max={item.qty}
                            disabled={!item.selected}
                            value={returnQuantities[item.id] || ""}
                            onChange={(e) => setReturnQuantities({
                              ...returnQuantities,
                              [item.id]: parseInt(e.target.value) || 0
                            })}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>₨ {item.unitPrice}</TableCell>
                        <TableCell className="font-semibold">
                          ₨ {((returnQuantities[item.id] || 0) * item.unitPrice).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea 
                placeholder="Enter any additional information about this return..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleProcessReturn} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Process Return
              </Button>
              <Button variant="outline" onClick={() => navigate("/sales")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Returns */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Returns</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search returns..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReturns.map((ret) => (
                  <TableRow key={ret.id}>
                    <TableCell className="font-medium">{ret.id}</TableCell>
                    <TableCell>{ret.invoice}</TableCell>
                    <TableCell>{ret.party}</TableCell>
                    <TableCell>{ret.items} items</TableCell>
                    <TableCell className="font-semibold">{ret.amount}</TableCell>
                    <TableCell>{ret.reason}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ret.status === "Processed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {ret.status}
                      </span>
                    </TableCell>
                    <TableCell>{ret.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalesReturns;
