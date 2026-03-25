import { useState } from "react";
import {
  ArrowLeft,
  Package,
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Minus,
  BarChart3,
  ShoppingCart,
  ShoppingBag,
  AlertTriangle,
  FileText,
  Activity,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../components/ui/card";

type TabType = "overview" | "history" | "transactions" | "alerts";

export function StockDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Mock stock data - in real app, fetch based on id
  const stockItem = {
    id: id || "1",
    name: "Steel Plates 10mm",
    sku: "STL-PLT-10",
    category: "Raw Materials",
    quantity: 150,
    unit: "sheets",
    minStock: 50,
    maxStock: 500,
    location: "Warehouse A",
    costPrice: 85.5,
    sellingPrice: 125.0,
    totalValue: 12825,
    status: "instock",
    supplier: "Global Steel Ltd.",
    lastRestocked: "2024-03-10",
    description: "High-quality industrial steel plates, 10mm thickness, standard size 2400x1200mm",
  };

  const stockHistory = [
    {
      id: "1",
      date: "2024-03-20",
      type: "adjustment",
      quantity: 20,
      action: "add",
      reason: "Stock count adjustment",
      user: "John Doe",
      reference: "ADJ-001",
    },
    {
      id: "2",
      date: "2024-03-18",
      type: "sale",
      quantity: -30,
      action: "remove",
      reason: "Sales order SO-1234",
      user: "System",
      reference: "SO-1234",
    },
    {
      id: "3",
      date: "2024-03-15",
      type: "purchase",
      quantity: 100,
      action: "add",
      reason: "Purchase order PO-5678",
      user: "System",
      reference: "PO-5678",
    },
    {
      id: "4",
      date: "2024-03-12",
      type: "adjustment",
      quantity: -5,
      action: "remove",
      reason: "Damaged items removed",
      user: "Sarah Smith",
      reference: "ADJ-002",
    },
    {
      id: "5",
      date: "2024-03-10",
      type: "sale",
      quantity: -15,
      action: "remove",
      reason: "Sales order SO-1120",
      user: "System",
      reference: "SO-1120",
    },
  ];

  const transactions = [
    {
      id: "SO-1234",
      date: "2024-03-18",
      type: "sale",
      customer: "Anderson Manufacturing",
      quantity: 30,
      unitPrice: 125.0,
      total: 3750,
    },
    {
      id: "PO-5678",
      date: "2024-03-15",
      type: "purchase",
      supplier: "Global Steel Ltd.",
      quantity: 100,
      unitPrice: 85.5,
      total: 8550,
    },
    {
      id: "SO-1120",
      date: "2024-03-10",
      type: "sale",
      customer: "Tech Solutions Inc.",
      quantity: 15,
      unitPrice: 125.0,
      total: 1875,
    },
  ];

  const alerts = [
    {
      id: "1",
      type: "info",
      message: "Stock level is healthy",
      date: "2024-03-20",
    },
    {
      id: "2",
      type: "warning",
      message: "Consider reordering when stock reaches 100 units",
      date: "2024-03-15",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "purchase":
      case "add":
        return "text-green-400";
      case "sale":
      case "remove":
        return "text-red-400";
      case "adjustment":
        return "text-yellow-400";
      default:
        return "text-slate-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="w-4 h-4" />;
      case "sale":
        return <ShoppingBag className="w-4 h-4" />;
      case "adjustment":
        return <Activity className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "instock":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "low":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "outofstock":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Stock Details</h1>
              <p className="text-xs text-slate-400">{stockItem.sku}</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform">
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 active:scale-95 transition-transform">
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </div>

          {/* Stock Header Card */}
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-white text-lg mb-1">{stockItem.name}</h2>
                <p className="text-sm text-slate-400 mb-2">{stockItem.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {stockItem.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      stockItem.status
                    )}`}
                  >
                    {stockItem.status === "instock"
                      ? "In Stock"
                      : stockItem.status === "low"
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stock Adjustment */}
            <div className="flex gap-2">
              <button
                onClick={() => console.log("Remove stock")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 font-medium active:scale-95 transition-all"
              >
                <Minus className="w-4 h-4" />
                Remove
              </button>
              <button
                onClick={() => console.log("Add stock")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl text-green-400 font-medium active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </Card>

          {/* Tabs */}
          <div className="grid grid-cols-4 gap-2 backdrop-blur-xl bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "transactions"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "alerts"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4 animate-fade-in">
            {/* Stock Level Card */}
            <Card className="backdrop-blur-xl bg-gradient-to-br from-accent/10 to-orange-600/10 border-accent/30 p-4">
              <h3 className="font-bold text-white mb-3">Current Stock Level</h3>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-4xl font-bold text-white mb-1">{stockItem.quantity}</p>
                  <p className="text-sm text-slate-300">{stockItem.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Max Stock</p>
                  <p className="text-xl font-bold text-white">{stockItem.maxStock}</p>
                </div>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-orange-600 rounded-full"
                  style={{
                    width: `${Math.min(
                      (stockItem.quantity / stockItem.maxStock) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 mt-2">
                <span>Min: {stockItem.minStock}</span>
                <span>
                  {((stockItem.quantity / stockItem.maxStock) * 100).toFixed(1)}% filled
                </span>
              </div>
            </Card>

            {/* Location & Supplier */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Location & Supplier
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Location</span>
                  <span className="text-sm text-white font-medium">{stockItem.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Supplier</span>
                  <span className="text-sm text-white font-medium">{stockItem.supplier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Last Restocked</span>
                  <span className="text-sm text-white font-medium">
                    {new Date(stockItem.lastRestocked).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Pricing Information */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-accent" />
                Pricing Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Cost Price</p>
                  <p className="text-xl font-bold text-white">${stockItem.costPrice.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">per {stockItem.unit}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Selling Price</p>
                  <p className="text-xl font-bold text-white">
                    ${stockItem.sellingPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">per {stockItem.unit}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Total Inventory Value</p>
                    <p className="text-sm text-slate-500">
                      {stockItem.quantity} × ${stockItem.costPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-accent">
                    ${stockItem.totalValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Profit Margin */}
            <Card className="backdrop-blur-xl bg-green-500/10 border-green-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-400 mb-1">Profit Margin</p>
                  <p className="text-xs text-green-400/80">Per unit profit</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    ${(stockItem.sellingPrice - stockItem.costPrice).toFixed(2)}
                  </p>
                  <p className="text-xs text-green-400/80">
                    {(
                      ((stockItem.sellingPrice - stockItem.costPrice) / stockItem.costPrice) *
                      100
                    ).toFixed(1)}
                    % margin
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4 animate-fade-in">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-3">Stock Movement Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-xs text-slate-400">Total In</p>
                    <p className="text-lg font-bold text-green-400">+120</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <div>
                    <p className="text-xs text-slate-400">Total Out</p>
                    <p className="text-lg font-bold text-red-400">-50</p>
                  </div>
                </div>
              </div>
            </Card>

            {stockHistory.map((record) => (
              <Card
                key={record.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${
                        record.action === "add"
                          ? "from-green-500 to-green-600"
                          : "from-red-500 to-red-600"
                      } rounded-xl shadow-lg`}
                    >
                      {getTypeIcon(record.type)}
                    </div>
                    <div>
                      <p className="font-bold text-white capitalize mb-0.5">{record.type}</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-400">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      record.action === "add" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {record.quantity > 0 ? "+" : ""}
                    {record.quantity}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reason</span>
                    <span className="text-white">{record.reason}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reference</span>
                    <span className="text-blue-400">{record.reference}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">By</span>
                    <span className="text-white">{record.user}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-4 animate-fade-in">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-3">Transaction Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total Sales</p>
                  <p className="text-xl font-bold text-green-400">$5,625</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total Purchases</p>
                  <p className="text-xl font-bold text-blue-400">$8,550</p>
                </div>
              </div>
            </Card>

            {transactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${
                        transaction.type === "sale"
                          ? "from-green-500 to-green-600"
                          : "from-blue-500 to-blue-600"
                      } rounded-xl shadow-lg`}
                    >
                      {transaction.type === "sale" ? (
                        <ShoppingBag className="w-4 h-4 text-white" />
                      ) : (
                        <ShoppingCart className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5">{transaction.id}</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 capitalize">
                    {transaction.type}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">
                      {transaction.type === "sale" ? "Customer" : "Supplier"}
                    </span>
                    <span className="text-white">
                      {transaction.type === "sale"
                        ? transaction.customer
                        : transaction.supplier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Quantity</span>
                    <span className="text-white">
                      {transaction.quantity} {stockItem.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Unit Price</span>
                    <span className="text-white">${transaction.unitPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total</span>
                    <span className="text-lg font-bold text-accent">
                      ${transaction.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-4 animate-fade-in">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-4">Reorder Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Minimum Stock Level</span>
                  <span className="text-sm text-white font-medium">
                    {stockItem.minStock} {stockItem.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Maximum Stock Level</span>
                  <span className="text-sm text-white font-medium">
                    {stockItem.maxStock} {stockItem.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Reorder Point</span>
                  <span className="text-sm text-yellow-400 font-medium">
                    {stockItem.minStock} {stockItem.unit}
                  </span>
                </div>
              </div>
            </Card>

            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`backdrop-blur-xl border p-4 ${
                  alert.type === "warning"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 flex-shrink-0 ${
                      alert.type === "warning" ? "text-yellow-400" : "text-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium text-sm mb-1 ${
                        alert.type === "warning" ? "text-yellow-400" : "text-blue-400"
                      }`}
                    >
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-400">
                        {new Date(alert.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="backdrop-blur-xl bg-green-500/10 border-green-500/30 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-green-400 text-sm">Stock Performance</p>
                  <p className="text-xs text-green-400/80">This item is performing well</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
