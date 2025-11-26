import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, Calendar } from "lucide-react";
import { useState } from "react";

const OpeningStock = () => {
  const [lines, setLines] = useState([
    { id: 1, product: "", batch: "", expiry: "", qty: "", cost: "", warehouse: "" },
  ]);

  const addLine = () => {
    setLines([...lines, { 
      id: lines.length + 1, 
      product: "", 
      batch: "", 
      expiry: "", 
      qty: "", 
      cost: "", 
      warehouse: "" 
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
            <h1 className="text-3xl font-bold text-foreground">Opening Stock Entry</h1>
            <p className="text-muted-foreground mt-1">Initialize stock with batch & expiry details</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save & Post
            </Button>
          </div>
        </div>

        {/* Header Form */}
        <Card>
          <CardHeader>
            <CardTitle>Opening Stock Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Entry Date</label>
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
                <label className="text-sm font-medium text-foreground mb-2 block">Reference No.</label>
                <Input placeholder="OS-2025-0001" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Remarks</label>
              <Input placeholder="Opening stock as of..." />
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Product Lines</CardTitle>
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
                    <TableHead className="w-[250px]">Product</TableHead>
                    <TableHead className="w-[150px]">Batch No.</TableHead>
                    <TableHead className="w-[150px]">Expiry Date</TableHead>
                    <TableHead className="w-[120px]">Pack Size</TableHead>
                    <TableHead className="w-[120px]">Quantity</TableHead>
                    <TableHead className="w-[120px]">Cost Price</TableHead>
                    <TableHead className="w-[150px]">Total Value</TableHead>
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
                        <Input placeholder="Batch no." />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input type="date" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="10x10" className="text-center" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0.00" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <p className="text-right font-medium text-foreground">PKR 0.00</p>
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
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-foreground">Total Value:</span>
                  <span className="text-foreground">PKR 0.00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounting Impact */}
        <Card className="bg-info/5 border-info/20">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Accounting Impact (Auto-Generated)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>Dr: Inventory (Opening Stock) - PKR 0.00</p>
              <p>Cr: Capital / Opening Balance - PKR 0.00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OpeningStock;
