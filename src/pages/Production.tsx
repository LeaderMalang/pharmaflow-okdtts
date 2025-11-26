import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, TrendingUp, Clock, Package, Search, Filter, Download } from "lucide-react";

const mockProductionOrders = [
  { id: "PRO-001", product: "Paracetamol 500mg", batch: "BATCH-2024-001", quantity: 50000, completed: 45000, status: "In Progress", startDate: "2024-01-10", endDate: "2024-01-20" },
  { id: "PRO-002", product: "Amoxicillin 250mg", batch: "BATCH-2024-002", quantity: 30000, completed: 30000, status: "Completed", startDate: "2024-01-05", endDate: "2024-01-15" },
  { id: "PRO-003", product: "Ibuprofen 400mg", batch: "BATCH-2024-003", quantity: 40000, completed: 15000, status: "In Progress", startDate: "2024-01-15", endDate: "2024-01-25" },
  { id: "PRO-004", product: "Cetirizine 10mg", batch: "BATCH-2024-004", quantity: 25000, completed: 0, status: "Scheduled", startDate: "2024-01-25", endDate: "2024-02-05" },
];

const mockSchedule = [
  { id: "SCH-001", product: "Metformin 500mg", quantity: 60000, machine: "Line A", shift: "Morning", date: "2024-01-26", status: "Scheduled" },
  { id: "SCH-002", product: "Atorvastatin 10mg", quantity: 35000, machine: "Line B", shift: "Evening", date: "2024-01-26", status: "Scheduled" },
  { id: "SCH-003", product: "Omeprazole 20mg", quantity: 45000, machine: "Line A", shift: "Night", date: "2024-01-27", status: "Scheduled" },
  { id: "SCH-004", product: "Losartan 50mg", quantity: 28000, machine: "Line C", shift: "Morning", date: "2024-01-27", status: "Scheduled" },
];

const mockBatches = [
  { id: "BATCH-2024-001", product: "Paracetamol 500mg", quantity: 50000, manufactured: "2024-01-10", expiry: "2025-01-10", qcStatus: "Passed", released: true },
  { id: "BATCH-2024-002", product: "Amoxicillin 250mg", quantity: 30000, manufactured: "2024-01-05", expiry: "2024-07-05", qcStatus: "Passed", released: true },
  { id: "BATCH-2024-003", product: "Ibuprofen 400mg", quantity: 40000, manufactured: "2024-01-15", expiry: "2025-01-15", qcStatus: "Testing", released: false },
  { id: "BATCH-2024-004", product: "Aspirin 75mg", quantity: 55000, manufactured: "2024-01-08", expiry: "2025-01-08", qcStatus: "Passed", released: true },
];

const mockMaterials = [
  { id: "MAT-001", material: "Active Ingredient A", required: 500, available: 450, unit: "kg", status: "Low Stock" },
  { id: "MAT-002", material: "Excipient B", required: 800, available: 900, unit: "kg", status: "Sufficient" },
  { id: "MAT-003", material: "Coating Material", required: 200, available: 180, unit: "kg", status: "Low Stock" },
  { id: "MAT-004", material: "Packaging Material", required: 10000, available: 12000, unit: "units", status: "Sufficient" },
];

const Production = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Production Management</h1>
            <p className="text-muted-foreground mt-1">Manufacturing scheduling, batch tracking & quality control</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Production Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Active Orders"
            value="12"
            change="+3 this week"
            icon={Factory}
            trend="up"
          />
          <StatCard
            title="Production Efficiency"
            value="94.5%"
            change="+2.1%"
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Avg Lead Time"
            value="8.5 days"
            change="-0.5 days"
            icon={Clock}
            trend="down"
          />
          <StatCard
            title="Batches This Month"
            value="48"
            change="+12%"
            icon={Package}
            trend="up"
          />
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Production Orders</TabsTrigger>
            <TabsTrigger value="schedule">Scheduling</TabsTrigger>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
            <TabsTrigger value="materials">Raw Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Production Orders</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search orders..." className="pl-10 w-64" />
                    </div>
                    <Button>New Order</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProductionOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.batch}</TableCell>
                        <TableCell>{order.quantity.toLocaleString()}</TableCell>
                        <TableCell>{order.completed.toLocaleString()}</TableCell>
                        <TableCell>{order.startDate}</TableCell>
                        <TableCell>{order.endDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Completed" ? "bg-success/10 text-success" :
                            order.status === "In Progress" ? "bg-warning/10 text-warning" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Production Schedule</CardTitle>
                  <Button>Add Schedule</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Schedule ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Machine/Line</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSchedule.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.id}</TableCell>
                        <TableCell>{schedule.product}</TableCell>
                        <TableCell>{schedule.quantity.toLocaleString()}</TableCell>
                        <TableCell>{schedule.machine}</TableCell>
                        <TableCell>{schedule.shift}</TableCell>
                        <TableCell>{schedule.date}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                            {schedule.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batches" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Batch Records</CardTitle>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Manufactured</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Released</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">{batch.id}</TableCell>
                        <TableCell>{batch.product}</TableCell>
                        <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                        <TableCell>{batch.manufactured}</TableCell>
                        <TableCell>{batch.expiry}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            batch.qcStatus === "Passed" ? "bg-success/10 text-success" :
                            batch.qcStatus === "Testing" ? "bg-warning/10 text-warning" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {batch.qcStatus}
                          </span>
                        </TableCell>
                        <TableCell>{batch.released ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Raw Materials Requirement</CardTitle>
                  <Button>Request Materials</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material ID</TableHead>
                      <TableHead>Material Name</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.id}</TableCell>
                        <TableCell>{material.material}</TableCell>
                        <TableCell>{material.required}</TableCell>
                        <TableCell>{material.available}</TableCell>
                        <TableCell>{material.unit}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            material.status === "Sufficient" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {material.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Order</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Production;
