-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE order_status AS ENUM ('draft', 'pending_approval', 'approved', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'paid', 'overdue');
CREATE TYPE pr_status AS ENUM ('pending', 'approved', 'rejected', 'converted_to_po');
CREATE TYPE po_status AS ENUM ('draft', 'pending_approval', 'approved', 'received', 'cancelled');
CREATE TYPE voucher_type AS ENUM ('sales', 'purchase', 'receipt', 'payment', 'journal', 'contra', 'opening', 'salary');
CREATE TYPE account_type AS ENUM ('asset', 'liability', 'equity', 'revenue', 'expense');
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');

-- Warehouses/Branches
CREATE TABLE public.warehouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  location TEXT,
  contact_person TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Categories
CREATE TABLE public.product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.product_categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.product_categories(id),
  unit TEXT NOT NULL,
  description TEXT,
  reorder_level DECIMAL(10,2) DEFAULT 0,
  standard_price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2),
  requires_batch_tracking BOOLEAN DEFAULT true,
  shelf_life_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Batches
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) NOT NULL,
  batch_no TEXT NOT NULL,
  manufacturing_date DATE,
  expiry_date DATE NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2),
  supplier_id UUID,
  is_active BOOLEAN DEFAULT true,
  drap_compliant BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, batch_no)
);

-- Inventory Stock
CREATE TABLE public.inventory_stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) NOT NULL,
  batch_id UUID REFERENCES public.batches(id),
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  blocked_quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  available_quantity DECIMAL(10,2) GENERATED ALWAYS AS (quantity - blocked_quantity) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, batch_id, warehouse_id)
);

-- Inventory Transactions
CREATE TABLE public.inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) NOT NULL,
  batch_id UUID REFERENCES public.batches(id),
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  transaction_type TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Customers
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  credit_limit DECIMAL(12,2) DEFAULT 0,
  credit_days INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suppliers
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  payment_terms INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sales Orders
CREATE TABLE public.sales_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_no TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  delivery_date DATE,
  status order_status DEFAULT 'draft',
  payment_status payment_status DEFAULT 'pending',
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sales Order Items
CREATE TABLE public.sales_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sales_order_id UUID REFERENCES public.sales_orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  batch_id UUID REFERENCES public.batches(id),
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  tax_percent DECIMAL(5,2) DEFAULT 0,
  line_total DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Requisitions
CREATE TABLE public.purchase_requisitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pr_no TEXT UNIQUE NOT NULL,
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  requested_date DATE NOT NULL DEFAULT CURRENT_DATE,
  required_date DATE NOT NULL,
  status pr_status DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Requisition Items
CREATE TABLE public.purchase_requisition_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pr_id UUID REFERENCES public.purchase_requisitions(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  requested_quantity DECIMAL(10,2) NOT NULL,
  current_stock DECIMAL(10,2),
  approved_quantity DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Orders
CREATE TABLE public.purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_no TEXT UNIQUE NOT NULL,
  supplier_id UUID REFERENCES public.suppliers(id) NOT NULL,
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  pr_id UUID REFERENCES public.purchase_requisitions(id),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery_date DATE,
  status po_status DEFAULT 'draft',
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Order Items
CREATE TABLE public.purchase_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_id UUID REFERENCES public.purchase_orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  tax_percent DECIMAL(5,2) DEFAULT 0,
  line_total DECIMAL(12,2) NOT NULL,
  received_quantity DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goods Received Notes
CREATE TABLE public.goods_received_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grn_no TEXT UNIQUE NOT NULL,
  po_id UUID REFERENCES public.purchase_orders(id) NOT NULL,
  warehouse_id UUID REFERENCES public.warehouses(id) NOT NULL,
  received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  quality_check_passed BOOLEAN DEFAULT false,
  drap_compliant BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GRN Items
CREATE TABLE public.grn_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grn_id UUID REFERENCES public.goods_received_notes(id) ON DELETE CASCADE NOT NULL,
  po_item_id UUID REFERENCES public.purchase_order_items(id) NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  batch_no TEXT NOT NULL,
  expiry_date DATE NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2),
  quality_passed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chart of Accounts
CREATE TABLE public.chart_of_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_code TEXT UNIQUE NOT NULL,
  account_name TEXT NOT NULL,
  account_type account_type NOT NULL,
  parent_id UUID REFERENCES public.chart_of_accounts(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vouchers
CREATE TABLE public.vouchers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voucher_no TEXT UNIQUE NOT NULL,
  voucher_type voucher_type NOT NULL,
  voucher_date DATE NOT NULL DEFAULT CURRENT_DATE,
  reference_type TEXT,
  reference_id UUID,
  description TEXT,
  total_debit DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_credit DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voucher Lines
CREATE TABLE public.voucher_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voucher_id UUID REFERENCES public.vouchers(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.chart_of_accounts(id) NOT NULL,
  debit DECIMAL(12,2) DEFAULT 0,
  credit DECIMAL(12,2) DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employees
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_code TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  join_date DATE NOT NULL,
  designation TEXT,
  department TEXT,
  warehouse_id UUID REFERENCES public.warehouses(id),
  basic_salary DECIMAL(10,2) NOT NULL DEFAULT 0,
  status employee_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payroll Runs
CREATE TABLE public.payroll_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  payment_date DATE NOT NULL,
  status TEXT DEFAULT 'draft',
  total_gross DECIMAL(12,2) DEFAULT 0,
  total_deductions DECIMAL(12,2) DEFAULT 0,
  total_net DECIMAL(12,2) DEFAULT 0,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payroll Items
CREATE TABLE public.payroll_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_run_id UUID REFERENCES public.payroll_runs(id) ON DELETE CASCADE NOT NULL,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  basic_salary DECIMAL(10,2) NOT NULL,
  allowances DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  net_salary DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fixed Assets
CREATE TABLE public.fixed_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_code TEXT UNIQUE NOT NULL,
  asset_name TEXT NOT NULL,
  category TEXT NOT NULL,
  purchase_date DATE NOT NULL,
  purchase_cost DECIMAL(12,2) NOT NULL,
  depreciation_rate DECIMAL(5,2) DEFAULT 0,
  accumulated_depreciation DECIMAL(12,2) DEFAULT 0,
  book_value DECIMAL(12,2) NOT NULL,
  warehouse_id UUID REFERENCES public.warehouses(id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  warehouse_id UUID REFERENCES public.warehouses(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_requisition_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goods_received_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grn_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voucher_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixed_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read for now, will refine with authentication)
CREATE POLICY "Allow public read access" ON public.warehouses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.product_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.batches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.inventory_stock FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.inventory_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.suppliers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.sales_orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.sales_order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.purchase_requisitions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.purchase_requisition_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.purchase_orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.purchase_order_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.goods_received_notes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.grn_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.chart_of_accounts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.vouchers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.voucher_lines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.payroll_runs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.payroll_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow public read access" ON public.fixed_assets FOR SELECT TO authenticated USING (true);

-- Profile policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Insert policies for authenticated users
CREATE POLICY "Authenticated users can insert" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.batches FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.customers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.suppliers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.sales_orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.sales_order_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.purchase_requisitions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.purchase_requisition_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.purchase_orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.purchase_order_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can insert" ON public.inventory_transactions FOR INSERT TO authenticated WITH CHECK (true);

-- Update policies
CREATE POLICY "Authenticated users can update" ON public.products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can update" ON public.sales_orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can update" ON public.purchase_orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can update" ON public.inventory_stock FOR UPDATE TO authenticated USING (true);