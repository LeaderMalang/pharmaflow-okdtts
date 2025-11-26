import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, FileText } from "lucide-react";
import { useState } from "react";

type VoucherLine = {
  id: string;
  accountHead: string;
  subLedger: string;
  debit: number;
  credit: number;
  remarks: string;
};

export default function VoucherEntry() {
  const [voucherType, setVoucherType] = useState("payment");
  const [lines, setLines] = useState<VoucherLine[]>([
    { id: "1", accountHead: "", subLedger: "", debit: 0, credit: 0, remarks: "" },
  ]);

  const addLine = () => {
    setLines([...lines, { id: Date.now().toString(), accountHead: "", subLedger: "", debit: 0, credit: 0, remarks: "" }]);
  };

  const removeLine = (id: string) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Voucher Entry</h1>
            <p className="text-muted-foreground">Create accounting vouchers with double-entry system</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              View All Vouchers
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voucher Header */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Voucher Details</CardTitle>
              <CardDescription>Enter voucher header information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Voucher Type *</Label>
                  <Select value={voucherType} onValueChange={setVoucherType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Voucher</SelectItem>
                      <SelectItem value="purchase">Purchase Voucher</SelectItem>
                      <SelectItem value="receipt">Receipt Voucher</SelectItem>
                      <SelectItem value="payment">Payment Voucher</SelectItem>
                      <SelectItem value="journal">Journal Voucher</SelectItem>
                      <SelectItem value="contra">Contra Voucher</SelectItem>
                      <SelectItem value="opening">Opening Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Voucher No.</Label>
                  <Input value="V-2025-004" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Voucher Date *</Label>
                  <Input type="date" defaultValue="2025-01-15" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    Draft
                  </Badge>
                </div>
                <div className="md:col-span-4 space-y-2">
                  <Label>Narration / Description *</Label>
                  <Textarea placeholder="Enter voucher narration..." rows={2} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voucher Lines */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Voucher Entries</CardTitle>
                  <CardDescription>Double-entry accounting lines (Dr/Cr must balance)</CardDescription>
                </div>
                <Button onClick={addLine} size="sm" variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Line
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Account Head *</TableHead>
                    <TableHead className="w-[200px]">Sub-Ledger</TableHead>
                    <TableHead className="w-[150px] text-right">Debit (Dr)</TableHead>
                    <TableHead className="w-[150px] text-right">Credit (Cr)</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line, index) => (
                    <TableRow key={line.id}>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash in Hand (1001)</SelectItem>
                            <SelectItem value="bank">Bank - HBL (1002)</SelectItem>
                            <SelectItem value="receivable">Accounts Receivable (1101)</SelectItem>
                            <SelectItem value="payable">Accounts Payable (2001)</SelectItem>
                            <SelectItem value="salary-payable">Salary Payable (2101)</SelectItem>
                            <SelectItem value="sales">Sales Revenue (4001)</SelectItem>
                            <SelectItem value="cogs">COGS (5001)</SelectItem>
                            <SelectItem value="salary-admin">Salaries - Admin (5101)</SelectItem>
                            <SelectItem value="salary-sales">Salaries - Sales (5102)</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Optional" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emp1">Ahmed Ali (EMP-001)</SelectItem>
                            <SelectItem value="emp2">Fatima Khan (EMP-002)</SelectItem>
                            <SelectItem value="cust1">Dr. Ahmed (CUST-001)</SelectItem>
                            <SelectItem value="supp1">ABC Pharma (SUPP-001)</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="0" className="text-right" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Optional notes" />
                      </TableCell>
                      <TableCell>
                        {lines.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLine(line.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell colSpan={2} className="text-right">Total</TableCell>
                    <TableCell className="text-right">PKR {totalDebit.toLocaleString()}</TableCell>
                    <TableCell className="text-right">PKR {totalCredit.toLocaleString()}</TableCell>
                    <TableCell colSpan={2}>
                      {isBalanced ? (
                        <Badge variant="default" className="gap-1">✓ Balanced</Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">⚠ Not Balanced</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="lg:col-span-3">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Difference: PKR {Math.abs(totalDebit - totalCredit).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="outline" className="gap-2">
                    <Save className="w-4 h-4" />
                    Save as Draft
                  </Button>
                  <Button disabled={!isBalanced} className="gap-2">
                    Post Voucher
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
