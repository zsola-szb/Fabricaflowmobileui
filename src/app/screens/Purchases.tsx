import { useState } from "react";
import { ArrowLeft, Plus, Package, RefreshCw, Search, Filter, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { AddPurchaseModal } from "../components/AddPurchaseModal";
import { AddPurchaseReturnModal } from "../components/AddPurchaseReturnModal";

export function Purchases() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"purchases" | "returns">("purchases");
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [showAddReturn, setShowAddReturn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const purchases = [
    {
      id: "PO-001",
      supplier: "ABC Manufacturing Co.",
      date: "2024-03-20",
      amount: 15000,
      status: "completed",
      items: 25,
    },
    {
      id: "PO-002",
      supplier: "Quality Supplies Ltd.",
      date: "2024-03-19",
      amount: 8500,
      status: "pending",
      items: 12,
    },
    {
      id: "PO-003",
      supplier: "Global Materials Inc.",
      date: "2024-03-18",
      amount: 22000,
      status: "completed",
      items: 35,
    },
    {
      id: "PO-004",
      supplier: "Industrial Parts Co.",
      date: "2024-03-17",
      amount: 5200,
      status: "ordered",
      items: 8,
    },
  ];

  const returns = [
    {
      id: "PR-001",
      supplier: "ABC Manufacturing Co.",
      date: "2024-03-21",
      amount: 2500,
      status: "approved",
      items: 5,
      reason: "Defective items",
    },
    {
      id: "PR-002",
      supplier: "Quality Supplies Ltd.",
      date: "2024-03-20",
      amount: 1200,
      status: "pending",
      items: 3,
      reason: "Wrong specification",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "ordered":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const handleAddClick = () => {
    if (activeTab === "purchases") {
      setShowAddPurchase(true);
    } else {
      setShowAddReturn(true);
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
              <h1 className="text-2xl font-bold text-white">Purchases</h1>
              <p className="text-sm text-slate-400">Manage purchase orders & returns</p>
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
              placeholder="Search by supplier or PO number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 backdrop-blur-xl bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("purchases")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === "purchases"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              <Package className="w-4 h-4" />
              Purchases
            </button>
            <button
              onClick={() => setActiveTab("returns")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeTab === "returns"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Returns
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {activeTab === "purchases" ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-white">{purchases.length}</p>
                <p className="text-xs text-green-400 mt-1">↑ 12% this month</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-white">$50.7K</p>
                <p className="text-xs text-green-400 mt-1">↑ 8% this month</p>
              </Card>
            </div>

            {/* Purchase Orders */}
            {purchases.map((purchase) => (
              <Card
                key={purchase.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-white mb-1">{purchase.id}</p>
                    <p className="text-sm text-slate-400">{purchase.supplier}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <p className="text-sm text-white">
                        {new Date(purchase.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Items</p>
                    <p className="text-sm text-white font-medium">{purchase.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Amount</p>
                    <p className="text-sm text-accent font-bold">
                      ${purchase.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            {/* Summary Cards for Returns */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Total Returns</p>
                <p className="text-2xl font-bold text-white">{returns.length}</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Return Value</p>
                <p className="text-2xl font-bold text-white">$3.7K</p>
              </Card>
            </div>

            {/* Purchase Returns */}
            {returns.map((returnItem) => (
              <Card
                key={returnItem.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-white mb-1">{returnItem.id}</p>
                    <p className="text-sm text-slate-400">{returnItem.supplier}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      returnItem.status
                    )}`}
                  >
                    {returnItem.status}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Reason</p>
                  <p className="text-sm text-white">{returnItem.reason}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <p className="text-sm text-white">
                        {new Date(returnItem.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Items</p>
                    <p className="text-sm text-white font-medium">{returnItem.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Amount</p>
                    <p className="text-sm text-red-400 font-bold">
                      -${returnItem.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-accent to-orange-600 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Purchase Modal */}
      {showAddPurchase && (
        <AddPurchaseModal
          isOpen={showAddPurchase}
          onClose={() => setShowAddPurchase(false)}
          type="purchase"
        />
      )}

      {/* Add Purchase Return Modal */}
      {showAddReturn && (
        <AddPurchaseReturnModal
          isOpen={showAddReturn}
          onClose={() => setShowAddReturn(false)}
        />
      )}
    </div>
  );
}