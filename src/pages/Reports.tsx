import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart } from "lucide-react";

const reportCategories = [
  {
    category: "Financial Reports",
    icon: TrendingUp,
    reports: [
      { name: "Profit & Loss Statement", description: "Comprehensive P&L analysis", lastGenerated: "2024-01-23" },
      { name: "Balance Sheet", description: "Assets, liabilities, and equity", lastGenerated: "2024-01-23" },
      { name: "Cash Flow Statement", description: "Cash inflows and outflows", lastGenerated: "2024-01-22" },
      { name: "Trial Balance", description: "Account balances verification", lastGenerated: "2024-01-23" },
    ]
  },
  {
    category: "Sales Reports",
    icon: BarChart3,
    reports: [
      { name: "Sales Summary", description: "Overall sales performance", lastGenerated: "2024-01-24" },
      { name: "Customer Sales Analysis", description: "Sales by customer breakdown", lastGenerated: "2024-01-24" },
      { name: "Product Sales Report", description: "Sales by product category", lastGenerated: "2024-01-23" },
      { name: "Sales Tax Report", description: "VAT/GST reconciliation", lastGenerated: "2024-01-22" },
    ]
  },
  {
    category: "Inventory Reports",
    icon: PieChart,
    reports: [
      { name: "Stock Summary", description: "Current inventory levels", lastGenerated: "2024-01-24" },
      { name: "Stock Movement", description: "Inventory in/out transactions", lastGenerated: "2024-01-24" },
      { name: "Expiry Report", description: "Products nearing expiration", lastGenerated: "2024-01-23" },
      { name: "Stock Valuation", description: "Inventory value analysis", lastGenerated: "2024-01-23" },
    ]
  },
  {
    category: "Production Reports",
    icon: FileText,
    reports: [
      { name: "Production Summary", description: "Manufacturing performance", lastGenerated: "2024-01-24" },
      { name: "Batch Records", description: "Batch production details", lastGenerated: "2024-01-23" },
      { name: "Quality Control", description: "QC test results and analysis", lastGenerated: "2024-01-23" },
      { name: "Material Consumption", description: "Raw material usage", lastGenerated: "2024-01-22" },
    ]
  },
  {
    category: "HR Reports",
    icon: Calendar,
    reports: [
      { name: "Attendance Report", description: "Employee attendance summary", lastGenerated: "2024-01-24" },
      { name: "Payroll Report", description: "Salary and payment details", lastGenerated: "2024-01-20" },
      { name: "Leave Report", description: "Leave balance and history", lastGenerated: "2024-01-23" },
      { name: "Performance Review", description: "Employee performance analysis", lastGenerated: "2024-01-15" },
    ]
  },
  {
    category: "Purchase Reports",
    icon: FileText,
    reports: [
      { name: "Purchase Summary", description: "Procurement overview", lastGenerated: "2024-01-24" },
      { name: "Vendor Analysis", description: "Supplier performance", lastGenerated: "2024-01-23" },
      { name: "Purchase Orders", description: "PO status and tracking", lastGenerated: "2024-01-24" },
      { name: "Price Comparison", description: "Vendor price analysis", lastGenerated: "2024-01-22" },
    ]
  },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Generate and download comprehensive business reports</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle>{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.reports.map((report) => (
                    <div 
                      key={report.name}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last generated: {report.lastGenerated}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Generate</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <CardDescription>Create custom reports with your specific requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <h4 className="font-medium">Financial Analysis</h4>
                  <p className="text-sm text-muted-foreground text-center">
                    Build custom financial reports
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Create Report</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  <h4 className="font-medium">Sales Analytics</h4>
                  <p className="text-sm text-muted-foreground text-center">
                    Analyze sales data and trends
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Create Report</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <PieChart className="w-8 h-8 text-muted-foreground" />
                  <h4 className="font-medium">Inventory Insights</h4>
                  <p className="text-sm text-muted-foreground text-center">
                    Track inventory metrics
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Create Report</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
