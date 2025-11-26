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
import { Plus, Trash2, Save, Send, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BatchSelectionDialog } from "@/components/sales/BatchSelectionDialog";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  productName: string;
  batchNo: string;
  expiry: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  netAmount: number;
}

const NewSale = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const parties = [
    { id: "1", name: "City Medical Store", creditLimit: 500000, balance: 45000 },
    { id: "2", name: "Health Plus Pharmacy", creditLimit: 300000, balance: 0 },
    { id: "3", name: "Care Hospital", creditLimit: 1000000, balance: 125000 },
  ];

  const warehouses = [
    { id: "1", name: "Main Warehouse - Karachi" },
    { id: "2", name: "Branch Warehouse - Lahore" },
    { id: "3", name: "Regional Warehouse - Islamabad" },
  ];

  const products = [
    { id: "1", name: "Panadol 500mg (Strip of 10)" },
    { id: "2", name: "Augmentin 625mg (Pack of 6)" },
    { id: "3", name: "Brufen 400mg (Strip of 20)" },
  ];

  const selectedPartyData = parties.find(p => p.id === selectedParty);

  const handleAddProduct = () => {
    if (!selectedParty) {
      toast({
        title: "Party Required",
        description: "Please select a party first",
        variant: "destructive",
      });
      return;
    }
    if (!selectedWarehouse) {
      toast({
        title: "Warehouse Required",
        description: "Please select a warehouse first",
        variant: "destructive",
      });
      return;
    }
    if (!selectedProduct) {
      toast({
        title: "Product Required",
        description: "Please select a product",
        variant: "destructive",
      });
      return;
    }
    setShowBatchDialog(true);
  };

  const handleBatchSelect = (batch: any, quantity: number) => {
    const productName = products.find(p => p.id === selectedProduct)?.name || "";
    const unitPrice = batch.unitPrice;
    const discount = unitPrice * 0.05; // 5% discount
    const taxableAmount = (unitPrice - discount) * quantity;
    const tax = taxableAmount * 0.17; // 17% GST
    const netAmount = taxableAmount + tax;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      productName,
      batchNo: batch.batchNo,
      expiry: batch.expiry,
      quantity,
      unitPrice,
      discount,
      tax,
      netAmount,
    };

    setOrderItems([...orderItems, newItem]);
    setSelectedProduct("");
    
    toast({
      title: "Product Added",
      description: `${productName} added to order`,
    });
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const totalDiscount = orderItems.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
    const totalTax = orderItems.reduce((sum, item) => sum + item.tax, 0);
    const grandTotal = orderItems.reduce((sum, item) => sum + item.netAmount, 0);
    
    return { subtotal, totalDiscount, totalTax, grandTotal };
  };

  const totals = calculateTotals();

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Order saved as draft successfully",
    });
    navigate("/sales/draft-orders");
  };

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "No Items",
        description: "Please add at least one product",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Order Submitted",
      description: "Order submitted for approval successfully",
    });
    navigate("/sales/order-approval");
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
              <h1 className="text-3xl font-bold text-foreground">New Sale Order</h1>
              <p className="text-muted-foreground mt-1">Create new sales order with batch tracking</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmitOrder} className="gap-2">
              <Send className="w-4 h-4" />
              Submit Order
            </Button>
          </div>
        </div>

        {/* Party & Warehouse Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Party *</Label>
                <Select value={selectedParty} onValueChange={setSelectedParty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose party..." />
                  </SelectTrigger>
                  <SelectContent>
                    {parties.map((party) => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Warehouse *</Label>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose warehouse..." />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((wh) => (
                      <SelectItem key={wh.id} value={wh.id}>
                        {wh.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPartyData && (
              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-bold text-foreground">₨ {selectedPartyData.creditLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-lg font-bold text-warning">₨ {selectedPartyData.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Credit</p>
                    <p className="text-lg font-bold text-success">
                      ₨ {(selectedPartyData.creditLimit - selectedPartyData.balance).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Add Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddProduct} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {orderItems.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch No</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Tax (17%)</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>{item.batchNo}</TableCell>
                      <TableCell>{item.expiry}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₨ {item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>₨ {(item.discount * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>₨ {item.tax.toFixed(2)}</TableCell>
                      <TableCell className="font-bold">₨ {item.netAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        {orderItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>₨ {totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Total Discount:</span>
                  <span>- ₨ {totals.totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Tax (GST 17%):</span>
                  <span>₨ {totals.totalTax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Grand Total:</span>
                  <span className="text-primary">₨ {totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BatchSelectionDialog
        open={showBatchDialog}
        onClose={() => setShowBatchDialog(false)}
        productName={products.find(p => p.id === selectedProduct)?.name || ""}
        onSelect={handleBatchSelect}
      />
    </DashboardLayout>
  );
};

export default NewSale;
