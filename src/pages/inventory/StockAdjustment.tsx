import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, AlertTriangle } from "lucide-react";
import { useState } from "react";

const StockAdjustment = () => {
  const [lines, setLines] = useState([
    { id: 1, product: "", batch: "", expiry: "", systemQty: 0, physicalQty: "", difference: 0, reason: "" },
  ]);

  const addLine = () => {
    setLines([...lines, { 
      id: lines.length + 1, 
      product: "", 
      batch: "", 
      expiry: "", 
      systemQty: 0, 
      physicalQty: "", 
      difference: 0, 
      reason: "" 
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
            <h1 className="text-3xl font-bold text-foreground">Stock Adjustment / Physical Count</h1>
            <p className="text-muted-foreground mt-1">Adjust stock for damage, shortage, or physical count variance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save & Post
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Card className="border-important bg-important/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-important flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong>Important:</strong> Stock adjustments directly affect inventory valuation and accounting. Ensure physical verification is completed before posting.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Header Form */}
        <Card>
          <CardHeader>
            <CardTitle>Adjustment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Adjustment No.</label>
                <Input placeholder="ADJ-2025-XXXX" disabled />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Adjustment Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Warehouse</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Warehouse</SelectItem>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Adjustment Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical Count</SelectItem>
                    <SelectItem value="damage">Damage / Breakage</SelectItem>
                    <SelectItem value="shortage">Shortage / Loss</SelectItem>
                    <SelectItem value="excess">Excess Found</SelectItem>
                    <SelectItem value="expiry">Near Expiry Write-off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Remarks</label>
              <Input placeholder="Reason for adjustment..." />
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Adjustment Lines</CardTitle>
            <Button onClick={addLine} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Line
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Product</TableHead>
                    <TableHead className="w-[120px]">Batch No.</TableHead>
                    <TableHead className="w-[100px]">Expiry</TableHead>
                    <TableHead className="w-[100px] text-right">System Qty</TableHead>
                    <TableHead className="w-[100px] text-right">Physical Qty</TableHead>
                    <TableHead className="w-[100px] text-right">Difference</TableHead>
                    <TableHead className="w-[80px] text-right">Cost</TableHead>
                    <TableHead className="w-[100px] text-right">Value Impact</TableHead>
                    <TableHead className="w-[150px]">Reason</TableHead>
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
                            <SelectValue placeholder="Batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="b1">PAR2401</SelectItem>
                            <SelectItem value="b2">PAR2402</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        2026-06-30
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        4,750
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="text-right" />
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-critical">
                          -15
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        5.50
                      </TableCell>
                      <TableCell className="text-right font-medium text-critical">
                        -82.50
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="damage">Damage</SelectItem>
                            <SelectItem value="shortage">Shortage</SelectItem>
                            <SelectItem value="breakage">Breakage</SelectItem>
                            <SelectItem value="theft">Theft</SelectItem>
                            <SelectItem value="excess">Excess</SelectItem>
                          </SelectContent>
                        </Select>
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
              <div className="w-96 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Lines:</span>
                  <span className="font-medium text-foreground">{lines.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Adjustment Qty:</span>
                  <span className="font-medium text-critical">-15</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-foreground">Value Impact:</span>
                  <span className="text-critical">PKR -82.50</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounting Impact */}
        <Card className="bg-info/5 border-info/20">
          <CardHeader>
            <CardTitle className="text-sm">Accounting Impact (Auto-Generated)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>Dr: Inventory Loss / Damage Expense - PKR 82.50</p>
              <p>Cr: Inventory (Main Warehouse) - PKR 82.50</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StockAdjustment;
