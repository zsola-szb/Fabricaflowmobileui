import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  MoreVertical,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Printer,
  Share2,
  Download,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const saleItems = [
  { name: "Product A", quantity: 2, price: "Br 425.00", total: "Br 850.00" },
  { name: "Product B", quantity: 1, price: "Br 400.00", total: "Br 400.00" },
];

export function SaleDetail() {
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
          <h1 className="text-xl font-bold">Invoice {id}</h1>
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Delivered</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-2">
        {/* Customer Info */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>+251 91 234 5678</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </Card>

        {/* Sale Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Sale Date</p>
            </div>
            <p className="font-bold">Mar 18, 2026</p>
          </Card>
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Due Date</p>
            </div>
            <p className="font-bold">Mar 25, 2026</p>
          </Card>
        </div>

        {/* Items */}
        <div className="mb-4">
          <h3 className="font-bold mb-3">Items</h3>
          <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
            {saleItems.map((item, index) => (
              <div
                key={index}
                className={`p-4 ${index !== saleItems.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">{item.total}</p>
                </div>
                <p className="text-sm text-muted-foreground">@ {item.price}</p>
              </div>
            ))}
          </Card>
        </div>

        {/* Totals */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">Br 1,250.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (15%)</span>
              <span className="font-medium">Br 187.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-red-500">- Br 0.00</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-accent">Br 1,437.50</span>
            </div>
          </div>
        </Card>

        {/* Payment Info */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-6">
          <h3 className="font-bold mb-3">Payment Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">Cash</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-medium text-green-500">Br 1,437.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Balance</span>
              <span className="font-medium">Br 0.00</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent font-medium active:scale-95 transition-all">
            <Printer className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Print</span>
          </button>
          <button className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium active:scale-95 transition-all">
            <Share2 className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Share</span>
          </button>
          <button className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-medium active:scale-95 transition-all">
            <Download className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
