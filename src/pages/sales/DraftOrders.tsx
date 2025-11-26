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
import { Search, ArrowLeft, Edit, Trash2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DraftOrders = () => {
  const navigate = useNavigate();

  const draftOrders = [
    { 
      id: "DRF-2024-001", 
      party: "City Medical Store", 
      warehouse: "Main Warehouse - Karachi",
      items: 5, 
      amount: "₨ 25,400", 
      createdBy: "Ali Ahmed",
      date: "2024-01-15",
      time: "10:30 AM"
    },
    { 
      id: "DRF-2024-002", 
      party: "Health Plus Pharmacy", 
      warehouse: "Branch Warehouse - Lahore",
      items: 3, 
      amount: "₨ 15,200", 
      createdBy: "Sara Khan",
      date: "2024-01-15",
      time: "11:45 AM"
    },
    { 
      id: "DRF-2024-003", 
      party: "Wellness Clinic", 
      warehouse: "Main Warehouse - Karachi",
      items: 8, 
      amount: "₨ 42,800", 
      createdBy: "Usman Malik",
      date: "2024-01-14",
      time: "3:20 PM"
    },
  ];

  const handleEdit = (orderId: string) => {
    navigate("/sales/new-sale");
  };

  const handleDelete = (orderId: string) => {
    console.log("Delete order:", orderId);
  };

  const handleSubmit = (orderId: string) => {
    console.log("Submit order:", orderId);
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
              <h1 className="text-3xl font-bold text-foreground">Draft Orders</h1>
              <p className="text-muted-foreground mt-1">Manage and complete pending draft orders</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Drafts</p>
              <p className="text-2xl font-bold text-foreground mt-2">{draftOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-foreground mt-2">₨ 83,400</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold text-foreground mt-2">₨ 27,800</p>
            </CardContent>
          </Card>
        </div>

        {/* Draft Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Draft Orders List</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search drafts..." className="pl-10 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Draft ID</TableHead>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {draftOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.party}</TableCell>
                    <TableCell>{order.warehouse}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>{order.createdBy}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{order.date}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(order.id)}
                          className="gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleSubmit(order.id)}
                          className="gap-1"
                        >
                          <Send className="w-3 h-3" />
                          Submit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
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

export default DraftOrders;
