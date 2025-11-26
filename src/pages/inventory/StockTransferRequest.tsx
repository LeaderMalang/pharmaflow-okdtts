import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, ArrowRight } from "lucide-react";
import { useState } from "react";

const StockTransferRequest = () => {
  const [lines, setLines] = useState([
    { id: 1, product: "", batch: "", expiry: "", availableQty: 0, requestedQty: "" },
  ]);

  const addLine = () => {
    setLines([...lines, { 
      id: lines.length + 1, 
      product: "", 
      batch: "", 
      expiry: "", 
      availableQty: 0, 
      requestedQty: "" 
    }]);
  };

  const removeLine = (id: number) => {
    setLines(lines.filter(line => line.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stock Transfer Request</h1>
            <p className="text-muted-foreground mt-1">Transfer stock between warehouses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Request
            </Button>
          </div>
        </div>

        {/* Header Form */}
        <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Transfer No.</label>
                <Input placeholder="TR-2025-XXXX" disabled />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Request Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Expected Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  From Warehouse
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">To Warehouse</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Reason for Transfer</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="refill">Branch Refill</SelectItem>
                  <SelectItem value="stockout">Stockout Coverage</SelectItem>
                  <SelectItem value="van">Van Loading</SelectItem>
                  <SelectItem value="balance">Stock Balancing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Remarks</label>
              <Input placeholder="Additional notes..." />
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products to Transfer</CardTitle>
            <Button onClick={addLine} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Product</TableHead>
                    <TableHead className="w-[150px]">Batch No.</TableHead>
                    <TableHead className="w-[120px]">Expiry Date</TableHead>
                    <TableHead className="w-[120px] text-right">Available Qty</TableHead>
                    <TableHead className="w-[120px] text-right">Requested Qty</TableHead>
                    <TableHead className="w-[200px]">Notes</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="para">Paracetamol 500mg Tab</SelectItem>
                            <SelectItem value="amox">Amoxicillin 250mg Cap</SelectItem>
                            <SelectItem value="ibu">Ibuprofen 400mg Tab</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="b1">PAR2401</SelectItem>
                            <SelectItem value="b2">PAR2402</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        2026-06-30
                      </TableCell>
                      <TableCell className="text-right font-medium text-success">
                        4,750
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Optional notes" />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeLine(line.id)}
                          disabled={lines.length === 1}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="mt-6 flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span className="font-medium text-foreground">{lines.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Quantity:</span>
                  <span className="font-medium text-foreground">0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-info/5 border-info/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Stock transfer requires approval before dispatch. Stock will be deducted from source warehouse only after dispatch confirmation, and added to destination after receiving confirmation.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StockTransferRequest;
