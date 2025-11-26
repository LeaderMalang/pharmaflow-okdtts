import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, AlertTriangle, Package } from "lucide-react";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { ProductsTable } from "@/components/inventory/ProductsTable";

const inventoryData = [
  {
    id: "PRD-001",
    name: "Paracetamol 500mg",
    category: "Analgesics",
    stock: 1250,
    reorderLevel: 500,
    unit: "Tablets",
    value: "$2,500",
  },
  {
    id: "PRD-002",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 320,
    reorderLevel: 400,
    unit: "Capsules",
    value: "$1,920",
  },
  {
    id: "PRD-003",
    name: "Ibuprofen 400mg",
    category: "Anti-inflammatory",
    stock: 890,
    reorderLevel: 300,
    unit: "Tablets",
    value: "$3,560",
  },
  {
    id: "PRD-004",
    name: "Vitamin C 1000mg",
    category: "Supplements",
    stock: 150,
    reorderLevel: 200,
    unit: "Tablets",
    value: "$450",
  },
  {
    id: "PRD-005",
    name: "Cough Syrup 100ml",
    category: "Respiratory",
    stock: 680,
    reorderLevel: 250,
    unit: "Bottles",
    value: "$2,040",
  },
];

const Inventory = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const lowStockItems = inventoryData.filter((item) => item.stock < item.reorderLevel);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage your stock levels</p>
          </div>
          <AddProductDialog onProductAdded={handleProductAdded} />
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Card className="border-warning bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Low Stock Alert</h3>
                  <p className="text-sm text-muted-foreground">
                    {lowStockItems.length} product(s) are below reorder level and need restocking
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Items
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{inventoryData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                  <p className="text-2xl font-bold text-foreground">3,290</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-foreground">{lowStockItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground">$10,470</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Product Inventory</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProductsTable refreshTrigger={refreshTrigger} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
