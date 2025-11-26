export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      batches: {
        Row: {
          batch_no: string
          created_at: string | null
          drap_compliant: boolean | null
          expiry_date: string
          id: string
          is_active: boolean | null
          manufacturing_date: string | null
          mrp: number | null
          product_id: string
          supplier_id: string | null
          unit_cost: number
        }
        Insert: {
          batch_no: string
          created_at?: string | null
          drap_compliant?: boolean | null
          expiry_date: string
          id?: string
          is_active?: boolean | null
          manufacturing_date?: string | null
          mrp?: number | null
          product_id: string
          supplier_id?: string | null
          unit_cost: number
        }
        Update: {
          batch_no?: string
          created_at?: string | null
          drap_compliant?: boolean | null
          expiry_date?: string
          id?: string
          is_active?: boolean | null
          manufacturing_date?: string | null
          mrp?: number | null
          product_id?: string
          supplier_id?: string | null
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      chart_of_accounts: {
        Row: {
          account_code: string
          account_name: string
          account_type: Database["public"]["Enums"]["account_type"]
          created_at: string | null
          id: string
          is_active: boolean | null
          parent_id: string | null
        }
        Insert: {
          account_code: string
          account_name: string
          account_type: Database["public"]["Enums"]["account_type"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          parent_id?: string | null
        }
        Update: {
          account_code?: string
          account_name?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chart_of_accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          code: string
          contact_person: string | null
          created_at: string | null
          credit_days: number | null
          credit_limit: number | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          contact_person?: string | null
          created_at?: string | null
          credit_days?: number | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          contact_person?: string | null
          created_at?: string | null
          credit_days?: number | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          basic_salary: number
          created_at: string | null
          department: string | null
          designation: string | null
          email: string | null
          employee_code: string
          first_name: string
          id: string
          join_date: string
          last_name: string
          phone: string | null
          status: Database["public"]["Enums"]["employee_status"] | null
          updated_at: string | null
          warehouse_id: string | null
        }
        Insert: {
          basic_salary?: number
          created_at?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          employee_code: string
          first_name: string
          id?: string
          join_date: string
          last_name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Update: {
          basic_salary?: number
          created_at?: string | null
          department?: string | null
          designation?: string | null
          email?: string | null
          employee_code?: string
          first_name?: string
          id?: string
          join_date?: string
          last_name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_assets: {
        Row: {
          accumulated_depreciation: number | null
          asset_code: string
          asset_name: string
          book_value: number
          category: string
          created_at: string | null
          depreciation_rate: number | null
          id: string
          purchase_cost: number
          purchase_date: string
          status: string | null
          updated_at: string | null
          warehouse_id: string | null
        }
        Insert: {
          accumulated_depreciation?: number | null
          asset_code: string
          asset_name: string
          book_value: number
          category: string
          created_at?: string | null
          depreciation_rate?: number | null
          id?: string
          purchase_cost: number
          purchase_date: string
          status?: string | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Update: {
          accumulated_depreciation?: number | null
          asset_code?: string
          asset_name?: string
          book_value?: number
          category?: string
          created_at?: string | null
          depreciation_rate?: number | null
          id?: string
          purchase_cost?: number
          purchase_date?: string
          status?: string | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixed_assets_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      goods_received_notes: {
        Row: {
          created_at: string | null
          created_by: string | null
          drap_compliant: boolean | null
          grn_no: string
          id: string
          notes: string | null
          po_id: string
          quality_check_passed: boolean | null
          received_date: string
          warehouse_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          drap_compliant?: boolean | null
          grn_no: string
          id?: string
          notes?: string | null
          po_id: string
          quality_check_passed?: boolean | null
          received_date?: string
          warehouse_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          drap_compliant?: boolean | null
          grn_no?: string
          id?: string
          notes?: string | null
          po_id?: string
          quality_check_passed?: boolean | null
          received_date?: string
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goods_received_notes_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_received_notes_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      grn_items: {
        Row: {
          batch_no: string
          created_at: string | null
          expiry_date: string
          grn_id: string
          id: string
          mrp: number | null
          po_item_id: string
          product_id: string
          quality_passed: boolean | null
          quantity: number
          unit_cost: number
        }
        Insert: {
          batch_no: string
          created_at?: string | null
          expiry_date: string
          grn_id: string
          id?: string
          mrp?: number | null
          po_item_id: string
          product_id: string
          quality_passed?: boolean | null
          quantity: number
          unit_cost: number
        }
        Update: {
          batch_no?: string
          created_at?: string | null
          expiry_date?: string
          grn_id?: string
          id?: string
          mrp?: number | null
          po_item_id?: string
          product_id?: string
          quality_passed?: boolean | null
          quantity?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "grn_items_grn_id_fkey"
            columns: ["grn_id"]
            isOneToOne: false
            referencedRelation: "goods_received_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_items_po_item_id_fkey"
            columns: ["po_item_id"]
            isOneToOne: false
            referencedRelation: "purchase_order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grn_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_stock: {
        Row: {
          available_quantity: number | null
          batch_id: string | null
          blocked_quantity: number
          id: string
          product_id: string
          quantity: number
          updated_at: string | null
          warehouse_id: string
        }
        Insert: {
          available_quantity?: number | null
          batch_id?: string | null
          blocked_quantity?: number
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string | null
          warehouse_id: string
        }
        Update: {
          available_quantity?: number | null
          batch_id?: string | null
          blocked_quantity?: number
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_stock_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_stock_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          batch_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          product_id: string
          quantity: number
          reference_id: string | null
          reference_type: string | null
          transaction_type: string
          warehouse_id: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          product_id: string
          quantity: number
          reference_id?: string | null
          reference_type?: string | null
          transaction_type: string
          warehouse_id: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          reference_id?: string | null
          reference_type?: string | null
          transaction_type?: string
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_items: {
        Row: {
          allowances: number | null
          basic_salary: number
          created_at: string | null
          deductions: number | null
          employee_id: string
          id: string
          net_salary: number
          payroll_run_id: string
        }
        Insert: {
          allowances?: number | null
          basic_salary: number
          created_at?: string | null
          deductions?: number | null
          employee_id: string
          id?: string
          net_salary: number
          payroll_run_id: string
        }
        Update: {
          allowances?: number | null
          basic_salary?: number
          created_at?: string | null
          deductions?: number | null
          employee_id?: string
          id?: string
          net_salary?: number
          payroll_run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_items_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_items_payroll_run_id_fkey"
            columns: ["payroll_run_id"]
            isOneToOne: false
            referencedRelation: "payroll_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_runs: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          id: string
          payment_date: string
          period_end: string
          period_start: string
          status: string | null
          total_deductions: number | null
          total_gross: number | null
          total_net: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          payment_date: string
          period_end: string
          period_start: string
          status?: string | null
          total_deductions?: number | null
          total_gross?: number | null
          total_net?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          payment_date?: string
          period_end?: string
          period_start?: string
          status?: string | null
          total_deductions?: number | null
          total_gross?: number | null
          total_net?: number | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          mrp: number | null
          name: string
          reorder_level: number | null
          requires_batch_tracking: boolean | null
          shelf_life_days: number | null
          standard_price: number
          unit: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          mrp?: number | null
          name: string
          reorder_level?: number | null
          requires_batch_tracking?: boolean | null
          shelf_life_days?: number | null
          standard_price: number
          unit: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          mrp?: number | null
          name?: string
          reorder_level?: number | null
          requires_batch_tracking?: boolean | null
          shelf_life_days?: number | null
          standard_price?: number
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          warehouse_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          id: string
          line_total: number
          po_id: string
          product_id: string
          quantity: number
          received_quantity: number | null
          tax_percent: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          line_total: number
          po_id: string
          product_id: string
          quantity: number
          received_quantity?: number | null
          tax_percent?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          line_total?: number
          po_id?: string
          product_id?: string
          quantity?: number
          received_quantity?: number | null
          tax_percent?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          expected_delivery_date: string | null
          id: string
          notes: string | null
          order_date: string
          po_no: string
          pr_id: string | null
          status: Database["public"]["Enums"]["po_status"] | null
          subtotal: number
          supplier_id: string
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          warehouse_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_no: string
          pr_id?: string | null
          status?: Database["public"]["Enums"]["po_status"] | null
          subtotal?: number
          supplier_id: string
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          warehouse_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          po_no?: string
          pr_id?: string | null
          status?: Database["public"]["Enums"]["po_status"] | null
          subtotal?: number
          supplier_id?: string
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_pr_id_fkey"
            columns: ["pr_id"]
            isOneToOne: false
            referencedRelation: "purchase_requisitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requisition_items: {
        Row: {
          approved_quantity: number | null
          created_at: string | null
          current_stock: number | null
          id: string
          notes: string | null
          pr_id: string
          product_id: string
          requested_quantity: number
        }
        Insert: {
          approved_quantity?: number | null
          created_at?: string | null
          current_stock?: number | null
          id?: string
          notes?: string | null
          pr_id: string
          product_id: string
          requested_quantity: number
        }
        Update: {
          approved_quantity?: number | null
          created_at?: string | null
          current_stock?: number | null
          id?: string
          notes?: string | null
          pr_id?: string
          product_id?: string
          requested_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requisition_items_pr_id_fkey"
            columns: ["pr_id"]
            isOneToOne: false
            referencedRelation: "purchase_requisitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requisition_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requisitions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          pr_no: string
          priority: string | null
          requested_date: string
          required_date: string
          status: Database["public"]["Enums"]["pr_status"] | null
          updated_at: string | null
          warehouse_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          pr_no: string
          priority?: string | null
          requested_date?: string
          required_date: string
          status?: Database["public"]["Enums"]["pr_status"] | null
          updated_at?: string | null
          warehouse_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          pr_no?: string
          priority?: string | null
          requested_date?: string
          required_date?: string
          status?: Database["public"]["Enums"]["pr_status"] | null
          updated_at?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requisitions_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_order_items: {
        Row: {
          batch_id: string | null
          created_at: string | null
          discount_percent: number | null
          id: string
          line_total: number
          product_id: string
          quantity: number
          sales_order_id: string
          tax_percent: number | null
          unit_price: number
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          discount_percent?: number | null
          id?: string
          line_total: number
          product_id: string
          quantity: number
          sales_order_id: string
          tax_percent?: number | null
          unit_price: number
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          discount_percent?: number | null
          id?: string
          line_total?: number
          product_id?: string
          quantity?: number
          sales_order_id?: string
          tax_percent?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_order_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_order_items_sales_order_id_fkey"
            columns: ["sales_order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_orders: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string
          delivery_date: string | null
          discount_amount: number | null
          id: string
          notes: string | null
          order_date: string
          order_no: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          warehouse_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          delivery_date?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          order_date?: string
          order_no: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          warehouse_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          delivery_date?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          order_date?: string
          order_no?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_orders_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          city: string | null
          code: string
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          payment_terms: number | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          payment_terms?: number | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          payment_terms?: number | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      voucher_lines: {
        Row: {
          account_id: string
          created_at: string | null
          credit: number | null
          debit: number | null
          description: string | null
          id: string
          voucher_id: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          voucher_id: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voucher_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "chart_of_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voucher_lines_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          total_credit: number
          total_debit: number
          updated_at: string | null
          voucher_date: string
          voucher_no: string
          voucher_type: Database["public"]["Enums"]["voucher_type"]
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          total_credit?: number
          total_debit?: number
          updated_at?: string | null
          voucher_date?: string
          voucher_no: string
          voucher_type: Database["public"]["Enums"]["voucher_type"]
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          total_credit?: number
          total_debit?: number
          updated_at?: string | null
          voucher_date?: string
          voucher_no?: string
          voucher_type?: Database["public"]["Enums"]["voucher_type"]
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          code: string
          contact_person: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          location: string | null
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          contact_person?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          contact_person?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "asset" | "liability" | "equity" | "revenue" | "expense"
      employee_status: "active" | "inactive" | "terminated"
      order_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "delivered"
        | "cancelled"
      payment_status: "pending" | "partial" | "paid" | "overdue"
      po_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "received"
        | "cancelled"
      pr_status: "pending" | "approved" | "rejected" | "converted_to_po"
      voucher_type:
        | "sales"
        | "purchase"
        | "receipt"
        | "payment"
        | "journal"
        | "contra"
        | "opening"
        | "salary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["asset", "liability", "equity", "revenue", "expense"],
      employee_status: ["active", "inactive", "terminated"],
      order_status: [
        "draft",
        "pending_approval",
        "approved",
        "delivered",
        "cancelled",
      ],
      payment_status: ["pending", "partial", "paid", "overdue"],
      po_status: [
        "draft",
        "pending_approval",
        "approved",
        "received",
        "cancelled",
      ],
      pr_status: ["pending", "approved", "rejected", "converted_to_po"],
      voucher_type: [
        "sales",
        "purchase",
        "receipt",
        "payment",
        "journal",
        "contra",
        "opening",
        "salary",
      ],
    },
  },
} as const
