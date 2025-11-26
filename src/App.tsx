import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Sales from "./pages/Sales";
import SalesDashboard from "./pages/sales/SalesDashboard";
import NewSale from "./pages/sales/NewSale";
import DraftOrders from "./pages/sales/DraftOrders";
import OrderApproval from "./pages/sales/OrderApproval";
import DeliveryChallan from "./pages/sales/DeliveryChallan";
import RiderAssignment from "./pages/sales/RiderAssignment";
import SalesReturns from "./pages/sales/SalesReturns";
import SalesReports from "./pages/sales/SalesReports";
import Inventory from "./pages/Inventory";
import InventoryDashboard from "./pages/inventory/InventoryDashboard";
import OpeningStock from "./pages/inventory/OpeningStock";
import StockLedger from "./pages/inventory/StockLedger";
import BatchStock from "./pages/inventory/BatchStock";
import ShortExpiry from "./pages/inventory/ShortExpiry";
import ReorderLevel from "./pages/inventory/ReorderLevel";
import SlowMoving from "./pages/inventory/SlowMoving";
import StockTransferRequest from "./pages/inventory/StockTransferRequest";
import StockAdjustment from "./pages/inventory/StockAdjustment";
import StockValuation from "./pages/inventory/StockValuation";
import Dashboard from "./pages/Dashboard";
import PurchasingDashboard from "./pages/purchasing/PurchasingDashboard";
import PurchaseRequisition from "./pages/purchasing/PurchaseRequisition";
import PRApproval from "./pages/purchasing/PRApproval";
import PurchaseOrders from "./pages/purchasing/PurchaseOrders";
import GoodsReceiving from "./pages/purchasing/GoodsReceiving";
import PurchaseInvoice from "./pages/purchasing/PurchaseInvoice";
import PurchaseReturns from "./pages/purchasing/PurchaseReturns";
import SupplierLedger from "./pages/purchasing/SupplierLedger";
import PaymentsToSupplier from "./pages/purchasing/PaymentsToSupplier";
import PurchasingReports from "./pages/purchasing/PurchasingReports";
import Finance from "./pages/Finance";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import ChartOfAccounts from "./pages/finance/ChartOfAccounts";
import VoucherEntry from "./pages/finance/VoucherEntry";
import LedgerView from "./pages/finance/LedgerView";
import TrialBalance from "./pages/finance/TrialBalance";
import HR from "./pages/HR";
import PayrollRun from "./pages/hr/PayrollRun";
import PayrollApproval from "./pages/hr/PayrollApproval";
import SalaryVoucher from "./pages/hr/SalaryVoucher";
import EmployeeLedger from "./pages/hr/EmployeeLedger";
import Reports from "./pages/Reports";
import FixedAssets from "./pages/FixedAssets";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        <Route path="/sales" element={<SalesDashboard />} />
        <Route path="/sales/new-sale" element={<NewSale />} />
        <Route path="/sales/draft-orders" element={<DraftOrders />} />
        <Route path="/sales/order-approval" element={<OrderApproval />} />
        <Route path="/sales/delivery-challan" element={<DeliveryChallan />} />
        <Route path="/sales/rider-assignment" element={<RiderAssignment />} />
        <Route path="/sales/returns" element={<SalesReturns />} />
        <Route path="/sales/reports" element={<SalesReports />} />
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/inventory/opening-stock" element={<OpeningStock />} />
          <Route path="/inventory/stock-ledger" element={<StockLedger />} />
          <Route path="/inventory/batch-stock" element={<BatchStock />} />
          <Route path="/inventory/short-expiry" element={<ShortExpiry />} />
          <Route path="/inventory/reorder-level" element={<ReorderLevel />} />
          <Route path="/inventory/slow-moving" element={<SlowMoving />} />
          <Route path="/inventory/stock-transfer-request" element={<StockTransferRequest />} />
          <Route path="/inventory/stock-adjustment" element={<StockAdjustment />} />
          <Route path="/inventory/stock-valuation" element={<StockValuation />} />
          <Route path="/purchasing" element={<PurchasingDashboard />} />
          <Route path="/purchasing/requisition" element={<PurchaseRequisition />} />
          <Route path="/purchasing/pr-approval" element={<PRApproval />} />
          <Route path="/purchasing/purchase-order" element={<PurchaseOrders />} />
          <Route path="/purchasing/goods-receiving" element={<GoodsReceiving />} />
          <Route path="/purchasing/invoice" element={<PurchaseInvoice />} />
          <Route path="/purchasing/returns" element={<PurchaseReturns />} />
          <Route path="/purchasing/supplier-ledger" element={<SupplierLedger />} />
          <Route path="/purchasing/payments" element={<PaymentsToSupplier />} />
          <Route path="/purchasing/reports" element={<PurchasingReports />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/finance/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/finance/voucher-entry" element={<VoucherEntry />} />
          <Route path="/finance/ledger-view" element={<LedgerView />} />
          <Route path="/finance/trial-balance" element={<TrialBalance />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/hr/payroll-run" element={<PayrollRun />} />
          <Route path="/hr/payroll-approval" element={<PayrollApproval />} />
          <Route path="/hr/salary-voucher" element={<SalaryVoucher />} />
          <Route path="/hr/employee-ledger" element={<EmployeeLedger />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/assets" element={<FixedAssets />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
