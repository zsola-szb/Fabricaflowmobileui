Build a modern, production-ready Flutter mobile app UI for a manufacturing ERP system called **FabricaFlow Mobile**.

## 🎯 Goal

Create a clean, scalable, and premium mobile UI (NOT web-like) optimized for speed, usability, and real-world ERP workflows such as sales, inventory, manufacturing, and finance.

---

# 📱 Navigation Structure

Use:

* Bottom Navigation Bar (5 tabs):

  1. Home
  2. Sales
  3. Products
  4. Finance
  5. More

* Use a “More” screen as a full feature menu (grid or list)

* Use:

  * Floating Action Button (FAB) for primary actions
  * Tabs inside screens for sub-features
  * Clean routing between screens

---

# 🏠 Home Dashboard

Design a modern dashboard with:

* Header:

  * Welcome message (e.g. “Welcome, Solomon 👋”)
  * Business location selector

* Horizontal scroll cards:

  * Total Sales
  * Net Profit
  * Invoice Due
  * Expenses

* Quick Actions (grid):

  * Add Sale
  * Add Product
  * Add Expense
  * Add Contact

* Chart:

  * Sales last 30 days

* Recent Activity:

  * Sales
  * Expenses

---

# 👥 Contacts Module

Include:

* Contacts List
* Suppliers
* Customers
* Customer Groups

Features:

* Search + filter
* Contact detail screen
* Add/Edit contact form

---

# 📦 Products Module

Include:

* List Products
* Add Product
* Units
* Categories
* Brands
* Warranties

UI:

* Product cards (image, stock, price)
* Filters (category, brand)
* Low stock indicator

---

# 🏭 Manufacturing Module (IMPORTANT)

Design as a dedicated section:

* Production Planning
* Work Orders
* Stage Management
* WIP Tracking (Work In Progress)
* Quality Control
* Packaging
* Recycling
* Manufacturing Settings
* Production Reports

UI Requirements:

* Status-based cards (Pending, In Progress, Completed)
* Timeline or progress indicator
* Production detail screen
* Action buttons (Start, Complete, Inspect)

---

# 🛒 Purchases Module

Include:

* List Purchases
* Add Purchase
* Purchase Returns

UI:

* Supplier info
* Payment status
* Purchase detail view

---

# 💰 Sales Module

Include:

* All Sales
* Add Sale
* POS (Point of Sale)
* Add Draft
* List Drafts
* Add Quotation
* List Quotations
* Sell Return
* Shipments
* Discounts

UI:

* Tab system (Sales / Drafts / Quotations)
* POS interface:

  * Product selection
  * Cart
  * Payment section

---

# 🔄 Stock Management

Include:

* Stock Transfers

  * List
  * Add Transfer

* Stock Adjustment

  * List
  * Add Adjustment

UI:

* Warehouse/location selector
* Stock movement history
* Adjustment forms

---

# 💳 Finance Module

Include:

* Expenses

  * List Expenses
  * Add Expense
  * Expense Categories

* Payment Accounts

  * List Accounts

* Financial Reports:

  * Balance Sheet
  * Trial Balance
  * Cash Flow
  * Payment Account Report

UI:

* Tabs inside finance screen
* Summary cards
* Clean transaction lists

---

# 📊 Reports Module

Include:

* Sales Reports
* Production Reports
* Inventory Reports

UI:

* Chart-based (bar/line charts)
* Filters (date, location)

---

# ⚙️ Settings

Include:

* General Settings
* App Settings
* Manufacturing Settings

---

# 🎨 UI / UX Design Guidelines

Style:

* Modern SaaS design
* Clean spacing
* Minimal but powerful UI

Components:

* Rounded cards (12–16px radius)
* Soft shadows
* Icons with labels

Colors:

* Primary: Deep Blue Gradient
* Accent: Orange
* Success: Green
* Danger: Red

UX Rules:

* No sidebar (mobile optimized)
* Use FAB for actions
* Use tabs for sub-features
* Keep screens focused and uncluttered

---

# ⚡ Technical Requirements

* Use Flutter Material 3
* Use reusable widgets
* Modular structure (separate screens)
* Responsive design
* Scalable architecture

---

# 🧠 Advanced Features (optional but preferred)

* Pull to refresh
* Global search
* Smart insights (e.g. “Sales increased 20%”)
* Offline-friendly UI states
* Loading skeletons

---

# ✅ Output Expectation

Generate:

* Complete Flutter UI screens
* Navigation setup
* Reusable components
* Clean and scalable code structure

Do NOT generate backend logic. Focus on UI + UX + structure only.

---

# 🎯 Final Instruction

The app should feel like a **premium ERP mobile app**, not a simple CRUD app.

It must be:

* Fast
* Clean
* Touch-friendly
* Business-ready
