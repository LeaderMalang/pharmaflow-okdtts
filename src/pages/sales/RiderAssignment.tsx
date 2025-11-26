import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bike, MapPin, Phone, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RiderAssignment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRider, setSelectedRider] = useState<string | null>(null);

  const challan = {
    id: "DC-2024-003",
    orderId: "SO-2024-005",
    party: "Metro Pharmacy",
    address: "Shop No. 12, Main Boulevard, Gulshan-e-Iqbal Block 13, Karachi",
    phone: "+92 300 1234567",
    items: 8,
    amount: "₨ 124,500",
  };

  const riders = [
    {
      id: "R-001",
      name: "Ahmed Ali",
      phone: "+92 300 1111111",
      vehicle: "Motorcycle - KHI-123",
      activeDeliveries: 2,
      todayDeliveries: 15,
      status: "available",
      rating: 4.8,
    },
    {
      id: "R-002",
      name: "Hassan Khan",
      phone: "+92 300 2222222",
      vehicle: "Motorcycle - KHI-456",
      activeDeliveries: 1,
      todayDeliveries: 12,
      status: "available",
      rating: 4.9,
    },
    {
      id: "R-003",
      name: "Usman Malik",
      phone: "+92 300 3333333",
      vehicle: "Van - KHI-789",
      activeDeliveries: 4,
      todayDeliveries: 8,
      status: "busy",
      rating: 4.7,
    },
  ];

  const handleAssign = () => {
    if (!selectedRider) {
      toast({
        title: "No Rider Selected",
        description: "Please select a rider to assign",
        variant: "destructive",
      });
      return;
    }

    const rider = riders.find(r => r.id === selectedRider);
    toast({
      title: "Rider Assigned",
      description: `Delivery assigned to ${rider?.name}`,
    });
    navigate("/sales/delivery-challan");
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/sales/delivery-challan")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Assign Rider</h1>
              <p className="text-muted-foreground mt-1">Select rider for delivery</p>
            </div>
          </div>
          <Button onClick={handleAssign} disabled={!selectedRider} className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Confirm Assignment
          </Button>
        </div>

        {/* Delivery Details */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Challan ID</p>
                  <p className="text-lg font-bold text-foreground">{challan.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-lg font-semibold text-foreground">{challan.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Party Name</p>
                  <p className="text-lg font-semibold text-foreground">{challan.party}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-lg font-semibold text-foreground">{challan.items} items</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Value</p>
                  <p className="text-lg font-bold text-primary">{challan.amount}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="text-sm font-medium text-foreground">{challan.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Riders */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Select Available Rider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riders.map((rider) => (
              <Card
                key={rider.id}
                className={`cursor-pointer transition-all ${
                  selectedRider === rider.id
                    ? "border-primary ring-2 ring-primary"
                    : rider.status === "available"
                    ? "hover:border-primary"
                    : "opacity-60"
                } ${rider.status !== "available" ? "cursor-not-allowed" : ""}`}
                onClick={() => rider.status === "available" && setSelectedRider(rider.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Bike className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{rider.name}</p>
                        <p className="text-sm text-muted-foreground">{rider.id}</p>
                      </div>
                    </div>
                    <Badge variant={rider.status === "available" ? "default" : "secondary"}>
                      {rider.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{rider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Bike className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{rider.vehicle}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Active</p>
                        <p className="text-lg font-bold text-warning">{rider.activeDeliveries}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="text-lg font-bold text-success">{rider.todayDeliveries}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="text-lg font-bold text-primary">{rider.rating}</p>
                      </div>
                    </div>
                  </div>

                  {selectedRider === rider.id && (
                    <div className="mt-4">
                      <Button className="w-full" size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Selected
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderAssignment;
