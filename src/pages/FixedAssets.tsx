import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, TrendingDown, Wrench, FileText, Search, Download } from "lucide-react";

const mockAssets = [
  { id: "FA-001", name: "Production Line A", category: "Machinery", location: "Factory Floor 1", purchaseDate: "2020-05-15", cost: 500000, currentValue: 375000, depreciation: 25, status: "Active" },
  { id: "FA-002", name: "Warehouse Building", category: "Building", location: "Main Site", purchaseDate: "2015-01-10", cost: 2000000, currentValue: 1700000, depreciation: 15, status: "Active" },
  { id: "FA-003", name: "Delivery Truck A", category: "Vehicle", location: "Transport", purchaseDate: "2021-03-20", cost: 80000, currentValue: 56000, depreciation: 30, status: "Active" },
  { id: "FA-004", name: "Office Computers", category: "IT Equipment", location: "Office", purchaseDate: "2022-08-01", cost: 45000, currentValue: 31500, depreciation: 30, status: "Active" },
  { id: "FA-005", name: "Packaging Machine", category: "Machinery", location: "Factory Floor 2", purchaseDate: "2019-11-05", cost: 250000, currentValue: 162500, depreciation: 35, status: "Maintenance" },
];

const mockDepreciation = [
  { assetId: "FA-001", asset: "Production Line A", method: "Straight Line", rate: "10%", annual: 50000, accumulated: 200000, bookValue: 300000 },
  { assetId: "FA-002", asset: "Warehouse Building", method: "Straight Line", rate: "2%", annual: 40000, accumulated: 360000, bookValue: 1640000 },
  { assetId: "FA-003", asset: "Delivery Truck A", method: "Reducing Balance", rate: "15%", annual: 12000, accumulated: 36000, bookValue: 44000 },
  { assetId: "FA-004", asset: "Office Computers", method: "Straight Line", rate: "20%", annual: 9000, accumulated: 13500, bookValue: 31500 },
];

const mockMaintenance = [
  { id: "MNT-001", asset: "Production Line A", type: "Scheduled", description: "Annual servicing", date: "2024-02-15", cost: 5000, technician: "TechCorp", status: "Scheduled" },
  { id: "MNT-002", asset: "Packaging Machine", type: "Repair", description: "Motor replacement", date: "2024-01-22", cost: 8500, technician: "MachineWorks", status: "In Progress" },
  { id: "MNT-003", asset: "Delivery Truck A", type: "Scheduled", description: "Oil change & inspection", date: "2024-01-25", cost: 1200, technician: "Auto Service", status: "Completed" },
  { id: "MNT-004", asset: "Office Computers", type: "Repair", description: "Hardware upgrade", date: "2024-02-01", cost: 3500, technician: "IT Solutions", status: "Scheduled" },
];

const mockDisposals = [
  { id: "DSP-001", asset: "Old Forklift", disposalDate: "2023-12-15", originalCost: 45000, bookValue: 5000, salePrice: 8000, profit: 3000, method: "Sale" },
  { id: "DSP-002", asset: "Retired Server", disposalDate: "2023-11-20", originalCost: 15000, bookValue: 1000, salePrice: 500, profit: -500, method: "Scrap" },
  { id: "DSP-003", asset: "Old Office Furniture", disposalDate: "2023-10-10", originalCost: 20000, bookValue: 2000, salePrice: 2500, profit: 500, method: "Sale" },
];

const FixedAssets = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fixed Assets Management</h1>
            <p className="text-muted-foreground mt-1">Asset tracking, depreciation & maintenance</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Asset Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Assets"
            value="$3.2M"
            change="+8.5%"
            icon={Building2}
            trend="up"
          />
          <StatCard
            title="Current Value"
            value="$2.3M"
            change="71.8%"
            icon={TrendingDown}
            trend="down"
          />
          <StatCard
            title="Annual Depreciation"
            value="$335K"
            change="Standard"
            icon={TrendingDown}
            trend="down"
          />
          <StatCard
            title="Maintenance Cost"
            value="$45K"
            change="+12% YTD"
            icon={Wrench}
            trend="up"
          />
        </div>

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets">Assets Register</TabsTrigger>
            <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="disposal">Disposal</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Fixed Assets Register</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search assets..." className="pl-10 w-64" />
                    </div>
                    <Button>Add Asset</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead className="text-right">Original Cost</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead>Depreciation %</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.category}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>{asset.purchaseDate}</TableCell>
                        <TableCell className="text-right">${asset.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${asset.currentValue.toLocaleString()}</TableCell>
                        <TableCell>{asset.depreciation}%</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            asset.status === "Active" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {asset.status}
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

          <TabsContent value="depreciation" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Depreciation Schedule</CardTitle>
                  <Button>Calculate Depreciation</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead className="text-right">Annual Depreciation</TableHead>
                      <TableHead className="text-right">Accumulated</TableHead>
                      <TableHead className="text-right">Book Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDepreciation.map((item) => (
                      <TableRow key={item.assetId}>
                        <TableCell className="font-medium">{item.assetId}</TableCell>
                        <TableCell>{item.asset}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>{item.rate}</TableCell>
                        <TableCell className="text-right">${item.annual.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${item.accumulated.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${item.bookValue.toLocaleString()}</TableCell>
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

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Maintenance & Repairs</CardTitle>
                  <Button>Schedule Maintenance</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Maintenance ID</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaintenance.map((maintenance) => (
                      <TableRow key={maintenance.id}>
                        <TableCell className="font-medium">{maintenance.id}</TableCell>
                        <TableCell>{maintenance.asset}</TableCell>
                        <TableCell>{maintenance.type}</TableCell>
                        <TableCell>{maintenance.description}</TableCell>
                        <TableCell>{maintenance.date}</TableCell>
                        <TableCell className="text-right">${maintenance.cost.toLocaleString()}</TableCell>
                        <TableCell>{maintenance.technician}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            maintenance.status === "Completed" ? "bg-success/10 text-success" :
                            maintenance.status === "In Progress" ? "bg-warning/10 text-warning" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {maintenance.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disposal" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Asset Disposal & Retirement</CardTitle>
                  <Button>Record Disposal</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disposal ID</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Disposal Date</TableHead>
                      <TableHead className="text-right">Original Cost</TableHead>
                      <TableHead className="text-right">Book Value</TableHead>
                      <TableHead className="text-right">Sale Price</TableHead>
                      <TableHead className="text-right">Profit/Loss</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDisposals.map((disposal) => (
                      <TableRow key={disposal.id}>
                        <TableCell className="font-medium">{disposal.id}</TableCell>
                        <TableCell>{disposal.asset}</TableCell>
                        <TableCell>{disposal.disposalDate}</TableCell>
                        <TableCell className="text-right">${disposal.originalCost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${disposal.bookValue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${disposal.salePrice.toLocaleString()}</TableCell>
                        <TableCell className={`text-right ${disposal.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                          ${Math.abs(disposal.profit).toLocaleString()}
                        </TableCell>
                        <TableCell>{disposal.method}</TableCell>
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

export default FixedAssets;
