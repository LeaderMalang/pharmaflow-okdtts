import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, DollarSign, CheckCircle, Banknote, CreditCard, Smartphone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const mockPayments = [
  { id: "PV-2024-001", supplier: "ABC Pharma Ltd", amount: 200000, mode: "Bank Transfer", reference: "TXN-2024-001", date: "2024-01-20", status: "Cleared" },
  { id: "PV-2024-002", supplier: "MediSupply Co", amount: 150000, mode: "Cheque", reference: "CHQ-456789", date: "2024-01-19", status: "Pending" },
  { id: "PV-2024-003", supplier: "HealthCare Distributors", amount: 280000, mode: "Online", reference: "EFT-789012", date: "2024-01-18", status: "Cleared" },
];

const outstandingInvoices = [
  { id: "INV-2024-P-001", date: "2024-01-15", amount: 450000, dueDate: "2024-02-14", daysOverdue: 0 },
  { id: "INV-2024-P-005", date: "2024-01-10", amount: 280000, dueDate: "2024-02-09", daysOverdue: 0 },
  { id: "INV-2023-P-125", date: "2023-12-20", amount: 180000, dueDate: "2024-01-19", daysOverdue: 3 },
];

const PaymentsToSupplier = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const toggleInvoice = (invoiceId: string, amount: number) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
      setPaymentAmount(paymentAmount - amount);
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
      setPaymentAmount(paymentAmount + amount);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments to Suppliers</h1>
            <p className="text-muted-foreground mt-1">Process and track supplier payments</p>
          </div>
          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Make Payment to Supplier</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abc">ABC Pharma Ltd (Balance: PKR 450,000)</SelectItem>
                        <SelectItem value="medi">MediSupply Co (Balance: PKR 280,000)</SelectItem>
                        <SelectItem value="health">HealthCare Distributors (Balance: PKR 620,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Date</Label>
                    <Input type="date" defaultValue="2024-01-22" />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Banknote className="h-6 w-6" />
                        <span className="text-sm">Cash</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2 border-primary bg-primary/5">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <span className="text-sm">Bank Transfer</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <CheckCircle className="h-6 w-6" />
                        <span className="text-sm">Cheque</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Smartphone className="h-6 w-6" />
                        <span className="text-sm">JazzCash/Easypaisa</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>Bank Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="acc1">HBL - **** 4567</SelectItem>
                            <SelectItem value="acc2">MCB - **** 7890</SelectItem>
                            <SelectItem value="acc3">UBL - **** 1234</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Reference / Transaction ID</Label>
                        <Input placeholder="Enter transaction reference" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Select Invoices to Pay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Invoice Number</TableHead>
                          <TableHead>Invoice Date</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {outstandingInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedInvoices.includes(invoice.id)}
                                onCheckedChange={() => toggleInvoice(invoice.id, invoice.amount)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell className="font-semibold">PKR {invoice.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              {invoice.daysOverdue > 0 ? (
                                <span className="px-2 py-1 rounded-full text-xs bg-destructive/10 text-destructive">
                                  {invoice.daysOverdue} days overdue
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                                  On time
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Selected Invoices: {selectedInvoices.length}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Payment Amount</p>
                          <p className="text-2xl font-bold">PKR {paymentAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label>Or enter custom amount (Advance Payment)</Label>
                      <Input type="number" placeholder="Enter amount" />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>Cancel</Button>
                  <Button>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="cleared">Cleared</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payment History</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search payments..." className="pl-10 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Mode</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.supplier}</TableCell>
                        <TableCell className="font-semibold text-success">PKR {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-muted">
                            {payment.mode}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{payment.reference}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === "Cleared" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Print</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {["cleared", "pending"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center capitalize">{tab} payments will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsToSupplier;
