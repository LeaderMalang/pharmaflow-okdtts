import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Package, Truck, Printer, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DeliveryChallan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const challans = [
    { 
      id: "DC-2024-001", 
      orderId: "SO-2024-001",
      party: "City Medical Store", 
      address: "Main Market, Saddar, Karachi",
      items: 5, 
      amount: "₨ 45,200",
      packedBy: "Warehouse Staff A",
      checkedBy: "Supervisor B",
      status: "Ready",
      date: "2024-01-15"
    },
    { 
      id: "DC-2024-002", 
      orderId: "SO-2024-003",
      party: "Care Hospital", 
      address: "Clifton Block 5, Karachi",
      items: 12, 
      amount: "₨ 285,000",
      packedBy: "Warehouse Staff C",
      checkedBy: "Supervisor A",
      status: "Packed",
      date: "2024-01-15"
    },
    { 
      id: "DC-2024-003", 
      orderId: "SO-2024-005",
      party: "Metro Pharmacy", 
      address: "Gulshan-e-Iqbal, Karachi",
      items: 8, 
      amount: "₨ 124,500",
      packedBy: "Warehouse Staff B",
      checkedBy: "Supervisor B",
      status: "Checked",
      date: "2024-01-15"
    },
  ];

  const handlePrint = (challanId: string) => {
    toast({
      title: "Printing Challan",
      description: `Delivery challan ${challanId} is being printed`,
    });
  };

  const handleAssignRider = (challanId: string) => {
    navigate("/sales/rider-assignment");
  };

  const handleMarkPacked = (challanId: string) => {
    toast({
      title: "Status Updated",
      description: "Challan marked as packed",
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
              <h1 className="text-3xl font-bold text-foreground">Delivery Challan</h1>
              <p className="text-muted-foreground mt-1">Pack and dispatch approved orders</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ready to Pack</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {challans.filter(c => c.status === "Ready").length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Packed</p>
                  <p className="text-2xl font-bold text-warning mt-2">
                    {challans.filter(c => c.status === "Packed").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-warning opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Checked</p>
                  <p className="text-2xl font-bold text-success mt-2">
                    {challans.filter(c => c.status === "Checked").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground mt-2">₨ 454,700</p>
                </div>
                <Truck className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challan Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Delivery Challans</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search challans..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challan ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Packed By</TableHead>
                  <TableHead>Checked By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challans.map((challan) => (
                  <TableRow key={challan.id}>
                    <TableCell className="font-medium">{challan.id}</TableCell>
                    <TableCell>{challan.orderId}</TableCell>
                    <TableCell>{challan.party}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{challan.address}</TableCell>
                    <TableCell>{challan.items} items</TableCell>
                    <TableCell className="font-semibold">{challan.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          challan.status === "Checked" ? "default" :
                          challan.status === "Packed" ? "secondary" : "outline"
                        }
                      >
                        {challan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{challan.packedBy}</TableCell>
                    <TableCell>{challan.checkedBy}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(challan.id)}
                          className="gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          Print
                        </Button>
                        {challan.status === "Checked" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAssignRider(challan.id)}
                            className="gap-1"
                          >
                            <Truck className="w-3 h-3" />
                            Assign Rider
                          </Button>
                        )}
                        {challan.status === "Ready" && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleMarkPacked(challan.id)}
                            className="gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Mark Packed
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
      </div>
    </DashboardLayout>
  );
};

export default DeliveryChallan;
