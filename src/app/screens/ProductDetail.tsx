import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  MoreVertical,
  Package as PackageIcon,
  TrendingUp,
  TrendingDown,
  Edit,
  Archive,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const stockHistory = [
  { date: "Mar 18, 2026", type: "Sale", quantity: -5, balance: 45, user: "John D." },
  { date: "Mar 15, 2026", type: "Purchase", quantity: +20, balance: 50, user: "Admin" },
  { date: "Mar 12, 2026", type: "Sale", quantity: -3, balance: 30, user: "Jane S." },
  { date: "Mar 10, 2026", type: "Adjustment", quantity: +10, balance: 33, user: "Admin" },
];

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (e.currentTarget as any).touchStartY = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = (e.currentTarget as any).touchStartY;
    const scrollTop = (e.currentTarget as HTMLElement).scrollTop;

    if (scrollTop === 0 && touch.clientY > startY + 100) {
      handleRefresh();
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-8 text-slate-50 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Product Details</h1>
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">In Stock</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Active</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-2">
        {/* Product Image */}
        <Card className="p-6 rounded-2xl backdrop-blur-md border border-border mb-4">
          <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-4">
            <PackageIcon className="w-24 h-24 text-accent" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Product A</h2>
          <p className="text-muted-foreground mb-4">SKU: SKU-001</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-3xl font-bold text-accent">Br 850.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Stock</p>
              <p className="text-3xl font-bold">45</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-xs text-muted-foreground">Total Sold</p>
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-green-400 mt-1">+12% this month</p>
          </Card>
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
            <p className="text-2xl font-bold">Br 132k</p>
            <p className="text-xs text-blue-400 mt-1">All time</p>
          </Card>
        </div>

        {/* Product Info */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-4">
          <h3 className="font-bold mb-3">Product Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className="font-medium">Electronics</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Brand</span>
              <span className="font-medium">Premium Brand</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Unit</span>
              <span className="font-medium">Piece</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Minimum Stock</span>
              <span className="font-medium">10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Reorder Level</span>
              <span className="font-medium">20</span>
            </div>
          </div>
        </Card>

        {/* Stock History */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Stock History</h3>
          <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
            {stockHistory.map((item, index) => (
              <div
                key={index}
                className={`p-4 ${index !== stockHistory.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        item.quantity > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.quantity > 0 ? "+" : ""}
                      {item.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">Balance: {item.balance}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">By {item.user}</p>
              </div>
            ))}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent font-medium active:scale-95 transition-all">
            <Edit className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Edit</span>
          </button>
          <button className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium active:scale-95 transition-all">
            <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Sell</span>
          </button>
          <button className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium active:scale-95 transition-all">
            <Archive className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
}
