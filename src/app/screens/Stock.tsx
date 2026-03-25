import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Boxes,
  MapPin,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";

export function Stock() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "low" | "outofstock" | "instock">("all");

  const stockItems = [
    {
      id: "1",
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
    },
    {
      id: "2",
      name: "Aluminum Rods 5mm",
      sku: "ALU-ROD-05",
      category: "Raw Materials",
      quantity: 25,
      unit: "kg",
      minStock: 100,
      maxStock: 1000,
      location: "Warehouse A",
      costPrice: 12.5,
      sellingPrice: 18.0,
      totalValue: 312.5,
      status: "low",
    },
    {
      id: "3",
      name: "Bolt M12x50",
      sku: "BLT-M12-50",
      category: "Hardware",
      quantity: 0,
      unit: "pcs",
      minStock: 500,
      maxStock: 5000,
      location: "Warehouse B",
      costPrice: 0.5,
      sellingPrice: 0.85,
      totalValue: 0,
      status: "outofstock",
    },
    {
      id: "4",
      name: "Paint - Industrial White",
      sku: "PNT-WHT-01",
      category: "Finishing",
      quantity: 45,
      unit: "liters",
      minStock: 20,
      maxStock: 200,
      location: "Warehouse C",
      costPrice: 25.0,
      sellingPrice: 38.5,
      totalValue: 1125,
      status: "instock",
    },
    {
      id: "5",
      name: "Welding Electrodes 3.2mm",
      sku: "WLD-ELC-32",
      category: "Consumables",
      quantity: 80,
      unit: "kg",
      minStock: 30,
      maxStock: 300,
      location: "Warehouse A",
      costPrice: 8.5,
      sellingPrice: 12.0,
      totalValue: 680,
      status: "instock",
    },
    {
      id: "6",
      name: "Copper Wire 2.5mm",
      sku: "COP-WIR-25",
      category: "Raw Materials",
      quantity: 15,
      unit: "kg",
      minStock: 50,
      maxStock: 500,
      location: "Warehouse B",
      costPrice: 18.0,
      sellingPrice: 26.5,
      totalValue: 270,
      status: "low",
    },
    {
      id: "7",
      name: "Safety Gloves",
      sku: "SFT-GLV-01",
      category: "Safety Equipment",
      quantity: 120,
      unit: "pairs",
      minStock: 50,
      maxStock: 500,
      location: "Warehouse C",
      costPrice: 5.5,
      sellingPrice: 9.0,
      totalValue: 660,
      status: "instock",
    },
    {
      id: "8",
      name: "Cutting Blade 300mm",
      sku: "CUT-BLD-300",
      category: "Tools",
      quantity: 8,
      unit: "pcs",
      minStock: 20,
      maxStock: 100,
      location: "Warehouse A",
      costPrice: 45.0,
      sellingPrice: 68.0,
      totalValue: 360,
      status: "low",
    },
  ];

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "low" && item.status === "low") ||
      (activeFilter === "outofstock" && item.status === "outofstock") ||
      (activeFilter === "instock" && item.status === "instock");

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: stockItems.length,
    inStock: stockItems.filter((i) => i.status === "instock").length,
    lowStock: stockItems.filter((i) => i.status === "low").length,
    outOfStock: stockItems.filter((i) => i.status === "outofstock").length,
    totalValue: stockItems.reduce((sum, item) => sum + item.totalValue, 0),
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "instock":
        return <TrendingUp className="w-3 h-3" />;
      case "low":
        return <AlertTriangle className="w-3 h-3" />;
      case "outofstock":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "instock":
        return "In Stock";
      case "low":
        return "Low Stock";
      case "outofstock":
        return "Out of Stock";
      default:
        return status;
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
              <h1 className="text-2xl font-bold text-white">Stock Management</h1>
              <p className="text-sm text-slate-400">Monitor inventory levels</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform">
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search stock items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "bg-white/5 text-slate-400 border border-white/10"
              }`}
            >
              <Boxes className="w-4 h-4" />
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveFilter("instock")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === "instock"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "bg-white/5 text-slate-400 border border-white/10"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              In Stock ({stats.inStock})
            </button>
            <button
              onClick={() => setActiveFilter("low")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === "low"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "bg-white/5 text-slate-400 border border-white/10"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Low Stock ({stats.lowStock})
            </button>
            <button
              onClick={() => setActiveFilter("outofstock")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeFilter === "outofstock"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "bg-white/5 text-slate-400 border border-white/10"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Out of Stock ({stats.outOfStock})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-accent to-orange-600 rounded-lg">
                <Boxes className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-slate-400">Total Items</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </Card>
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs text-slate-400">Total Value</p>
            </div>
            <p className="text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</p>
          </Card>
        </div>

        {/* Alert Cards */}
        {stats.lowStock > 0 && (
          <Card className="backdrop-blur-xl bg-yellow-500/10 border-yellow-500/30 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <p className="font-bold text-yellow-400 text-sm">Low Stock Alert</p>
                <p className="text-xs text-yellow-400/80">
                  {stats.lowStock} item{stats.lowStock > 1 ? "s" : ""} running low
                </p>
              </div>
            </div>
          </Card>
        )}

        {stats.outOfStock > 0 && (
          <Card className="backdrop-blur-xl bg-red-500/10 border-red-500/30 p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <div className="flex-1">
                <p className="font-bold text-red-400 text-sm">Out of Stock Alert</p>
                <p className="text-xs text-red-400/80">
                  {stats.outOfStock} item{stats.outOfStock > 1 ? "s" : ""} need immediate restock
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Stock Items List */}
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => navigate(`/stock/${item.id}`)}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-0.5">{item.name}</h3>
                    <p className="text-xs text-slate-400 mb-1">SKU: {item.sku}</p>
                    <span className="inline-block px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">
                      {item.category}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <p className="text-xs text-slate-400">{item.location}</p>
                    </div>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400">Stock Level</span>
                    <span className="text-white font-medium">
                      {item.quantity} / {item.maxStock} {item.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.quantity === 0
                          ? "bg-red-500"
                          : item.quantity < item.minStock
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min((item.quantity / item.maxStock) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Cost Price</p>
                    <p className="text-sm text-white font-bold">${item.costPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Sell Price</p>
                    <p className="text-sm text-white font-bold">${item.sellingPrice.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Total Value</p>
                    <p className="text-sm text-accent font-bold">
                      ${item.totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No stock items found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => console.log("Add stock item")}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-accent to-orange-600 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
